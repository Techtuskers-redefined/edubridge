# simplified_summarizer_api.py
import os
import base64
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from gtts import gTTS
import openai
import PyPDF2
import docx
from pydantic import BaseModel
import requests

# Environment setup
openai.api_key = os.getenv("OPENAI_API_KEY")
SIGN_API_URL = "https://your-sign-api.com/generate"  # Replace with actual API
SIGN_API_KEY = os.getenv("SIGN_API_KEY")

# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper Functions

def extract_text(file: UploadFile) -> str:
    ext = file.filename.split('.')[-1].lower()
    try:
        if ext == 'pdf':
            reader = PyPDF2.PdfReader(file.file)
            return "\n".join([page.extract_text() for page in reader.pages])
        elif ext == 'docx':
            doc = docx.Document(file.file)
            return "\n".join([p.text for p in doc.paragraphs])
        elif ext == 'txt':
            return file.file.read().decode('utf-8')
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File processing error: {str(e)}")

def summarize_with_openai(text: str, num_sentences: int = 3) -> str:
    prompt = f"Summarize this text in {num_sentences} sentences:\n{text}"
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a summarization assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI error: {str(e)}")

def text_to_speech(text: str) -> str:
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as f:
            gtts = gTTS(text=text, lang='en')
            gtts.save(f.name)
            with open(f.name, 'rb') as audio:
                audio_base64 = base64.b64encode(audio.read()).decode('utf-8')
            os.unlink(f.name)
            return audio_base64
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS error: {str(e)}")

def send_to_sign_api(text: str) -> dict:
    headers = {
        "Authorization": f"Bearer {SIGN_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {"text": text}
    try:
        response = requests.post(SIGN_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sign API error: {str(e)}")

# API Route
@app.post("/process-file/")
async def process_file(file: UploadFile = File(...), num_sentences: int = 3):
    text = extract_text(file)
    summary = summarize_with_openai(text, num_sentences)
    audio = text_to_speech(summary)
    sign_response = send_to_sign_api(summary)

    return {
        "summary": summary,
        "audio_base64": audio,
        "sign_language": sign_response
    }
