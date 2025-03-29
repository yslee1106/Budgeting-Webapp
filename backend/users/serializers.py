from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # Ensure the password field is write-only and required for creation
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = [
            'id', 'email', 'password', 
            #'first_name', 'last_name', 'country', 'phone_number',
            #'date_of_birth', 'currency', 'language', 
            'time_zone', 'two_factor_authentication',
            'is_active', 'is_staff', 'is_superuser', 'last_login', 'date_joined'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'last_login': {'read_only': True},
            'date_joined': {'read_only': True},
            'is_active': {'read_only': True},
            'is_staff': {'read_only': True},
            'is_superuser': {'read_only': True},
        }

    def create(self, validated_data):
        # Extract the password and remove it from the validated data
        password = validated_data.pop('password', None)
        email = validated_data.pop('email')
        
        # Create the user using the UserManager
        user = User.objects.create_user(
            email=email,
            password=password,
            **validated_data
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        del data['refresh']  # Remove refresh token from response body
        return data  # Only returns access token