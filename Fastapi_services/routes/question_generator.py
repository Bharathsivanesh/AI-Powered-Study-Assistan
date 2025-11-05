import os
import re
import json
from fastapi import APIRouter, UploadFile, File, HTTPException
from PyPDF2 import PdfReader
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/questions", tags=["Question Generator"])

# ✅ Initialize Gemini Client
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyAjXm95cujZ0rQj66pTh5kEZCVqjHKlCB8")
if not GEMINI_API_KEY:
    raise RuntimeError("❌ GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=GEMINI_API_KEY)


# ✅ PDF Text Extraction
def extract_text_from_pdf(file_path: str) -> str:
    """Extracts text content from a PDF file."""
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF: {e}")


# ✅ API Endpoint
@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a syllabus PDF → Extract text → Send to Gemini → Get topic-wise questions → Return JSON
    """
    try:
        # Step 1: Save uploaded file temporarily
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Step 2: Extract text
        extracted_text = extract_text_from_pdf(file_path)
        if not extracted_text:
            raise HTTPException(status_code=400, detail="No text found in the uploaded PDF.")

        # Step 3: Prompt for Gemini
        prompt = f"""
You are a question paper creator.
Use the syllabus text below to identify main topics and generate 3–5 questions under each topic.

Output **only valid JSON**.
Example:
{{ "Topic 1": ["Q1", "Q2"], "Topic 2": ["Q1", "Q2"] }}

Syllabus:
{extracted_text}
"""

        # Step 4: Send to Gemini API
        contents = [types.Content(role="user", parts=[types.Part.from_text(text=prompt)])]
        response = client.models.generate_content(
            model="gemini-2.5-pro",
            contents=contents,
        )

        # Step 5: Extract raw text safely
        raw_output = response.candidates[0].content.parts[0].text.strip()

        # Step 6: Clean unwanted markdown like ```json ... ```
        cleaned_text = re.sub(r"```json|```", "", raw_output).strip()

        # Step 7: Parse JSON output
        try:
            json_output = json.loads(cleaned_text)
        except json.JSONDecodeError:
            # fallback: return raw text if JSON is invalid
            json_output = {"raw_text": cleaned_text}

        # Step 8: Delete temp file
        if os.path.exists(file_path):
            os.remove(file_path)

        # Step 9: Return final structured response
        return {"questions": json_output}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
