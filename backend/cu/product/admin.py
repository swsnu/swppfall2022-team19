from django.contrib import admin
from product.models import Rate, Review

# Register your models here.
admin.site.register(Rate, Review)
