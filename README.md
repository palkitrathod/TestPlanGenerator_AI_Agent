# TestPlanGenerator_AI_Agent

This project is an **Intelligent QA Test Plan Agent** that automatically generates structured QA Test Plans directly from Jira Tickets using LLMs.

It establishes a completely automated workflow where users can simply provide a Jira Ticket ID, configure their specific AI model parameters (like temperature), and receive a highly detailed, analytical Test Plan describing exactly how to manually test the feature, complete with boundary conditions, edge cases, and risk analysis.

## Features
- **Dynamic Jira Integration**: Connects via API directly to your Jira Workspace to extract Ticket content, description, comments, and epic links automatically.
- **LLM AI Reasoning**: Utilizes Meta's incredibly precise `llama-3.3-70b-versatile` running blazingly fast on **Groq** to interpret the ticket and structure the QA analysis.
- **Parametric Controls**: Users can define and adjust the LLM Temperature from 0 to 1 scaling precision versus creativity when searching for vulnerabilities and edge cases.
- **Three-Tiered Architecture**: Built strictly following the `BLAST.md` protocol keeping Python tool logic deterministic instead of relying purely on generalized probabilistic AI. 
- **Premium Frontend UX**: Next.js 15, React, and TailwindCSS provide a sleek, performant developer/QA experience.

## Tech Stack
- **Frontend Layer**: Next.js (React), TailwindCSS.
- **Backend API Layer**: Python FastAPI for high-performance Async routing.
- **Tools/LangChain Layer**: Python LangChain for formatting prompts and processing JSON structure via output parsers, powered by the Groq cloud infrastructure. 

## Folder Structure
- `frontend/`: The Next.js frontend GUI and generator settings.
- `backend/`: The FastAPI layer and `.env` securely bridging Next.js and our local toolchain.
- `tools/`: Atomic, deterministic Python scripts (`jira_extractor.py`, `llm_generator.py`) representing the true engines of the platform.
- `architecture/`: Markdown-based SOPs dictating exactly how generation and extraction payloads are structured and routed. 

## Setup Instructions

**1. Clone the repository**
```bash
git clone https://github.com/palkitrathod/TestPlanGenerator_AI_Agent.git
```

**2. Configure the Backend Environment**
Navigate into the `backend/` directory, create a `.env` file, and supply:
```
GROQ_API_KEY=your_key_here
```

**3. Run the Python Backend Ecosystem**
Start the FastAPI server bridging the Python logic tools:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --reload-dir . --reload-dir ../tools
```

**4. Start the Next.js Frontend GUI**
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Navigate to `http://localhost:3000` to utilize the Intelligent QA Generation Dashboard.
