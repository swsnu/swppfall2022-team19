from django.contrib import admin
from .models import User
# Register your models here.

admin.site.register(User)

# python manage.py makemigrations
# python manage.py migrate
# python manage.py createsuperuser
# python manage.py runserver
