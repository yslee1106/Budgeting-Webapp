import json
from channels.generic.websocket import AsyncWebsocketConsumer

from .chatbot import ChatBot

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chatbot = ChatBot()
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        user_message = text_data_json['message']

        # Get response from chatbot
        bot_response = self.chatbot.run(user_message)

        # Send response back to client
        await self.send(text_data=json.dumps({
            'message': bot_response
        }))

        