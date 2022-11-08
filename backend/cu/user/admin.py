from .models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (" User Profile",
            {"fields": ("gender", "age", "taste", "question"), },),)

# class userAdmin(admin.ModelAdmin):
# list_display('username', 'gender', 'age', 'taste', 'question')
# list_filter('username', 'gender', 'age', 'taste')

# python manage.py makemigrations
# python manage.py migrate
# python manage.py createsuperuser
# python manage.py runserver

# superuser
# email: super@gmail.com
# username: super
# password: supersuper
