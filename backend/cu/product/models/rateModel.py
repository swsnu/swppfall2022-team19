from django.utils import timezone
from django.db import models
from user.models import User
from .productModel import Product
    
class Rate(models.Model):
   
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    scores = models.CharField(max_length=100, blank=False, null=False)
    averageScore = models.FloatField(default = 0)
    comment = models.TextField(blank=True, null=False)
    picture = models.ImageField(upload_to='%Y/%m/%d', blank=True, null=True)
    likedCount = models.IntegerField(default = 0)
    created_at = models.DateTimeField(default=timezone.now) # KOR time, settings.py 

    def __str__(self):
        return self.product.name

class Like(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    rate = models.ForeignKey(Rate, on_delete = models.CASCADE)