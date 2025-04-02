from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_TOKEN")
GROQ_MODEL = "llama3-70b-8192"

# Log the API key and model for verification
logging.debug(f"GROQ_API_KEY: {GROQ_API_KEY}")
logging.debug(f"GROQ_MODEL: {GROQ_MODEL}")

app = FastAPI()

# Request Model
class EmailRequest(BaseModel):
    action: str  # Only "draft" is supported now
    subject: str = None
    brand_name: str = None
    campaign: str = None
    target_audience: str = None
    tone: str = "Professional"
    meeting_topic: str = None
    participants: list = None
    date_time: str = None
    recipient: str = None
    notice_type: str = None
    details: str = None

# Response Model
class EmailResponse(BaseModel):
    workflow_detected: str
    email_subject: str
    email_body: str

# AI-Powered Workflow Detection & Email Generation
def generate_email(data: EmailRequest) -> dict:
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}

    # Log the request details
    logging.debug(f"Request URL: {url}")
    logging.debug(f"Request Headers: {headers}")

    # Automatically detect workflow
    if data.brand_name or data.campaign or data.target_audience:
        workflow = "Marketing"
    elif data.meeting_topic or data.participants or data.date_time:
        workflow = "Corporate"
    elif data.recipient or data.notice_type or data.details:
        workflow = "Legal"
    else:
        workflow = "General"

    prompt = f"You are an AI email assistant. The detected workflow is {workflow}. "

    if data.action == "draft":
        if workflow == "Marketing":
            prompt += f"""
            Write a promotional email for {data.brand_name}.
            Campaign: {data.campaign}
            Target Audience: {data.target_audience}
            Tone: {data.tone}
            """
        elif workflow == "Corporate":
            prompt += f"""
            Draft an internal corporate email.
            Meeting Topic: {data.meeting_topic}
            Participants: {", ".join(data.participants)}
            Date & Time: {data.date_time}
            """
        elif workflow == "Legal":
            prompt += f"""
            Draft a formal legal notice.
            Recipient: {data.recipient}
            Notice Type: {data.notice_type}
            Details: {data.details}
            """

    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are a smart AI email assistant."},
            {"role": "user", "content": prompt}
        ]
    }

    try:
        # Log the payload
        logging.debug(f"Payload: {payload}")

        response = requests.post(url, json=payload, headers=headers)
        response_data = response.json()

        # Log the response data
        logging.debug(f"Response Data: {response_data}")

        email_content = response_data["choices"][0]["message"]["content"] if "choices" in response_data else "Error generating email."
    except Exception as e:
        logging.error(f"Error generating email: {str(e)}")
        email_content = "Error generating email."

    return {
        "workflow_detected": workflow,
        "email_subject": data.subject if data.subject else "Generated Email",
        "email_body": email_content
    }

# API Endpoint
@app.post("/api/email_manager", response_model=EmailResponse)
def email_manager(request: EmailRequest):
    email_content = generate_email(request)
    return EmailResponse(**email_content)

'''
marketing :
{
    "action": "draft",
    "brand_name": "Tesla",
    "campaign": "Cybertruck Launch",
    "target_audience": "Tech Enthusiasts",
    "tone": "Exciting"
}
corporate:
{
    "action": "draft",
    "meeting_topic": "Annual Budget Planning",
    "participants": ["CEO", "CFO", "HR Head"],
    "date_time": "April 15, 10 AM"
}
summarize:
{
    "action": "summarize",
    "body": "Hey team, we're moving the Q3 strategy meeting to April 10. Please adjust your schedules accordingly."
}
legal:
{
    "action": "draft",
    "recipient": "John Doe",
    "notice_type": "Non-Disclosure Agreement Violation",
    "details": "Confidential information was shared externally."
}

'''