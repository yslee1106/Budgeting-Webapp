from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError
from django.utils import timezone

from budget.models import Session

User = get_user_model()

class UserAuthService:
    @staticmethod
    def create_user(email, password, **validated_data):
        if User.objects.filter(email=email).exists():
            raise ValidationError("A user with this email already exists.")
        
        user = User.objects.create_user(
            email=email,
            password=password,
            **validated_data
        )

        Session.objects.create(
            user=user,
            period=timezone.now().replace(day=1).date(),
            total_funds=0,
            available_funds=0,
            total_expense=0,
            total_goals=0
        )

        return user
