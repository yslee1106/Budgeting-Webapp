"""
ASGI config for FinancialTracker project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
# from chatbot import consumers

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings.development')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    # "websocket": AuthMiddlewareStack(
    #     URLRouter([
    #         path("ws/chatbot/", consumers.ChatConsumer.as_asgi()),
    #     ])
    # )
})
