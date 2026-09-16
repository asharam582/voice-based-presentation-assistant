import json
import os

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

from agent import AgentSession
from slides_generator import generate_slides_from_topic

app = FastAPI(title="Voice Presentation API")

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/speech-token")
async def get_speech_token():
    """Exchange subscription key for a 10-minute auth token. Never expose the raw key to the browser."""
    region = os.getenv("AZURE_SPEECH_REGION", "eastus")
    key = os.getenv("AZURE_SPEECH_KEY", "")
    if not key:
        return {"error": "AZURE_SPEECH_KEY not configured"}, 500
    token_url = f"https://{region}.api.cognitive.microsoft.com/sts/v1.0/issueToken"
    async with httpx.AsyncClient() as client:
        resp = await client.post(token_url, headers={"Ocp-Apim-Subscription-Key": key})
        resp.raise_for_status()
    return {"token": resp.text, "region": region}


@app.post("/generate-slides")
async def generate_slides(body: dict):
    topic = body.get("topic", "").strip()
    if not topic:
        return {"error": "topic is required"}
    slides = await generate_slides_from_topic(topic)
    return slides


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    session = AgentSession()
    try:
        while True:
            raw = await ws.receive_text()
            msg = json.loads(raw)
            await session.handle(ws, msg)
    except WebSocketDisconnect:
        session.cancel()
    except Exception as e:
        try:
            await ws.send_json({"type": "error", "message": str(e)})
        except Exception:
            pass
        session.cancel()

