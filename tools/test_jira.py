import os
from dotenv import load_dotenv
from jira import JIRA

load_dotenv(dotenv_path="../backend/.env")

def verify_jira_connection():
    jira_server = os.getenv("JIRA_BASE_URL")
    jira_email = os.getenv("JIRA_EMAIL")
    jira_api_key = os.getenv("JIRA_API_KEY")

    if not all([jira_server, jira_email, jira_api_key]):
        print("Missing variables in .env")
        return False

    options = {
        'server': jira_server
    }
    
    try:
        jira = JIRA(options, basic_auth=(jira_email, jira_api_key))
        print("Successfully connected to JIRA:", jira_server)
        user = jira.myself()
        print("Authenticated as:", user.get('emailAddress', jira_email))
        return True
    except Exception as e:
        print("Failed to connect to JIRA:")
        print(e)
        return False

if __name__ == "__main__":
    verify_jira_connection()
