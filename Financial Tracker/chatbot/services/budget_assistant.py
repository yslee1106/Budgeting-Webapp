from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from decimal import Decimal
from datetime import date

from .base import Assistant, CompleteOrEscalate
from .tools.budget_tools import search_account, search_transactions, create_new_account, create_new_transaction

class BudgetAssistant():
    def __init__(self, llm):
        
        self.budget_management_prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are a specialized assistant for handling budget account and transaction creation and updates. "
                    "The primary assistant delegates work to you whenever the user needs help updating and creating their budget accounts and transactions. "
                    "Confirm the account and transaction details with the user and inform them of the resulting balance changes of the accounts if any. "
                    "When searching, be persistent. Expand your query bounds if the first search returns no results. "
                    "If you need more information or the user changes their mind, escalate the task back to the main assistant. "
                    "Remember that a transaction isn't completed until after the relevant tool has successfully been used. "
                    "\n\nIf the user needs help, and none of your tools are appropriate for it, then"
                    ' "CompleteOrEscalate" the dialog to the host assistant. Do not waste the user\'s time. Do not make up invalid tools or functions.',
                ),
                ("placeholder", "{messages}"),
            ]
        )

        self.safe_tools = [search_account, search_transactions]
        self.sensitive_tools = [create_new_account, create_new_transaction]
        self.update_budget_tools = self.safe_tools + self.sensitive_tools
        self.update_budget_runnable = self.budget_management_prompt | llm.bind_tools(
            self.update_budget_tools + [CompleteOrEscalate]
        )

    def agent(self):
        return Assistant(self.update_budget_runnable)
        

class ToUpdateBudgetAssistant(BaseModel):
    """Transfers work to a specialized assistant to handle budget updates and creation."""

    account_id: int = Field(description="The id of the budget account that the user is refering to.")
    account_name: str = Field(description="The name of the budget account that the user is refering to")
    transaction_date: date = Field(description="The date of the budget transaction.")
    description: str = Field(description="Additional information from the user regarding the transaction.")
    type: str = Field(description="The credit nature of the transaction (can be either debit or credit).")
    amount: Decimal = Field(description="The numerical amount which the budget account has changed due to the transaction")

    class Config:
        json_schema_extra = {
            "example": {
                "account_id": "1",
                "account_name": "Food",
                "transaction_date": "2023-07-05",
                "description": "Food",
                "amount": "30.00",
            }
        }