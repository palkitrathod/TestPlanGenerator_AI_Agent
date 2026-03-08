# Findings

## Research
- The application will connect with Jira's REST API using Basic Auth (Email and API Token) to fetch ticket data.
- AI integration pathways:
  - **Groq API**: Cloud-based. Extremely fast Llama 3 / Mixtral inference. Requires `GROQ_API_KEY`.
  - **Ollama**: Local-based. Runs on `http://localhost:11434`.

## Discoveries
- Taking the `promt.md` into account, combining Next.js with either Python FastAPI or Node Backend is proposed. Since the platform hinges heavily on LLM pipeline management, Python (FastAPI + LangChain) offers a notoriously robust ecosystem for this. However, since the prompt specifies generating Playwright (JavaScript) scripts, a unified JavaScript ecosystem (Next.js + Node.js Express + LangChain.js) is also an excellent option.

## Constraints
- The system must function entirely decoupled from cloud APIs if "Ollama" is selected, meaning no hard dependencies on the internet for processing (except checking Jira).
- Need to parse structured LLM outputs reliably (Test Plans, Test Scenarios, Code) and make them exportable (PDF, DOCX, Markdown).
