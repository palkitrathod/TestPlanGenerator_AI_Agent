# Jira Extraction SOP

## Goal
Fetch comprehensive data from a specific Jira Issue ID to be processed by our QA Agent's LLM pipeline.

## Input
- `issue_id` (e.g., "PROJ-123") from frontend input payload.

## Logic Overview
1.  **Initialize JIRA client** using `JIRA_BASE_URL`, `JIRA_EMAIL`, and `JIRA_API_KEY` from the `.env` variables.
2.  **Fetch Issue Details** via `jira.issue(issue_id)`.
3.  **Extract Fields Map:**
    -   `summary`: Issue Title
    -   `description`: The main body content.
    -   `acceptanceCriteria`: Sometimes hidden in custom fields, but often listed in the description or a specific custom field mapped to AC.
    -   `labels`: Any tags for context.
    -   `comments`: Important to pick up implementation notes or constraints.
    -   `epic`: Epic links for broader context.

## Edge Cases
-   **Invalid Issue ID / 404 Not Found**: The script must catch `JIRAError` exceptions and return a deterministic JSON error `{ "error": "Issue not found or unauthorized.", "status": 404 }`.
-   **Missing Acceptance Criteria**: If the 'Acceptance Criteria' custom field isn't present, the extraction should just process the description, alerting the LLM to deduce AC from the description text.

## Golden Rule
If JIRA API structure or custom field names change, update this SOP and adjust mappings in `tools/jira_extractor.py`. Do not modify LLM prompts for extraction errors.
