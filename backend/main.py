import os
import sys
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Inject tools/ into python path to import our deterministic logic
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'tools')))
from jira_extractor import fetch_jira_ticket
from llm_generator import generate_qa_payload

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JiraRequest(BaseModel):
    issueKey: str
    jiraUrl: str
    jiraEmail: str
    jiraApiKey: str
    llm: str
    temperature: float = 0.1

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Test Plan Agent API Running with Full Pipeline"}

@app.post("/api/generate")
async def generate_test_plan(request: JiraRequest):
    jira_key = request.issueKey
    llm_preference = request.llm
    
    # 1. Pipeline Action: Extract JIRA Map using user-provided credentials
    extracted_data = fetch_jira_ticket(
        issue_id=jira_key,
        jira_server=request.jiraUrl,
        jira_email=request.jiraEmail,
        jira_api_key=request.jiraApiKey
    )
    if "error" in extracted_data:
         # Bubble up extraction errors to frontend
         return {"error": extracted_data["error"], "status": extracted_data["status"]}
         
    # 2. Pipeline Action: Generate QA Payload using LLM SOP
    llm_response = generate_qa_payload(
        extracted_data, 
        llm_provider=request.llm,
        temperature=request.temperature
    )
    if "error" in llm_response:
         return {"error": llm_response["error"], "status": llm_response.get("status", 500)}

    # Ensure frontend UI sees success status mapped appropriately
    llm_response["status"] = "success"
    llm_response["jiraKey"] = jira_key
    
    return llm_response
