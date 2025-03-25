from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional    
import requests
import os

app = FastAPI()

# Load Groq API Key from environment variable
GROQ_API_KEY = os.getenv("GROQ_API_TOKEN")
GROQ_MODEL = "llama3-8b-8192"

# Define request & response schema
class AgentRequest(BaseModel):
    category: str  # Only category is required now

class AgentResponse(BaseModel):
    output: Dict[str, Any]
    brand_name: Optional[str] = None  # Add brand_name attribute

# Query Groq AI for recommendations
def query_groq(category: str) -> List[str]:
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}

    prompt = f"""
    You are an AI expert in product recommendations. 
    Suggest the best AI-powered products for the category "{category}".
    Provide 5 recommendations.
    """

    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are an AI product recommendation engine."},
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response_data = response.json()

        if "choices" in response_data:
            return response_data["choices"][0]["message"]["content"].split("\n")
        else:
            return [f"Groq API Error: {response_data}"]
    except Exception as e:
        return [f"Exception: {str(e)}"]

# API Endpoint
@app.post("/api/product_recommendation", response_model=AgentResponse)
def product_recommendation(request: AgentRequest):
    category = request.category  # Extract category from request

    # Query Groq AI for recommendations
    recommendations = query_groq(category)

    # Example response with brand_name
    return AgentResponse(
        output={
            "recommended_products": recommendations,
            "category": category,
            "recommended_products": recommendations
        },
        brand_name="ExampleBrand"  # Ensure brand_name is included
    )
'''{
    "category": "laptop"
}
'''