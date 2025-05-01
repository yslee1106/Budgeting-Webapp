from celery import Celery
import os
import dotenv

dotenv.load_dotenv()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings.development')

app = Celery('portfolio')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()