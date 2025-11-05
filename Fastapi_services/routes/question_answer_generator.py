import os
import re
import json
from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import pytesseract
from dotenv import load_dotenv
from google import genai
from google.genai import types


load_dotenv()

router = APIRouter(prefix="/qa", tags=["Question Answer Generator"])

# ✅ Gemini Setup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyAHOjVuJH8h30ZmuYFdjFnS6UM9SADju3w")
if not GEMINI_API_KEY:
    raise RuntimeError("❌ GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=GEMINI_API_KEY)

# ✅ For Windows users – must install Tesseract OCR manually:
# Download: https://github.com/UB-Mannheim/tesseract/wiki
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


# ---------------------- Helper Functions ----------------------

def extract_text_from_image(file_path: str) -> str:
    """Extracts text from uploaded image using OCR."""
    try:
        img = Image.open(file_path)
        text = pytesseract.image_to_string(img)
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading image: {e}")


def clean_text(text: str) -> str:
    """Clean OCR text (remove unwanted symbols, extra spaces)."""
    text = re.sub(r"\s+", " ", text)
    text = text.replace("’", "'").replace("“", '"').replace("”", '"')
    return text.strip()


def prepare_prompt(extracted_text: str) -> str:
    """Prepare Gemini prompt for question-answer generation."""
    return f"""
You are an AI teacher.
From the given text (which may contain exam questions),
generate clear question–answer pairs with short 2–3 line answers.
Output strictly in JSON format as follows:

{{
  "qa_pairs": [
    {{"question": "Question text here", "answer": "Answer text here"}},
    ...
  ]
}}

Text:
{extracted_text}
"""


def clean_and_parse_json(gemini_response: str):
    """Clean markdown formatting (```json ... ```) and parse JSON."""
    try:
        # Remove code block markers
        cleaned = re.sub(r"^```json|```$", "", gemini_response.strip(), flags=re.MULTILINE).strip()
        cleaned = cleaned.replace("```", "").strip()

        # Parse into dict
        return json.loads(cleaned)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse Gemini JSON: {e}")


def generate_qa_from_text(prompt: str):
    """Send prompt to Gemini and get structured QA."""
    try:
        contents = [types.Content(role="user", parts=[types.Part(text=prompt)])]
        response = client.models.generate_content(
            model="gemini-2.5-pro",
            contents=contents,
        )
        return response.text.strip()
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Gemini API error: {e}")


# ---------------------- Main Route ----------------------

@router.post("/upload")
async def upload_image_and_generate_qa(file: UploadFile = File(...)):
    """
    Upload an image → extract text → generate question-answer pairs.
    """
    try:
        # Step 1: Save uploaded image temporarily
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Step 2: Extract text
        extracted_text = extract_text_from_image(file_path)
        os.remove(file_path)

        if not extracted_text:
            raise HTTPException(status_code=400, detail="No readable text found in the image.")

        print("✅ Extracted text successfully!")

        # Step 3: Clean + prepare prompt
        cleaned_text = clean_text(extracted_text)
        prompt = prepare_prompt(cleaned_text)

        # Step 4: Generate QA from Gemini
        qa_response_text = generate_qa_from_text(prompt)

        # Step 5: Parse into JSON
        parsed_response = clean_and_parse_json(qa_response_text)

        return {
            "message": "QA generated successfully!",
            "qa_pairs": parsed_response["qa_pairs"]
        }

    except HTTPException:
        raise
    except Exception as e:
        print("❌ Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
