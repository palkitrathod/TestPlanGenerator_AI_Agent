import os
import json
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

load_dotenv(dotenv_path="../backend/.env")

def generate_qa_payload(jira_json, llm_provider="groq", temperature=0.1):
    """
    Takes the structured Jira JSON and routes it to an LLM to build the QA Test Plan.
    Returns a Pydantic-validated or JSON-parsed dictionary.
    """
    if llm_provider == "groq":
        groq_api_key = os.getenv("GROQ_API_KEY")
        if not groq_api_key:
            return {"error": "GROQ_API_KEY is not set in the environment.", "status": 500}
        
        llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=groq_api_key, temperature=temperature)
    else:
        # Assuming Ollama is local
        # A more robust system would use LangChain's Ollama model natively,
        # but for this Phase 3 tool, we handle the concept of plugin.
        return {"error": "Ollama local integration not fully configured. Using Groq for Phase 3 prototype.", "status": 501}

    # The System Prompt is derived directly from our architecture blueprints / gemini.md schemas.
    system_prompt = """
You are a Senior Full Stack Engineer, AI Architect, and DevOps Engineer operating the Intelligent QA Test Plan Agent.
Your objective is to generate a comprehensive testing payload for the provided Jira Ticket Data.

OUTPUT FORMAT INSTRUCTIONS:
You MUST return ONLY a strictly valid JSON object adhering EXACTLY to the following schema. Do not output markdown code blocks or conversational text.

{
  "testPlan": {
    "overview": "string",
    "scope": "string",
    "objectives": "string",
    "testStrategy": "string",
    "testEnvironment": "string",
    "entryCriteria": "string",
    "exitCriteria": "string",
    "riskAnalysis": "string"
  },
  "testScenarios": [
    "string"
  ],
  "testCases": [
    {
      "testCaseId": "string",
      "title": "string",
      "preconditions": "string",
      "steps": ["string"],
      "expectedResult": "string",
      "priority": "string",
      "severity": "string",
      "testType": "string"
    }
  ]
}

Identify boundary conditions, negative scenarios, security risks, and edge cases. Generate a comprehensive manual test plan. Do not generate automation code.
"""

    from langchain_core.messages import SystemMessage, HumanMessage

    try:
        # Build raw messages to completely bypass LangChain's PromptTemplate curly brace parsing errors
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"JIRA TICKET DATA:\n\n{json.dumps(jira_json, indent=2)}")
        ]

        # Chain setup without ChatPromptTemplate
        chain = llm | JsonOutputParser()
        result = chain.invoke(messages)
        return result
    except Exception as e:
        return {"error": f"LLM Generation Failed: {str(e)}", "status": 500}
