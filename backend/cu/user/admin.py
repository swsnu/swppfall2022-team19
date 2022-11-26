from .models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from product.models.productModel import Product, Tag
from product.models.rateModel import Rate, Like

# Register your models here.
admin.site.register(Product)
admin.site.register(Rate)
admin.site.register(Tag)
admin.site.register(Like)

class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'gender', 'age', 'taste', 'question']
    search_fields = ['usrname']


admin.site.register(User, UserAdmin)

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