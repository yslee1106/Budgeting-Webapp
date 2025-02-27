import uuid
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from typing import Literal, Callable
from langchain_core.runnables import RunnableLambda
from langchain_core.messages import ToolMessage
from langgraph.graph import StateGraph, END, START
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.checkpoint.memory import MemorySaver
from langsmith import utils

from .utils import _print_event
from .services.state import State, pop_dialog_state
from .services.tools.complete import CompleteOrEscalate
from .services.primary_assistant import PrimaryAssistant
from .services.budget_assistant import BudgetAssistant, ToUpdateBudgetAssistant

class ChatBot():

    def __init__(self):
        load_dotenv(override=True)

        os.environ['LANGCHAIN_TRACING_V2']='true'
        os.environ['LANGCHAIN_API_KEY']="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"
        os.environ['LANGCHAIN_PROJECT']="sql query agent"
        print(utils.tracing_is_enabled())
        
        self.llm = ChatOpenAI(model="gpt-4o")
        # self.llm = ChatOpenAI(base_url="https://api.deepseek.com", model="deepseek-chat")
        self.budget_assistant = BudgetAssistant(self.llm)
        self.primary_assistant = PrimaryAssistant(self.llm)
        self.memory = MemorySaver()

        self.app = self.__workflow(self.memory)
        
    def run(self, input: str):
        thread_id = str(uuid.uuid4())
        config = {
            "configurable": {
                # Checkpoints are accessed by thread_id
                "thread_id": thread_id,
            }
        }

        events = self.app.stream(
            {"messages": ("user", input)}, config, stream_mode="values"
        )

        # DEBUG LINE
        # printed = set()
        # for event in events:
        #     _print_event(event, printed)
        
        final_response = None
        for event in events:
            for message in event.get("messages", []):
                print(message.type)
                print(message.content)
                if message.type == "ai":
                    if message.content:
                        final_response = message.content
                        break

        return final_response or "Sorry, I didn't get a response"


    def __handle_tool_error(self, state: State) -> dict:
        error = state.get("error")
        tool_calls = state["messages"][-1].tool_calls
        return {
            "messages": [
                ToolMessage(
                    content=f"Error: {repr(error)}\n please fix your mistakes.",
                    tool_call_id=tc["id"],
                )
                for tc in tool_calls
            ]
        }

    def __create_entry_node(self, assistant_name: str, new_dialog_state: str) -> Callable:
        def entry_node(state) -> dict:
            tool_call_id = state["messages"][-1].tool_calls[0]["id"]
            return {
                "messages": [
                    ToolMessage(
                        content=f"The assistant is now the {assistant_name}. Reflect on the above conversation between the host assistant and the user."
                        f" The user's intent is unsatisfied. Use the provided tools to assist the user. Remember, you are {assistant_name},"
                        " and the creation, update, and other action is not complete until after you have successfully invoked the appropriate tool."
                        " If the user changes their mind or needs help for other tasks, call the CompleteOrEscalate function to let the primary host assistant take control."
                        " Do not mention who you are - just act as the proxy for the assistant.",
                        tool_call_id=tool_call_id,
                    )
                ],
                "dialog_state": new_dialog_state,
            }

        return entry_node
    
    def __create_tool_node_with_fallback(self, tools: list) -> dict:
        return ToolNode(tools).with_fallbacks(
            [RunnableLambda(self.__handle_tool_error)], exception_key="error"
        )

    def __workflow(self, memory: MemorySaver):

        def route_update_budget(state: State,):
            route = tools_condition(state)
            if route == END:
                return END
            tool_calls = state["messages"][-1].tool_calls
            did_cancel = any(tc["name"] == CompleteOrEscalate.__name__ for tc in tool_calls)
            if did_cancel:
                return "leave_skill"
            safe_toolnames = [t.name for t in self.budget_assistant.safe_tools]
            if all(tc["name"] in safe_toolnames for tc in tool_calls):
                return "update_budget_safe_tools"
            return "update_budget_sensitive_tools"
        
        def route_primary_assistant(state: State):
            route = tools_condition(state)
            if route == END:
                return END
            tool_calls = state["messages"][-1].tool_calls
            if tool_calls:
                if tool_calls[0]["name"] == ToUpdateBudgetAssistant.__name__:
                    return "enter_update_budget"
                return "primary_assistant_tools"
            raise ValueError("Invalid route")

        # Each delegated workflow can directly respond to the user
        # When the user responds, we want to return to the currently active workflow
        def route_to_workflow(
            state: State,
        ) -> Literal[
            "primary_assistant",
            "update_budget",
        ]:
            """If we are in a delegated state, route directly to the appropriate assistant."""
            dialog_state = state.get("dialog_state")
            if not dialog_state:
                return "primary_assistant"
            return dialog_state[-1]

        builder = StateGraph(State)

        builder.add_node("primary_assistant", self.primary_assistant.agent())
        builder.add_node("leave_skill", pop_dialog_state)
        builder.add_node("enter_update_budget", self.__create_entry_node("Budget Updates & Creation Assistant", "update_budget"))
        builder.add_node("update_budget", self.budget_assistant.agent())
        builder.add_node(
            "update_budget_sensitive_tools",
            self.__create_tool_node_with_fallback(self.budget_assistant.sensitive_tools),
        )
        builder.add_node(
            "update_budget_safe_tools",
            self.__create_tool_node_with_fallback(self.budget_assistant.safe_tools),
        )

        builder.add_edge("enter_update_budget", "update_budget")
        builder.add_edge("update_budget_sensitive_tools", "update_budget")
        builder.add_edge("update_budget_safe_tools", "update_budget")
        builder.add_conditional_edges(
            "update_budget",
            route_update_budget,
            ["update_budget_sensitive_tools", "update_budget_safe_tools", "leave_skill", END],
        )

        builder.add_edge("leave_skill", "primary_assistant")

        builder.add_node(
            "primary_assistant_tools", self.__create_tool_node_with_fallback(self.primary_assistant.tools)
        )

        # The assistant can route to one of the delegated assistants,
        # directly use a tool, or directly respond to the user
        builder.add_conditional_edges(
            "primary_assistant",
            route_primary_assistant,
            [
                "enter_update_budget",
                "primary_assistant_tools",
                END,
            ],
        )
        builder.add_edge("primary_assistant_tools", "primary_assistant")
        builder.add_conditional_edges(START, route_to_workflow)
        
        app = builder.compile(
            checkpointer=memory,
            # Let the user approve or deny the use of sensitive tools
            interrupt_before=[
                "update_budget_sensitive_tools",
            ],
        )

        return app   
    

