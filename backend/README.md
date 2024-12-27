# RAG Chatbot Backend

This is the backend service for the RAG-powered chatbot. It uses FastAPI, LangChain, and OpenAI to provide intelligent responses enhanced with external knowledge.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and add your OpenAI API key:
   ```bash
   cp .env.example .env
   ```

4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

The server will start at http://localhost:8000