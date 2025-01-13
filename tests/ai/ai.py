from langchain_community.chat_models import ChatZhipuAI
from langchain.prompts import PromptTemplate

# Define your GPT API key
OPENAI_API_KEY = "f4a03daba59ce41fe11a1467a7c17055.3S0mX9WjCszrNi3x"

# Initialize the GPT model
chat = ChatZhipuAI(
    zhipuai_api_key=OPENAI_API_KEY,
    temperature=0.5,
    model_name="glm-4-flash"  # Adjust model (e.g., "gpt-3.5-turbo") based on your API subscription
)

# Define a simple prompt template
prompt_template = PromptTemplate(
    input_variables=["user_input"],
    template="You are a helpful assistant. {user_input}"
)

def get_response_from_llm(user_prompt):
    """
    Sends a prompt to the LLM and returns the response.

    Args:
        user_prompt (str): The user's input.

    Returns:
        str: The LLM's response.
    """
    # Format the prompt
    formatted_prompt = prompt_template.format(user_input=user_prompt)

    # Get the response
    response = chat.invoke(formatted_prompt)
    return response

# Example usage
if __name__ == "__main__":
    user_input = input("Enter your prompt: ")
    response = get_response_from_llm(user_input)
    print("Response from LLM:", response)
