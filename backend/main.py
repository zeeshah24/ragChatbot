from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv

from services.rag_service import RAGService
from models.chat import ChatMessage, ChatResponse

load_dotenv()

app = FastAPI()
rag_service = RAGService()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    try:
        response = await rag_service.generate_response(message.content)
        return ChatResponse(content=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))