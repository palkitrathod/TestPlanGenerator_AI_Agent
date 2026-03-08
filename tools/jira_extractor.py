import os
from jira import JIRA, JIRAError
from dotenv import load_dotenv

load_dotenv(dotenv_path="../backend/.env")

def fetch_jira_ticket(issue_id, jira_server, jira_email, jira_api_key):
    if not all([jira_server, jira_email, jira_api_key]):
        return {"error": "Jira credentials missing from request", "status": 400}

    try:
        jira = JIRA({'server': jira_server}, basic_auth=(jira_email, jira_api_key))
        issue = jira.issue(issue_id)
        
        # Build the standardized schema mapped to gemini.md
        payload = {
            "issueKey": issue.key,
            "summary": issue.fields.summary,
            "description": issue.fields.description if issue.fields.description else "No description provided.",
            "acceptanceCriteria": "Unknown (extract from description during LLM phase)",
            "labels": issue.fields.labels if hasattr(issue.fields, 'labels') else [],
            "comments": [c.body for c in issue.fields.comment.comments] if hasattr(issue.fields, 'comment') else [],
            "attachments": [a.filename for a in issue.fields.attachment] if hasattr(issue.fields, 'attachment') else [],
            "epic": str(issue.fields.customfield_10014) if hasattr(issue.fields, 'customfield_10014') else None
        }
        return payload
    except JIRAError as e:
        status_code = e.status_code if hasattr(e, 'status_code') else 500
        message = e.text if hasattr(e, 'text') else str(e)
        return {"error": f"Failed to fetch Jira ticket: {message}", "status": status_code}
    except Exception as e:
        return {"error": f"Unexpected error processing Jira ticket: {str(e)}", "status": 500}

if __name__ == "__main__":
    # Test execution
    print(fetch_jira_ticket("PROJ-123"))
