from langgraph import LangGraph
from langgraph.nodes import LLMNode, FunctionNode

# Initialize graph
graph = LangGraph()

# Define nodes
llm_node = LLMNode(name="Summarizer", model="gpt-4", prompt_template="Summarize: {text}")
func_node = FunctionNode(name="Text Preprocessor", func=lambda x: {"text": x["raw_data"].strip()})

# Add nodes to graph
graph.add_node(func_node)
graph.add_node(llm_node)

# Connect nodes
graph.connect_nodes("Text Preprocessor", "Summarizer")

# Execute graph
result = graph.run(input_data={"raw_data": "   Hello, LangGraph!   "})
print(result)
