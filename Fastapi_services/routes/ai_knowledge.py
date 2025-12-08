import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

router = APIRouter(prefix="/ai", tags=["AI Knowledge Chatbot"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set in .env")

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "knowledge.txt")

def load_knowledge():
    if not os.path.exists(DATA_FILE):
        raise FileNotFoundError(f"{DATA_FILE} not found")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return f.read()

class Question(BaseModel):
    question: str

@router.post("/ask")
async def ask_question(payload: Question):
    """Ask a question based on Bharath’s knowledge base"""
    print("✅ Extracted text:", flush=True)
    client = genai.Client(api_key=GEMINI_API_KEY)
    knowledge_text = load_knowledge()

    prompt = f"""
You are an expert assistant. Use ONLY the following knowledge to answer the user's question.just give me as a paragraph not a \\n and *.

Knowledge Base:
{knowledge_text}

User Question:
{payload.question}
"""

    try:
        contents = [types.Content(role="user", parts=[types.Part.from_text(text=prompt)])]
        response = client.models.generate_content(
            model="gemini-2.5-pro",
            contents=contents,
        )
        return {"answer": response.text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
