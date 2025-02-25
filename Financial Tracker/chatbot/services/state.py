from typing import Annotated, Literal, Optional
from typing_extensions import TypedDict
from langchain_core.messages import ToolMessage
from langgraph.graph.message import AnyMessage, add_messages

def update_dialog_stack(left: list[str], right: Optional[str]) -> list[str]:
    """Push or pop the state."""
    if right is None:
        return left
    if right == "pop":
        return left[:-1]
    return left + [right]

# This node will be shared for exiting all specialized assistants
def pop_dialog_state(state) -> dict:
    """Pop the dialog stack and return to the main assistant.

    This lets the full graph explicitly track the dialog flow and delegate control
    to specific sub-graphs.
    """
    messages = []
    if state["messages"][-1].tool_calls:
        # Note: Doesn't currently handle the edge case where the llm performs parallel tool calls
        messages.append(
            ToolMessage(
                content="Resuming dialog with the host assistant. Please reflect on the past conversation and assist the user as needed.",
                tool_call_id=state["messages"][-1].tool_calls[0]["id"],
            )
        )
    return {
        "dialog_state": "pop",
        "messages": messages,
    }

class State(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
    #If initial information about the user is needed
    #user_info: str
    dialog_state: Annotated[
        list[
            Literal[
                "assistant",
                "update_budget",
            ]
        ],
        update_dialog_stack,
    ]