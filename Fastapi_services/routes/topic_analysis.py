import os
import re
import json
from typing import List
from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import pytesseract
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

router = APIRouter(prefix="/analyze", tags=["Topic Analyzer"])

# ✅ Gemini API Setup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyDf94AURysZ__VT2kuZzQOJ6JpPhY9vYDY")
if not GEMINI_API_KEY:
    raise RuntimeError("❌ GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=GEMINI_API_KEY)

# ✅ Windows users: Update Tesseract path if installed elsewhere
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


# ---------------------- Helper Functions ----------------------

def extract_text_from_image(file_path: str) -> str:
    """Extract text from image using OCR."""
    try:
        img = Image.open(file_path)
        text = pytesseract.image_to_string(img)
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading image: {e}")


def clean_text(text: str) -> str:
    """Clean extracted OCR text."""
    text = re.sub(r"\s+", " ", text)
    text = text.replace("’", "'").replace("“", '"').replace("”", '"')
    return text.strip()


def prepare_prompt(combined_text: str) -> str:
    """Prepare prompt for Gemini topic + question analysis."""
    return f"""
You are a smart AI text analyzer. The following text is extracted from multiple study material images.
From the given content, perform these tasks:
1. Identify the main *topics* 5 with with small word  (like Computer Networks, OS, DBMS, etc.).
2. Count how frequently each topic appears or is mentioned.
3. Suggest more than 5 top related questions based on the important or repeated topics.

Return output strictly in this JSON format:
{{
  "topics": ["Topic 1", "Topic 2"],
  "frequencies": [count1, count2],
  "topQuestions": ["Question 1", "Question 2"]
}}

Text:
{combined_text}
"""


def clean_and_parse_json(gemini_response: str):
    """Clean Gemini response and parse into JSON."""
    try:
        cleaned = re.sub(r"```json|```", "", gemini_response.strip(), flags=re.MULTILINE).strip()
        return json.loads(cleaned)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse Gemini JSON: {e}")


def generate_analysis(prompt: str):
    """Send prompt to Gemini and get structured analysis."""
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
async def upload_multiple_images_for_analysis(files: List[UploadFile] = File(...)):
    """
    Upload multiple images → extract text → perform topic frequency + top question analysis.
    """
    try:
        combined_text = ""

        # Step 1: Extract text from all uploaded images
        for file in files:
            if not file.content_type.startswith("image/"):
                raise HTTPException(status_code=400, detail=f"Invalid file type: {file.filename}. Only image files allowed.")

            file_path = f"temp_{file.filename}"
            with open(file_path, "wb") as f:
                f.write(await file.read())

            extracted_text = extract_text_from_image(file_path)
            combined_text += f"\n{extracted_text}"
            os.remove(file_path)

        if not combined_text.strip():
            raise HTTPException(status_code=400, detail="No readable text found in the uploaded images.")

        print("✅ Successfully extracted text from all images!")

        # Step 2: Clean text + create prompt
        cleaned_text = clean_text(combined_text)
        prompt = prepare_prompt(cleaned_text)

        # Step 3: Generate structured analysis from Gemini
        analysis_response = generate_analysis(prompt)

        # Step 4: Parse JSON output
        parsed_response = clean_and_parse_json(analysis_response)

        return {
            "message": "Topic analysis generated successfully!",
            "analysis": parsed_response
        }

    except HTTPException:
        raise
    except Exception as e:
        print("❌ Error:", e)
        raise HTTPException(status_code=500, detail=str(e))
