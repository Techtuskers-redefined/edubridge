# EduBridge Backend

This is the backend server for the EduBridge application, which includes text summarization functionality.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
```

3. Make sure you have Python 3.x installed with the required packages:
```bash
pip install -r ../hackathon_hackvortex/requirements.txt
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Text Summarization

#### POST /api/summarizer/text
Summarize text content.

Request body:
```json
{
  "text": "Your text to summarize",
  "num_sentences": 3
}
```

Response:
```json
{
  "success": true,
  "data": {
    "original_text": "Your original text",
    "summary": "Summarized text"
  }
}
```

#### POST /api/summarizer/file
Summarize text from a file (supports PDF, DOCX, and TXT).

Request:
- Form data with file upload
- Optional query parameter: num_sentences (default: 3)

Response:
```json
{
  "success": true,
  "data": {
    "summary": "Summarized text from file"
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of failures:

- 400: Bad Request (missing required fields)
- 500: Internal Server Error

Error response format:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
``` 