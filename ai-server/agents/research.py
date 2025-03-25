from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = "llama3-8b-8192"  # Use a fast model like LLaMA 3

# Initialize FastAPI app
app = FastAPI()

# Groq API URL
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

class AIResearchAssistant:
    """
    A modular AI research assistant that uses Groq for fast inference and can research across all domains.
    """

    def __init__(self):
        """
        Initialize the AI research assistant.
        """
        self.headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

    def query_groq(self, prompt: str, system_message: str = "You are a helpful AI research assistant.") -> str:
        """
        Send a request to Groq API for text generation.

        Args:
            prompt (str): The user's input prompt.
            system_message (str): The system message to guide the model.

        Returns:
            str: The generated response from Groq.
        """
        payload = {
            "model": GROQ_MODEL,
            "messages": [
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ]
        }
        response = requests.post(GROQ_API_URL, json=payload, headers=self.headers)
        response_data = response.json()
        return response_data["choices"][0]["message"]["content"] if "choices" in response_data else "Error generating response."

    def research_topic(self, topic: str) -> Dict[str, str]:
        """
        Provide the most relevant information on a given topic.

        Args:
            topic (str): The topic to research.

        Returns:
            Dict[str, str]: A dictionary containing the topic and the generated information.
        """
        prompt = f"Provide a detailed and relevant explanation of the following topic: {topic}"
        response = self.query_groq(prompt)
        return {
            "topic": topic,
            "information": response
        }

# Initialize the AI research assistant
assistant = AIResearchAssistant()

# Pydantic model for the request body
class TopicRequest(BaseModel):
    topic: str

@app.post("/research_topic")
def research_topic(request: TopicRequest):
    """
    Provide the most relevant information on a given topic.
    """
    try:
        result = assistant.research_topic(request.topic)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

'''{
    "topic": "Artificial Intelligence"
}
op:
"information": "Artificial Intelligence (AI) refers to the development of computer systems that can perform tasks that typically require human intelligence, such as learning, problem-solving, and decision-making. AI involves the use of various techniques, including machine learning, deep learning, natural language processing, and robotics, to create intelligent machines that can interact with humans and other machines in a way that simulates human thought and behavior.\n\nHistory of AI:\nArtificial Intelligence has its roots in ancient Greece, where myths were told about machines that could think and behave like humans. However, the modern concept of AI as we know it today began in the mid-20th century. The Dartmouth Summer Research Project on Artificial Intelligence, held in 1956, is considered the birthplace of AI as a formal field of research. Since then, AI has evolved rapidly, with significant advancements in the 1980s and 1990s, particularly in the fields of natural language processing and expert systems.\n\nTypes of AI:\nThere are several types of AI, including:\n\n1. Narrow or Weak AI: This type of AI is designed to perform a specific task, such as playing chess, recognizing faces, or translating languages.\n2. General or Strong AI: This type of AI is capable of performing any intellectual task that a human can, such as thinking, reasoning, and making decisions.\n3. Superintelligence: This type of AI is far more intelligent than the human brain and capable of solving complex problems that are currently unsolvable.\n\nHow AI Works:\nAI systems use various techniques to process and analyze data, make decisions, and take actions. The key components of an AI system include:\n\n1. Data: AI systems rely on large amounts of data to learn and improve their performance.\n2. Algorithms: AI systems use algorithms to analyze data, identify patterns, and make predictions or decisions.\n3. Modifiers: AI systems use modifiers to adjust their performance and improve their accuracy.\n4. Interfaces: AI systems use interfaces to communicate with humans and other machines.\n\nApplications of AI:\nAI has a wide range of applications across various industries, including:\n\n1. Healthcare: AI is used to analyze medical images, diagnose diseases, and develop personalized treatment plans.\n2. Finance: AI is used to analyze stock prices, identify trends, and make investment decisions.\n3. Retail: AI is used to personalize customer experiences, recommend products, and optimize supply chains.\n4. Transportation: AI is used to develop autonomous vehicles, optimize traffic flow, and improve navigation systems.\n5. Education: AI is used to develop personalized learning plans, provide feedback, and improve student outcomes.\n\nChallenges and Limitations of AI:\nDespite the many benefits of AI, there are several challenges and limitations to its adoption, including:\n\n1. Ethics: AI raises important ethical questions about bias, privacy, and accountability.\n2. Explainability: AI systems can be difficult to understand and explain, making it challenging to hold them accountable for their actions.\n3. Job Displacement: AI has the potential to displace certain jobs, particularly those that involve repetitive or routine tasks.\n4. Technical Limitations: AI systems are limited by the quality and availability of data, as well as their ability to generalize and adapt to new situations.\n\nFuture of AI:\nThe future of AI is likely to be shaped by advancements in several areas, including:\n\n1. Edge AI: As more devices become connected, the need for edge AI will grow, enabling localized processing and decision-making.\n2. Human-AI Collaboration: The future of AI will involve human-AI collaboration, with humans and machines working together to achieve common goals.\n3. Explainable AI: As AI becomes more pervasive, there will be a growing need for explainable AI, to ensure accountability and trust in AI systems.\n4. AI for Social Good: AI has the potential to make a significant positive impact on society, and there will be a growing focus on developing AI for social good.\n\nConclusion:\nArtificial Intelligence is a rapidly evolving field that has the potential to transform many aspects of our lives. From healthcare to finance, retail to transportation, AI is already making a significant impact across various industries. However, AI also raises important ethical and technical challenges, and its future development will depend on our ability to address these challenges and ensure that AI is developed and used in a responsible and transparent manner."
}'''