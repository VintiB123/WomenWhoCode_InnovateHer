from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List
from serpapi import GoogleSearch
# from serpapi.google_search import GoogleSearch

app = FastAPI()

# Define request & response schema
class AgentRequest(BaseModel):
    input: Dict[str, Any]
    config: Dict[str, Any]

class AgentResponse(BaseModel):
    output: Dict[str, Any]

def google_search(query: str, num_results: int = 5):
    """ Fetch top competitors from Google using SerpAPI """
    params = {
        "q": query,
        "num": num_results,
        "api_key": "a15308f46571540bfa7e381084a575d059e2f6200b50db2cbd8af9f4c2a49fa4"
    }
    
    search = GoogleSearch(params)
    results = search.get_dict()
    
    competitors = []
    for r in results.get("organic_results", []):
        competitors.append({
            "title": r.get("title", "No title"),
            "link": r.get("link", "No link")
        })
    
    return competitors

@app.post("/api/competitor_watchdog", response_model=AgentResponse)
def competitor_watchdog(request: AgentRequest):
    """
    Competitor Watchdog Agent:
    - Accepts a list of SEO keywords.
    - Uses SerpAPI to fetch competitor websites ranking for those keywords.
    - Returns a list of top competitors.
    """

    # Extract input values
    keywords = request.input.get("seo_keywords", [])
    num_results = request.config.get("num_results", 5)

    if not keywords:
        raise HTTPException(status_code=400, detail="No keywords provided.")

    # Fetch competitors for each keyword
    competitor_data = {}
    for keyword in keywords:
        competitor_data[keyword] = google_search(keyword, num_results)

    return AgentResponse(output={"competitors": competitor_data})
    
'''
{
    "input": {
        "seo_keywords": ["laptop", "ai"]
    },
    "config": {}
}
'''