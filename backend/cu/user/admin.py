from .models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from product.models import Product, Score, Rate

# Register your models here.
admin.site.register(Product)
admin.site.register(Score)
admin.site.register(Rate)

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
# python manage.py runserver 0.0.0.0:8000

# superuser
# email: super@gmail.com
# username: super
# password: supersuper
