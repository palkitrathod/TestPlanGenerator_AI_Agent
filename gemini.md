# Project Constitution

## Data Schemas

### Input: Jira Issue Data (Fetched from JIRA API)
```json
{
  "issueKey": "PROJ-123",
  "summary": "User Login Page",
  "description": "Create a login page with email and password.",
  "acceptanceCriteria": "User can log in with valid credentials. Invalid credentials show error.",
  "labels": ["authentication", "frontend"],
  "comments": ["Need this done by Friday."],
  "attachments": [],
  "linkedIssues": [],
  "epic": "EPIC-42"
}
```

### Output: AI Generated Payload (Test Plan & Automation)
```json
{
  "testPlan": {
    "overview": "...",
    "scope": "...",
    "objectives": "...",
    "testStrategy": "...",
    "testEnvironment": "...",
    "entryCriteria": "...",
    "exitCriteria": "...",
    "riskAnalysis": "..."
  },
  "testScenarios": [
    "User Login Validation",
    "Password Reset"
  ],
  "testCases": [
    {
      "testCaseId": "TC-001",
      "title": "Verify user login with valid credentials",
      "preconditions": "User account exists",
      "steps": ["Navigate to /login", "Enter valid email", "Enter valid password", "Click Submit"],
      "expectedResult": "User is redirected to /dashboard",
      "priority": "High",
      "severity": "Critical",
      "testType": "Positive" // e.g., Negative, Edge Case, Security
    }
  ],
  "automationSkeleton": {
    "framework": "playwright",
    "code": "test('Verify user login...', async ({ page }) => { ... })"
  }
}
```

## Behavioral Rules
- **Pluggable AI:** System must dynamically switch between Cloud LLM (Groq) and Local LLM (Ollama).
- **Proactive Risk Detection:** The LLM must proactively identify edge cases, negative scenarios, boundary conditions, and security risks.
- **Robust Code Gen:** Automation skeletons must default to Playwright (JavaScript) and be structurally sound.
- **Clean Architecture:** Strict separation between JIRA Data Fetching, LLM Prompting, and UI rendering.

## Architectural Invariants
- **Frontend Stack:** Next.js + React + TailwindCSS + ShadCN UI
- **Backend Stack:** Node.js Express OR Python FastAPI (Needs decision)
- **AI Tooling:** LangChain (or equivalent routing)
- **Database:** SQLite (Local Dev) / PostgreSQL (Production Deployment)
