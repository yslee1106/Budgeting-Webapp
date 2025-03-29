from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from .models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        # Extract refresh token from response data
        refresh_token = response.data.pop('refresh', None)
        
        if refresh_token:
            # Set HttpOnly cookie for refresh token
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,  # For HTTPS only
                samesite='Lax',  # CSRF protection
                max_age=7 * 24 * 60 * 60,  # 7 days (matches REFRESH_TOKEN_LIFETIME)
            )
        return response
    
class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('refresh_token')
        return response