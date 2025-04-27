from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
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
                secure=False,  # Set to False for HTTP development; True in production (HTTPS)
                samesite='Lax',  # CSRF protection
                max_age=7 * 24 * 60 * 60,  # 7 days (matches REFRESH_TOKEN_LIFETIME)
            )
        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Try to get the refresh token from the HttpOnly cookie
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"detail": "Refresh token not provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Use the refresh token in the serializer
        serializer = self.get_serializer(data={"refresh": refresh_token})
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        
        response = Response(data, status=status.HTTP_200_OK)
        # Extract refresh token from response data
        new_refresh = response.data.pop('refresh', None)
        if new_refresh:
            response.set_cookie(
                key='refresh_token',
                value=new_refresh,
                httponly=True,
                secure=False, # Set to False for HTTP development; True in production (HTTPS)
                samesite='Lax',
                max_age=7 * 24 * 60 * 60,
            )
        return response

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Returns the logged-in user
        return self.request.user
    
class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Only allow the authenticated user to update their profile
        return self.request.user

class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('refresh_token')
        return response