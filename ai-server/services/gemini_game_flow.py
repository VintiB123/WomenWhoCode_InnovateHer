import os
import google.generativeai as genai
import re
import json
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

generation_config = {
    "temperature": 1,
    "top_p": 0.9,
    "top_k": 35,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
    system_instruction='''You are an expert AI agent specializing in designing intelligent, modular workflows for industries like **Marketing, Corporate Productivity, and Legal Compliance**. 
Your goal is to generate structured, AI-driven workflows that streamline decision-making, automate processes, and enhance efficiency.

When a user provides a query about:
- **Marketing Automation**: Develop AI workflows for lead generation, content optimization, audience segmentation, and campaign automation.
- **Corporate Productivity**: Suggest AI-driven task automation, meeting summarization, knowledge retrieval, and workflow optimization.
- **Legal Compliance**: Generate AI workflows for document analysis, contract validation, regulatory tracking, and compliance monitoring.

For each response, structure the workflow as an interactive step-by-step process with:
- **Clear objectives** for each node.
- **Concise descriptions** (2-3 sentences) for quick understanding.
- **Categorized flow nodes** using different background and border colors for each industry.

### **Response Format (Strict JSON)**
{
  "nodes": [
    {
      "id": "start",
      "position": { "x": 250, "y": 50 },
      "data": { "label": "Start Workflow" },
      "style": {
        "background": "bg-green-100",
        "border": "border-green-500"
      }
    },
    {
      "id": "marketing_automation",
      "position": { "x": 50, "y": 200 },
      "data": { "label": "Lead Scoring & Audience Segmentation" },
      "style": {
        "background": "bg-blue-100",
        "border": "border-blue-500"
      }
    },
    {
      "id": "corporate_productivity",
      "position": { "x": 250, "y": 200 },
      "data": { "label": "AI-Powered Document Summarization" },
      "style": {
        "background": "bg-orange-100",
        "border": "border-orange-500"
      }
    },
    {
      "id": "legal_compliance",
      "position": { "x": 450, "y": 200 },
      "data": { "label": "Automated Contract Analysis" },
      "style": {
        "background": "bg-yellow-100",
        "border": "border-yellow-500"
      }
    }
  ],
  "edges": [
    {
      "id": "e-marketing",
      "source": "start",
      "target": "marketing_automation",
      "label": "Choice 1",
      "style": { "stroke": "stroke-blue-500" }
    },
    {
      "id": "e-corporate",
      "source": "start",
      "target": "corporate_productivity",
      "label": "Choice 2",
      "style": { "stroke": "stroke-orange-500" }
    },
    {
      "id": "e-legal",
      "source": "start",
      "target": "legal_compliance",
      "label": "Choice 3",
      "style": { "stroke": "stroke-yellow-500" }
    }
  ]
}'''
)

chat_session = model.start_chat(history=[])

def get_gemini_response(user_input: str, focusArea: str = "balanced") -> dict:
    """
    Generates an AI-powered workflow using Gemini 2.0 based on the user input.

    Args:
      user_input: The user's request for an AI workflow.
      focusArea: A value can be any of "marketing", "corporate", "legal", or "balanced".

    Returns:
      A JSON object representing the structured AI workflow.
    """
    response = chat_session.send_message(f'{user_input} \nThe focus Area is: {focusArea}')
    markdown_text = response.text

    try:
        # First, try parsing directly as JSON
        return json.loads(markdown_text)
    except json.JSONDecodeError:
        # Fallback: Extract JSON content inside ```json ... ```
        json_match = re.search(r'```json\s*(.*?)\s*```', markdown_text, re.DOTALL)
        if json_match:
            try:
                return json.loads(json_match.group(1))
            except json.JSONDecodeError:
                print("Error: Extracted JSON is invalid.")
                return None
        else:
            print("Error: Could not extract JSON from response.")
            return None

if __name__ == "__main__":
    # Corrected test query with a valid focus area
    test_query = "I need an AI workflow for automating legal contract analysis, highlighting risks, and ensuring compliance with regulations."
    response = get_gemini_response(test_query, focusArea="legal")

    if response:
        print(json.dumps(response, indent=2))  # Pretty print the JSON
    else:
        print("Failed to get a valid response.")