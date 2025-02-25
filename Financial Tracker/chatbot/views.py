import json
import uuid
from django.shortcuts import render
from django.http import JsonResponse, StreamingHttpResponse
from .chatbot import ChatBot

def chatbot_view(request):
    template = 'chatbot.html'
    context = dict()

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "")

            # Example chatbot logic (replace with your AI logic)
            chatbot = ChatBot()
            chatbot_response = chatbot.run(user_message)

            return JsonResponse({"status": "success", "message": chatbot_response})
        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)

    return render(request, template)

def chatbot_stream(request):
    def response_generator():
        user_message = request.POST.get('message')
        chatbot = ChatBot()
        thread_id = str(uuid.uuid4())
        config = {
            "configurable": {
                "thread_id": thread_id,
            }
        }

        events = chatbot.app.stream(
            {"messages": ("user", user_message)}, config, stream_mode="values"
        )

        for event in events:
            if event and event.get("messages"):
                content = event["messages"][-1].content
                yield f"{content}\n"  # Send each chunk with a newline

    return StreamingHttpResponse(response_generator(), content_type='text/plain')

def send_message(request):
    """
    Handles incoming messages from the chatbot interface and returns a response.
    """
    if request.method == 'POST':
        try:
            # Parse the incoming JSON data
            print('in')
            data = json.loads(request.body)
            user_message = data.get('message')

            # Call your chatbot service to process the message
            chatbot = ChatBot()
            chatbot_response = chatbot.run(user_message)

            # Return the chatbot's response as JSON
            return JsonResponse({
                'status': 'success',
                'message': chatbot_response
            })
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=500)
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid request method'
    }, status=400)