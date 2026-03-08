# LLM QA Generation SOP

## Goal
Transform structured Jira Ticket JSON into the complete QA Payload (Test Plan, Scenarios, Cases, and Playwright Skeletons).

## Input
-   A structured JSON representation of the Jira Ticket (output from `jira_extractor.py`).
-   LLM Selection Parameter (`groq` or `ollama`).

## Logic Overview
1.  **Select LLM Backend**: Evaluate the LLM parameter. Route to `langchain_groq.ChatGroq` or a local `langchain_community.llms.Ollama` instance.
2.  **Assemble Prompt Context**: Inject the Jira JSON data directly into the pre-defined System Prompt templates defined in `prompts/promt.md`. 
3.  **Enforce Output Formatting**: The LLM must be instructed to return a strictly formatted JSON payload corresponding to the Project Constitution defined in `gemini.md`. This ensures the Next.js frontend can parse and render the output correctly.
4.  **Parse & Validate**: Use LangChain's JSON parsers or Pydantic output parsers to ensure the generation is structurally sound before handing it to the Next.js API.

## Edge Cases
-   **LLM Connection Refused (Ollama)**: Catch HTTP connection errors to `http://localhost:11434` and return a clean failure indicating local Ollama is down.
-   **API Limit (Groq)**: Catch rate limiting, return a status JSON to the frontend to hold and retry.
-   **Hallucinatory Syntax**: The output parser must detect invalid JSON. If it occurs, a retry loop (max 1 try) is triggered with explicit instructions to fix JSON formatting.

## Golden Rule
The LLM response structure is dictated strictly by `gemini.md` Output Data Schema. If frontend UI needs differ, update `gemini.md` first, then the Pydantic parser, then the prompt.
