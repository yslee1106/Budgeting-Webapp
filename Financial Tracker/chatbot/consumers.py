import json
import uuid
from channels.generic.websocket import AsyncWebsocketConsumer

from .chatbot import ChatBot

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chatbot = await ChatBot.create()
        self.thread_id = str(uuid.uuid4())
        await self.accept()

    async def disconnect(self, close_code):
        self.chatbot.close_pool()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        user_message = text_data_json['message']

        # Get response from chatbot
        try:
            events = self.chatbot.run(user_message, self.thread_id)
            _printed = set()
            # Filter and send only AI messages
            async for event in events:
                # Check if the event contains an AI message
                for message in event.get("messages", []):
                    print(message.pretty_repr(html=True))
                    if message.type == "ai" and message.content and message.id not in _printed:
                        await self.send(text_data=json.dumps({
                            "message": message.content
                        }))
                        _printed.add(message.id)
        except:
            return "Sorry I didn't get a response"
        