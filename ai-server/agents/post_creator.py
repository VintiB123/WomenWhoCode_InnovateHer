from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from typing import Optional

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Load API keys from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_TOKEN")
UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
GROQ_MODEL = "llama3-8b-8192"

# Request model
class PostRequest(BaseModel):
    brand_name: str
    industry: str
    target_audience: str
    post_type: str  # "Social Media Post", "Ad Copy"
    platform: str   # "Instagram", "Twitter"
    brand_tone: str # "Casual", "Professional"
    topic: str
    previous_post: str = None  # Optional context

# Response model
class PostResponse(BaseModel):
    content: str
    post_type: Optional[str] = None  # Add post_type attribute
    image_url: str

# Function to generate post using Groq AI
def generate_post(data: PostRequest) -> str:
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}

    prompt = f"""
    You are an expert social media copywriter.
    Generate a {data.post_type} for {data.brand_name} in the {data.industry} industry.
    Target audience: {data.target_audience}
    Platform: {data.platform}
    Brand tone: {data.brand_tone}
    Topic: {data.topic}
    """

    if data.previous_post:
        prompt += f"\nThis post should continue the following thread: {data.previous_post}"

    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are a creative marketing copywriter."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(url, json=payload, headers=headers)
    response_data = response.json()

    return response_data.get("choices", [{}])[0].get("message", {}).get("content", "Error generating post.")

# Function to fetch image from Unsplash
def fetch_image(query: str) -> str:
    url = f"https://api.unsplash.com/photos/random?query={query}&client_id={UNSPLASH_ACCESS_KEY}"
    headers = {"Accept-Version": "v1"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return data["urls"]["regular"]  # High-quality image URL
    else:
        print(f"Error fetching image: {response.status_code}, {response.text}")  # Debugging
        return "Error fetching image from Unsplash."

# API Endpoint
@app.post("/api/post_creator", response_model=PostResponse)
def create_post(request: PostRequest) -> PostResponse:
    post_content = generate_post(request)
    image_url = fetch_image(request.topic)
    # Example response with post_type
    return PostResponse(
        content="Generated post content",
        post_type=request.post_type  # Ensure post_type is included
    )
'''{
  "brand_name": "Tesla",
  "industry": "Automotive",
  "target_audience": "Tech Enthusiasts",
  "post_type": "Social Media Post",
  "platform": "Instagram",
  "brand_tone": "Futuristic",
  "topic": "Electric Cars"
}'''