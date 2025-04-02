from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List
from langchain.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
import shutil
import os
import json
import uuid
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_TOKEN")
GROQ_MODEL = "llama3-8b-8192"
SMTP_SERVER = os.getenv("AWS_SMTP_SERVER", "email-smtp.ap-south-1.amazonaws.com")
SMTP_PORT = 587
SMTP_USERNAME = os.getenv("AWS_SMTP_USER")
SMTP_PASSWORD = os.getenv("AWS_SMTP_PASSWORD")
EMAIL_SENDER = "pipinstallerror@gmail.com"
EMAIL_RECIPIENT = "devparekh21@gmail.com"  # Hardcoded recipient email

# Initialize FastAPI app
app = FastAPI()

# Temporary storage folders
UPLOAD_FOLDER = "uploads"
SUMMARY_STORE = "summaries.json"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load FAISS for RAG
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = FAISS.from_texts(["placeholder"], embeddings)

# Pydantic model for the meeting summary
class MeetingSummary(BaseModel):
    meeting_title: str
    meeting_date: str  # Format: YYYY-MM-DD
    meeting_time: str  # Format: HH:MM
    summary: str
    action_items: List[str]  # List of action items discussed

def process_pdf(file_path):
    """Extracts and processes text from the uploaded PDF file."""
    loader = PyMuPDFLoader(file_path)
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(docs)
    return chunks

def extract_meeting_details(text):
    """Extracts meeting title, date, time, and action items from the text."""
    lines = text.split("\n")
    meeting_title = "Skateboarding Club Meeting"  # Default title
    meeting_date = "Unknown Date"  # Default date
    meeting_time = "Unknown Time"  # Default time
    action_items = []

    for line in lines:
        # Extract meeting date
        if "Respectfully submitted by" in line:
            # Look for the date in the previous line
            date_line = lines[lines.index(line) - 1].strip()
            if date_line:  # Ensure the line is not empty
                meeting_date = date_line

        # Extract meeting time
        if "Meeting was called to order at" in line:
            time_part = line.split("at")[-1].strip()
            if time_part:  # Ensure the time part is not empty
                meeting_time = time_part

        # Extract action items (motions)
        if "Motion #" in line:
            action_items.append(line.strip())

    return meeting_title, meeting_date, meeting_time, action_items

def build_rag_retriever(chunks):
    """Creates a FAISS retriever from extracted text chunks."""
    if chunks:
        vectorstore.add_documents(chunks)
    return vectorstore.as_retriever()

def query_groq(prompt):
    """Sends a request to Groq API for text generation."""
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}
    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are an AI assistant summarizing meeting minutes."},
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post(url, json=payload, headers=headers)
    response_data = response.json()
    return response_data["choices"][0]["message"]["content"] if "choices" in response_data else "Error generating summary."

def summarize_meeting(transcript_chunks):
    """Uses Groq API to generate a structured meeting summary."""
    retriever = build_rag_retriever(transcript_chunks)
    retrieved_docs = retriever.get_relevant_documents("Summarize the key motions, decisions, and action items.")
    context = "\n".join([doc.page_content for doc in retrieved_docs])
    prompt = f"Meeting Transcript:\n{context}\n\nSummarize this meeting, removing filler discussions and focusing on key decisions, action items, and next steps."
    summary = query_groq(prompt)

    # Extract meeting details from the context
    meeting_title, meeting_date, meeting_time, action_items = extract_meeting_details(context)

    return summary, meeting_title, meeting_date, meeting_time, action_items

def save_summary(meeting_id, summary):
    """Saves the meeting summary in JSON storage."""
    if os.path.exists(SUMMARY_STORE):
        with open(SUMMARY_STORE, "r") as file:
            summaries = json.load(file)
    else:
        summaries = {}
    summaries[meeting_id] = summary
    with open(SUMMARY_STORE, "w") as file:
        json.dump(summaries, file, indent=4)

def get_summary(meeting_id):
    """Retrieves a stored summary by meeting ID."""
    if not os.path.exists(SUMMARY_STORE):
        return None
    with open(SUMMARY_STORE, "r") as file:
        summaries = json.load(file)
        return summaries.get(meeting_id)

def send_email(subject: str, body: str):
    """Sends an email using AWS SES SMTP."""
    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_SENDER
        msg["To"] = EMAIL_RECIPIENT
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.set_debuglevel(1)  # Enable debugging
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(EMAIL_SENDER, EMAIL_RECIPIENT, msg.as_string())
        
        print(f"📧 Email sent to: {EMAIL_RECIPIENT} | Subject: {subject}")
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ SMTP Authentication Error: {e}")
        raise HTTPException(status_code=500, detail="SMTP Authentication Error")
    except smtplib.SMTPException as e:
        print(f"❌ SMTP Error: {e}")
        raise HTTPException(status_code=500, detail=f"SMTP Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        raise HTTPException(status_code=500, detail=f"Unexpected Error: {e}")

@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    """Endpoint to upload a meeting transcript PDF."""
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    try:
        transcript_chunks = process_pdf(file_path)
        summary, meeting_title, meeting_date, meeting_time, action_items = summarize_meeting(transcript_chunks)
        meeting_id = str(uuid.uuid4())  # Generate a unique meeting ID
        save_summary(meeting_id, summary)

        # Prepare the meeting summary for email
        meeting_summary = MeetingSummary(
            meeting_title=meeting_title,
            meeting_date=meeting_date,
            meeting_time=meeting_time,
            summary=summary,
            action_items=action_items
        )

        # Send email with the meeting summary
        email_subject = f"Meeting Summary: {meeting_title} ({meeting_date})"
        email_body = (
            f"📅 **Meeting Title:** {meeting_summary.meeting_title}\n"
            f"📅 **Date:** {meeting_summary.meeting_date}\n"
            f"⏰ **Time:** {meeting_summary.meeting_time}\n\n"
            "---\n"
            "📝 **Summary:**\n"
            f"{meeting_summary.summary}\n\n"
            "---\n"
            "✅ **Action Items:**\n"
            + "\n".join(f"• {item}" for item in meeting_summary.action_items) + "\n\n"
            "---\n"
            "Best regards,\n"
            "Your Meeting Summary Bot 🤖"
        )
        send_email(email_subject, email_body)

        return {
            "meeting_id": meeting_id,
            "summary": summary,
            "message": "Meeting summary processed and email sent successfully!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get_summary/{meeting_id}")
def fetch_summary(meeting_id: str):
    """Endpoint to retrieve a stored summary by meeting ID."""
    summary = get_summary(meeting_id)
    if summary:
        return {"meeting_id": meeting_id, "summary": summary}
    else:
        raise HTTPException(status_code=404, detail="Summary not found.")