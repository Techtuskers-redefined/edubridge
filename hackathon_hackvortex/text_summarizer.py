import nltk
import numpy as np
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import networkx as nx
import openai
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from gtts import gTTS
import base64
import tempfile
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
import cv2
import json
from typing import Optional
import PyPDF2
import docx

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

class TextRequest(BaseModel):
    topic: Optional[str] = None
    text: Optional[str] = None
    num_sentences: int = 3

class TextSummarizer:
    def __init__(self):
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('punkt')
            nltk.download('stopwords')
        
        self.stop_words = set(stopwords.words('english'))

    def generate_text_from_topic(self, topic: str) -> str:
        """
        Generate text about a topic using OpenAI's GPT model
        """
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a knowledgeable assistant that provides detailed information about topics."},
                    {"role": "user", "content": f"Write a detailed explanation about {topic}"}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error generating text: {str(e)}")

    def read_file_content(self, file: UploadFile) -> str:
        """
        Read content from uploaded file (supports PDF, DOCX, and TXT)
        """
        content = ""
        file_extension = file.filename.split('.')[-1].lower()
        
        try:
            if file_extension == 'pdf':
                pdf_reader = PyPDF2.PdfReader(file.file)
                for page in pdf_reader.pages:
                    content += page.extract_text()
            
            elif file_extension == 'docx':
                doc = docx.Document(file.file)
                content = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
            
            elif file_extension == 'txt':
                content = file.file.read().decode('utf-8')
            
            else:
                raise HTTPException(status_code=400, detail="Unsupported file format")
            
            return content
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")

    def text_to_speech(self, text: str) -> str:
        """
        Convert text to speech and return base64 encoded audio
        """
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_audio:
                tts = gTTS(text=text, lang='en')
                tts.save(temp_audio.name)
                with open(temp_audio.name, 'rb') as audio_file:
                    audio_base64 = base64.b64encode(audio_file.read()).decode('utf-8')
                os.unlink(temp_audio.name)
                return audio_base64
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error converting text to speech: {str(e)}")

    def text_to_sign_language(self, text: str) -> dict:
        """
        Convert text to sign language gestures
        Returns a dictionary of sign language gestures or references
        """
        # This is a placeholder for sign language conversion
        # You would implement actual sign language conversion here
        # For now, returning a mock response
        return {
            "status": "success",
            "sign_language_data": {
                "text": text,
                "gestures": "Sign language gesture data would go here"
            }
        }

    def read_text(self, text):
        """
        Read and preprocess the input text
        """
        sentences = sent_tokenize(text)
        return sentences

    def create_sentence_vectors(self, sentences):
        """
        Create vectors for each sentence based on word frequencies
        """
        sentence_vectors = []
        for sentence in sentences:
            words = word_tokenize(sentence.lower())
            words = [word for word in words if word not in self.stop_words and word.isalnum()]
            sentence_vectors.append(words)
        return sentence_vectors

    def sentence_similarity(self, sent1, sent2):
        """
        Calculate similarity between two sentences using cosine similarity
        """
        all_words = list(set(sent1 + sent2))
        vector1 = [0] * len(all_words)
        vector2 = [0] * len(all_words)

        for word in sent1:
            vector1[all_words.index(word)] += 1
        for word in sent2:
            vector2[all_words.index(word)] += 1

        return 1 - cosine_distance(vector1, vector2)

    def build_similarity_matrix(self, sentence_vectors):
        """
        Build similarity matrix for all sentences
        """
        similarity_matrix = np.zeros((len(sentence_vectors), len(sentence_vectors)))
        
        for i in range(len(sentence_vectors)):
            for j in range(len(sentence_vectors)):
                if i != j:
                    similarity_matrix[i][j] = self.sentence_similarity(
                        sentence_vectors[i], sentence_vectors[j]
                    )
        return similarity_matrix

    def generate_summary(self, text, num_sentences=3):
        """
        Generate text summary using TextRank algorithm
        """
        # Get sentences and create vectors
        sentences = self.read_text(text)
        sentence_vectors = self.create_sentence_vectors(sentences)
        
        # Create similarity matrix
        similarity_matrix = self.build_similarity_matrix(sentence_vectors)
        
        # Calculate sentence scores using PageRank algorithm
        nx_graph = nx.from_numpy_array(similarity_matrix)
        scores = nx.pagerank(nx_graph)
        
        # Get top N sentences
        ranked_sentences = sorted([(scores[i], sentences[i]) 
                                 for i in range(len(sentences))], 
                                reverse=True)
        
        summary = " ".join([sent for score, sent in ranked_sentences[:num_sentences]])
        return summary

    def process_request(self, request: TextRequest) -> dict:
        """
        Process the request and return summarized text with TTS and sign language
        """
        try:
            # Generate or use provided text
            if request.topic:
                original_text = self.generate_text_from_topic(request.topic)
            else:
                original_text = request.text

            if not original_text:
                raise HTTPException(status_code=400, detail="No text provided or generated")

            # Generate summary
            summary = self.generate_summary(original_text, request.num_sentences)

            # Convert to speech
            audio_base64 = self.text_to_speech(summary)

            # Convert to sign language
            sign_language_data = self.text_to_sign_language(summary)

            return {
                "original_text": original_text,
                "summary": summary,
                "audio_base64": audio_base64,
                "sign_language_data": sign_language_data
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

# API Endpoints
@app.post("/summarize/topic")
async def summarize_topic(request: TextRequest):
    summarizer = TextSummarizer()
    return summarizer.process_request(request)

@app.post("/summarize/text")
async def summarize_text(request: TextRequest):
    summarizer = TextSummarizer()
    return summarizer.process_request(request)

@app.post("/summarize/file")
async def summarize_file(file: UploadFile, num_sentences: int = 3):
    summarizer = TextSummarizer()
    text = summarizer.read_file_content(file)
    request = TextRequest(text=text, num_sentences=num_sentences)
    return summarizer.process_request(request)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 