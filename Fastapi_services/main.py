from fastapi import FastAPI
from .routes import ai_knowledge

app = FastAPI(title="AI Study Assistant (FastAPI)")

app.include_router(ai_knowledge.router)

@app.get("/")
def home():
    return {"message": "FastAPI AI Study Assistant running 🚀"}
