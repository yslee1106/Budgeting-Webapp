from .base import *

import dj_database_url

DEBUG = False
ALLOWED_HOSTS = ["*"]

DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),  # Auto-reads Railway's DATABASE_URL
        conn_max_age=600,  # Optional: connection timeout
        ssl_require=True   # Force SSL
    )
}

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