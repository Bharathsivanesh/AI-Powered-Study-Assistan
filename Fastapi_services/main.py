from fastapi import FastAPI
from .routes import ai_knowledge,question_generator,question_answer_generator
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Study Assistant (FastAPI)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(ai_knowledge.router)

@app.get("/")
def home():
    return {"message": "FastAPI AI Study Assistant running 🚀"}
