from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import spacy

app = FastAPI()

# Load spaCy NLP model for keyword extraction
nlp = spacy.load("en_core_web_sm")

# Expanded keyword search volume database
keyword_frequencies = {
    "SEO": 50000,
    "content marketing": 42000,
    "backlinks": 38000,
    "digital marketing": 46000,
    "keyword research": 35000,
    "social media": 55000,
    "blogging": 30000,
    "affiliate marketing": 27000,
    "email marketing": 32000,
    "Google Ads": 58000,
    "PPC": 26000,
    "meta tags": 15000,
    "site speed": 14000,
    "domain authority": 19000,
    "link building": 33000,
    "SERP": 22000,
    "organic traffic": 25000,
    "page ranking": 18000,
    "local SEO": 28000,
    "voice search": 20000,
    "AI": 60000,
    "machine learning": 55000,
    "deep learning": 48000,
    "data science": 52000,
    "big data": 44000,
    "smartphones": 40000,
    "laptops": 35000,
    "5G": 39000,
    "cloud computing": 42000,
    "cybersecurity": 47000,
    "blockchain": 38000,
    "NFTs": 24000,
    "metaverse": 31000,
    "gaming": 18000,
    "virtual reality": 29000,
    "augmented reality": 27500,
    "Python": 57000,
    "JavaScript": 56000,
    "React": 52000,
    "Django": 41000
}

# Define request & response schema
class AgentRequest(BaseModel):
    input: Dict[str, Any]
    config: Dict[str, Any]

class AgentResponse(BaseModel):
    output: Dict[str, Any]

def extract_keywords(text):
    """
    Extracts important keywords from the input text using NLP.
    """
    doc = nlp(text)
    keywords = [token.text.lower() for token in doc if token.pos_ in ["NOUN", "PROPN"]]
    return list(set(keywords))[:5]  # Return up to 5 unique keywords

def estimate_search_volume(keywords):
    """
    Estimates search volume based on predefined keyword frequency data.
    """
    estimated_volumes = {kw: keyword_frequencies.get(kw, 1000) for kw in keywords}  # Default 1000 if not found
    return estimated_volumes

@app.post("/api/seo_optimizer", response_model=AgentResponse)
def seo_optimizer(request: AgentRequest):
    """
    SEO Optimizer Agent:
    - Accepts a query string as input.
    - Uses a configuration like language preference or depth of analysis.
    - Returns top SEO recommendations dynamically based on input.
    """

    # Extract input values
    query = request.input.get("query", "")
    language = request.config.get("language", "en")
    depth = request.config.get("depth", "medium")

    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    # Extract keywords dynamically
    seo_keywords = extract_keywords(query)

    # Get estimated search volume data
    keyword_data = estimate_search_volume(seo_keywords)

    # Generate recommendation text
    recommendation = f"Optimize your content for: {', '.join(seo_keywords)}."

    # Return structured response
    return AgentResponse(
        output={
            "top_keywords": keyword_data,
            "recommendation": recommendation,
            "language": language,
            "depth": depth
        }
    )

# Run with: uvicorn filename:app --reload
'''{
  "input": { "query": "Best laptops for ai" },
  "config": { "language": "en", "depth": "high" }
}
'''