from langchain_core.prompts import ChatPromptTemplate
from langchain_community.tools.tavily_search import TavilySearchResults

from .budget_assistant import ToUpdateBudgetAssistant
from .tools.budget_tools import search_account, search_transactions
from .base import Assistant

class PrimaryAssistant:
    def __init__(self, llm):
        self.primary_assistant_prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are a helpful customer support assistant for a Financial Tracking application. "
                    "Your primary role is to help the user to keep track of transactions in their budget accounts. "
                    "If a customer requests to insert a new transaction or account, delegate the task to the appropriate specialized assistant by invoking the corresponding tool. "
                    "You are not able to make these types of changes yourself. "
                    "Only the specialized assistants are given permission to do this for the user. "
                    "The user is not aware of the different specialized assistants, so do not mention them; just quietly delegate through function calls. "
                    "Provide detailed information to the customer, and always double-check the database before concluding that information is unavailable. "
                    "When searching, be persistent. Expand your query bounds if the first search returns no results. "
                    "If a search comes up empty, expand your search before giving up. ",
                ),
                ("placeholder", "{messages}"),
            ]
        )
        self.tools = [
            TavilySearchResults(max_results=1),
            search_transactions,
            search_account,
        ]
        self.assistant_runnable = self.primary_assistant_prompt | llm.bind_tools(
            self.tools
            + [
                ToUpdateBudgetAssistant,
            ]
        )

    def agent(self):
        return Assistant(self.assistant_runnable)