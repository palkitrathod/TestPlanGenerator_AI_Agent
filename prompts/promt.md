
---

# Ultimate Prompt: Build an AI-Powered QA Test Plan Agent

You are a **Senior Full Stack Engineer, AI Architect, and DevOps Engineer**.

Design and implement a **production-ready AI-powered web application called:**

# Intelligent QA Test Plan Agent

This system should help QA engineers **automatically generate Test Plans, Test Scenarios, Test Cases, and Automation Skeletons directly from JIRA tickets using LLMs.**

The application must be designed with **clean architecture, scalability, and modular AI integration.**

---

# 1. Product Vision

QA teams waste significant time manually creating:

* Test Plans
* Test Scenarios
* Test Cases
* Automation Scripts

This system should:

1. Connect to **JIRA**
2. Fetch **ticket details**
3. Use **LLM reasoning**
4. Generate a **complete Test Plan**
5. Optionally generate **automation test skeletons**

The system must support both:

* **Cloud LLM (Groq API)**
* **Local LLM (Ollama)**

So it can run **fully locally or in the cloud.**

---

# 2. Core Features

## 1. JIRA Integration Module

Users should be able to connect their JIRA account.

Inputs:

* JIRA Base URL
* Email
* API Token

Features:

* Test JIRA connection
* Secure credential storage
* Fetch issue details by **JIRA ID**

Example:

```
PROJ-123
```

Fetch:

* Summary
* Description
* Acceptance Criteria
* Labels
* Comments
* Attachments
* Linked issues
* Epic information

---

# 3. Test Plan Generator

Using the JIRA ticket and a **Test Plan Template**, generate:

### Test Plan

Sections:

* Overview
* Scope
* Objectives
* Test Strategy
* Test Environment
* Entry Criteria
* Exit Criteria
* Risk Analysis

---

### Test Scenarios

Example:

```
User Login Validation
Password Reset
Session Timeout
Invalid Credentials Handling
```

---

### Test Cases

Include:

* Test Case ID
* Title
* Preconditions
* Steps
* Expected Result
* Priority
* Severity

---

### Edge Case Detection

LLM should automatically detect:

* Boundary conditions
* Negative scenarios
* Data validation issues
* Security risks

---

# 4. Automation Test Generator (Very Important)

Generate **Playwright automation skeleton code**.

Example output:

```javascript
test("Verify user login with valid credentials", async ({ page }) => {
  await page.goto("/login")
  await page.fill("#email", "test@test.com")
  await page.fill("#password", "password")
  await page.click("button[type=submit]")
  await expect(page).toHaveURL("/dashboard")
})
```

Support:

* Playwright (JavaScript)
* API tests
* UI tests

---

# 5. LLM Integration Layer

Create a **pluggable LLM architecture**.

Supported providers:

### Groq

User inputs:

* Groq API Key

Example models:

* llama3-70b
* mixtral

---

### Ollama

Allow local LLM configuration:

Example:

```
http://localhost:11434
```

User selects model:

* llama3
* mistral
* codellama

---

# 6. Prompt Engineering Layer

Create reusable prompts for:

### Test Plan Generation

Context sent to LLM:

```
JIRA Ticket
Acceptance Criteria
Test Plan Template
```

Output:

Structured Test Plan.

---

### Test Case Generation Prompt

Ask LLM to generate:

* Positive scenarios
* Negative scenarios
* Edge cases
* Security tests

---

### Automation Code Prompt

Generate:

* Playwright tests
* API tests
* Data validation tests

---

# 7. Web Application UI

Build a **modern UI.**

### Dashboard

Show:

* Generated Test Plans
* Recent activity
* JIRA tickets processed

---

### JIRA Integration Page

Form fields:

```
JIRA URL
Email
API Token
```

Button:

```
Test Connection
```

---

### Generate Test Plan Page

Inputs:

```
JIRA Ticket ID
LLM Provider (Groq / Ollama)
Template Selection
```

Button:

```
Generate Test Plan
```

---

### Output Viewer

Show generated:

* Test Plan
* Test Scenarios
* Test Cases
* Automation Scripts

Export options:

* PDF
* DOCX
* Markdown

---

### Settings Page

Configure:

LLM Providers

Groq API Key

Ollama Endpoint

Default Model

---

# 8. Suggested Tech Stack

## Frontend

Use:

* Next.js
* React
* TailwindCSS
* ShadCN UI

---

## Backend

Use:

* Node.js
* Express.js

OR

* Python FastAPI

---

## AI Layer

Use:

* LangChain
* Groq API
* Ollama API

---

## Database

Use:

Local Mode:

```
SQLite
```

Production Mode:

```
PostgreSQL
```

---

# 9. System Architecture

Recommended architecture:

```
Frontend (Next.js)
        |
        |
Backend API (Node / FastAPI)
        |
        |
AI Service Layer
        |
        |
LLM Providers
(Groq / Ollama)
        |
        |
External Integrations
(JIRA API)
```

---

# 10. Folder Structure

Example:

```
ai-test-plan-agent
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│
├── backend
│   ├── api
│   ├── jira
│   ├── llm
│   ├── agents
│   ├── prompts
│
├── database
│
├── docker
│
└── docs
```

---

# 11. Local Development

Application must run locally.

Example:

```
npm install
npm run dev
```

Local setup:

* Ollama running locally
* SQLite database

---

# 12. Production Deployment

Support deployment with:

* Docker
* Vercel
* AWS

Use:

* Groq API
* PostgreSQL

---

# 13. Advanced AI Features (Bonus)

Add advanced AI capabilities:

### Risk Detection

LLM identifies:

* Security risks
* Performance risks
* Integration risks

---

### Coverage Analysis

Compare:

```
Acceptance Criteria
vs
Generated Tests
```

Highlight missing coverage.

---

### AI QA Assistant Chat

Allow QA engineers to ask:

```
"Generate API tests"
"Convert this to Playwright"
"Add negative cases"
```

---

# 14. Deliverables

Provide:

1. Full architecture diagram
2. Backend APIs
3. Frontend UI
4. LLM prompts
5. Docker setup
6. Installation guide


