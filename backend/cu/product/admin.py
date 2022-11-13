from django.contrib import admin
from .models.productModel import Product,Tag
from .models.rateModel import Score, Rate

# Register your models here.
admin.site.register(Tag)
admin.site.register(Product)
admin.site.register(Rate)
admin.site.register(Score)