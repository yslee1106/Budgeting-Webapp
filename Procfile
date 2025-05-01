release: python manage.py migrate
web: gunicorn portfolio.wsgi:application --bind 0.0.0.0:${PORT:-8000} --timeout 120
worker: celery -A portfolio worker --loglevel=info
beat: celery -A portfolio beat --loglevel=info