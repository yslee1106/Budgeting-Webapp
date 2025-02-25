from django.urls import path
from .views import chatbot_stream, chatbot_view

urlpatterns = [
    path('', chatbot_view, name='chatbot')
]