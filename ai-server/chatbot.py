import os
import logging
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langdetect import detect
from deep_translator import GoogleTranslator
from dotenv import load_dotenv

# Initialize logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("AIAgentMarketplace")

# Load environment variables
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for chat input and output
class ChatQuery(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str

class ShopmartChatbot:
    def __init__(self):
        self.api_token = os.getenv("GROQ_API_TOKEN")
        if not self.api_token:
            raise ValueError("GROQ_API_TOKEN environment variable not set")
        
        # Initialize the language model for customer support and product inquiries
        self.model = ChatGroq(
            api_key=self.api_token,
            model_name="llama3-70b-8192",
            temperature=0.2,
            max_tokens=100  # Set max_tokens to limit the response length
        )
        logger.info("Chatbot initialized successfully")

    def _detect_language(self, text: str) -> str:
        try:
            return detect(text)
        except Exception as e:
            logger.warning(f"Language detection failed: {str(e)}")
            return "en"

    def _translate_text(self, text: str, src_lang: str, dest_lang: str = "en") -> str:
        if src_lang == dest_lang:
            return text
        try:
            return GoogleTranslator(source=src_lang, target=dest_lang).translate(text)
        except Exception as e:
            logger.error(f"Translation error: {str(e)}")
            return text

    def process_query(self, query: str) -> str:
        if not query.strip():
            raise ValueError("Empty query provided")
        
        # Detect and translate the query to English if necessary
        src_lang = self._detect_language(query)
        en_query = query if src_lang == "en" else self._translate_text(query, src_lang, "en")
        
        # Create a prompt for real-time customer support and product inquiries
        prompt = f"""You are an AI assistant for the AI Agent Marketplace, where users can create, customize, and integrate AI-powered workflows using a modular drag-and-drop interface. Your role is to guide users in designing AI workflows for industries like marketing, finance, legal, and corporate productivity.

Your key responsibilities include:

Providing insights on AI workflows such as SEO optimization, contract summarization, competitor analysis, and meeting summarization.
Assisting users in integrating multiple AI agents into seamless workflows.
Explaining concepts like RAG-based retrieval, agent-based decision-making, and multi-input AI processing.
Helping users build scalable AI-driven solutions by leveraging pre-built AI agents.
Supporting users with API integrations, technical troubleshooting, and workflow efficiency improvements.
Encouraging innovation by suggesting unique AI workflows beyond the provided examples.
Always ensure responses are clear, actionable, and aligned with the AI Agent Marketplaces goal of enabling flexible and adaptive AI solutions. "{en_query}"
Answer:"""
        try:
            response = self.model.invoke(prompt).content
        except Exception as e:
            logger.error(f"Model invocation failed: {str(e)}")
            raise HTTPException(status_code=500, detail="Model invocation failed")
        
        # Translate the response back to the original language if needed
        final_response = response if src_lang == "en" else self._translate_text(response, "en", src_lang)
        return final_response

# Initialize the chatbot
try:
    chatbot = ShopmartChatbot()
except Exception as e:
    logger.critical(f"Chatbot initialization failed: {str(e)}")
    raise

@app.post("/chat", response_model=ChatResponse)
async def chat(query: ChatQuery = Body(...)):
    try:
        response = chatbot.process_query(query.query)
        return ChatResponse(response=response)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Error processing chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "groq_connected": chatbot.api_token is not None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)