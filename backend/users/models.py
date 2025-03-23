from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    # Login Fields (Password handled by AbstractBaseUser)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Personal Fields
    first_name = models.CharField(max_length=100, null=False, blank=False)
    last_name = models.CharField(max_length=100, null=False, blank=False)
    country = models.CharField(max_length=56, null=False, blank=False)
    phone_number = models.CharField(max_length=20, null=False, blank=False)
    date_of_birth = models.DateField(null=False, blank=False)
    

    # Preference Fields
    currency = models.CharField(max_length=3, null=False, blank=False)
    language = models.CharField(max_length=85, null=False, blank=False)
    time_zone = models.CharField(max_length=32, default='UTC', null=False, blank=False)

    # Security Fields
    two_factor_authentication = models.BooleanField(default=False, null=False, blank=False)

    # Metadata Fields
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True,   null=False, blank=False)
    last_login = models.DateTimeField(default=timezone.now)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email