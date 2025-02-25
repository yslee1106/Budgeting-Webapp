from django.db import models
from django.contrib.auth.models import User

class Conversation(models.Model):
    title = models.CharField(max_length=60, null=False)
    started_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    text = models.TextField()
    is_user_message = models.BooleanField(default=True)  # True for user, False for AI
    created_at = models.DateTimeField(auto_now_add=True)
