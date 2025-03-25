from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from transformers import pipeline

# Initialize FastAPI app
app = FastAPI()

# Sentiment Analysis Agent
class SentimentAnalysisAgent:
    """
    A modular sentiment analysis agent that can analyze text for marketing, corporate, legal, and finance compliance.
    """

    def __init__(self):
        """
        Initialize the sentiment analysis agent.
        """
        self.sentiment_pipeline = pipeline("sentiment-analysis")

        # Expanded domain-specific keywords
        self.domain_keywords = {
            "marketing": [
                "campaign", "brand", "customer", "engagement", "ROI", "advertising", "marketing", 
                "social media", "SEO", "content", "strategy", "target audience", "conversion", 
                "lead generation", "brand awareness", "digital marketing", "email marketing", 
                "influencer", "analytics", "sales funnel"
            ],
            "corporate": [
                "strategy", "leadership", "stakeholder", "growth", "performance", "management", 
                "board", "executive", "business", "organization", "corporate governance", 
                "decision-making", "vision", "mission", "values", "culture", "innovation", 
                "transformation", "merger", "acquisition", "restructuring"
            ],
            "legal": [
                "compliance", "regulation", "contract", "liability", "litigation", "law", 
                "legal", "intellectual property", "patent", "trademark", "copyright", 
                "dispute", "arbitration", "court", "judgment", "legislation", "policy", 
                "data protection", "privacy", "GDPR", "employment law", "tax law"
            ],
            "finance": [
                "revenue", "profit", "investment", "risk", "compliance", "financial", 
                "accounting", "audit", "tax", "budget", "forecast", "cash flow", 
                "stock", "bond", "portfolio", "asset", "liability", "equity", 
                "valuation", "mergers and acquisitions", "IPO", "dividend", "interest rate", 
                "inflation", "currency", "banking", "insurance", "hedge fund", "private equity"
            ],
            "general": []
        }

    def detect_domain(self, text: str) -> str:
        """
        Detect the domain of the given text based on keywords.

        Args:
            text (str): The text to analyze.

        Returns:
            str: The detected domain.
        """
        for domain, keywords in self.domain_keywords.items():
            if any(keyword.lower() in text.lower() for keyword in keywords):
                return domain
        return "general"

    def analyze_sentiment(self, text: str) -> Dict[str, str]:
        """
        Analyze the sentiment of the given text.

        Args:
            text (str): The text to analyze.

        Returns:
            Dict[str, str]: A dictionary containing the sentiment label and score.
        """
        result = self.sentiment_pipeline(text)[0]
        return {
            "sentiment": result["label"],
            "score": result["score"]
        }

    def domain_specific_analysis(self, text: str) -> Dict[str, str]:
        """
        Perform domain-specific sentiment analysis by focusing on domain keywords.

        Args:
            text (str): The text to analyze.

        Returns:
            Dict[str, str]: A dictionary containing the sentiment label, score, domain, and domain-specific insights.
        """
        # Detect the domain
        domain = self.detect_domain(text)

        # Analyze sentiment
        sentiment_result = self.analyze_sentiment(text)

        # Check for domain-specific keywords
        keywords_found = [
            keyword for keyword in self.domain_keywords[domain]
            if keyword.lower() in text.lower()
        ]

        # Add domain-specific insights
        sentiment_result["domain"] = domain
        sentiment_result["domain_keywords"] = keywords_found

        return sentiment_result

# Initialize the agent
agent = SentimentAnalysisAgent()

# Pydantic model for the request body
class SentimentRequest(BaseModel):
    text: str

# Pydantic model for the response
class SentimentResponse(BaseModel):
    sentiment: str
    score: float
    domain: str
    domain_keywords: List[str]

@app.post("/analyze_sentiment", response_model=SentimentResponse)
def analyze_sentiment(request: SentimentRequest):
    """
    Analyze the sentiment of the given text and detect the domain automatically.
    """
    try:
        # Perform domain-specific sentiment analysis
        result = agent.domain_specific_analysis(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
'''{
    "text": "The new marketing campaign boosted brand engagement and customer satisfaction."
}'''
'''{
    "text": "The leadership team's strategy resulted in significant stakeholder growth."
}'''

'''
{
    "sentiment": "POSITIVE",
    "score": 0.9997518658638,
    "domain": "marketing",
    "domain_keywords": [
        "campaign",
        "brand",
        "customer",
        "engagement",
        "marketing"
    ]
}
'''