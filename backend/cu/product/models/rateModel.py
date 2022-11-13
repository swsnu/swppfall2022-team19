from django.db import models
from user.models import User

from .productModel import Product

class Score(models.Model):
    score1 = models.IntegerField(default=0)
    score2 = models.IntegerField(default=0)
    score3 = models.IntegerField(default=0)
    score4 = models.IntegerField(default=0)
    score5 = models.IntegerField(default=0)

class Rate(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    
    scores = models.ForeignKey(Score, on_delete=models.CASCADE, default=Score)
    comment = models.TextField(blank=True, null=False)
    picture = models.ImageField(upload_to='%Y/%m/%d', blank=True)
    
    likedCount = models.IntegerField(default = 0)
    liked = models.BooleanField(default = False)
