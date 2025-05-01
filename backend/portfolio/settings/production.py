from .base import *

DEBUG = False
ALLOWED_HOSTS = ["fintrack-product-testing.railway.app"]

# Security Headers (for production)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True

# HSTS settings (you might adjust these when testing)
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Whitenoise static files serving
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')