from celery import shared_task

@shared_task
def example_task():
    # This is a placeholder for a core system-level task.
    print("Executing example task...")