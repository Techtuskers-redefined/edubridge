# simplified_summarizer_api.py
import os
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from gtts import gTTS
from openai import OpenAI
import PyPDF2
import docx
from pydantic import BaseModel
import requests


# Environment setup
client = OpenAI(
  api_key="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"
)
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
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a summarization assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        summary = response.choices[0].message.content.strip()
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI error: {str(e)}")

def text_to_speech_file(text: str) -> str:
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as f:
            gtts = gTTS(text=text, lang='en')
            gtts.save(f.name)
            return f.name  # Return path to saved mp3
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
    audio = text_to_speech_file(summary)
    sign_response = send_to_sign_api(summary)

    return {
        "summary": summary,
        "audio_base64": audio,
        "sign_language": sign_response
    }

@app.post("/tts/")
async def get_tts_audio(text: str = Form(...)):
    file_path = text_to_speech_file(text)
    return FileResponse(path=file_path, media_type='audio/mpeg', filename="summary.mp3")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 