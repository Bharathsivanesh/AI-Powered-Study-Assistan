from fastapi import FastAPI
from .routes import ai_knowledge,question_generator,question_answer_generator,topic_analysis
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from dotenv import load_dotenv
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)
app = FastAPI(title="AI Study Assistant (FastAPI)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(ai_knowledge.router)
app.include_router(question_generator.router)
app.include_router(question_answer_generator.router)
app.include_router(topic_analysis.router)

@app.get("/")
def home():
    return {"message": "FastAPI AI Study Assistant running 🚀"}
