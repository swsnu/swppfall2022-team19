from django.db import models
from user.models import User


# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length = 100)
    #user subscribed to tags?? 


class Product(models.Model):
    name = models.CharField(max_length = 300, blank=False, null=False)
    mainCategory = models.CharField(max_length = 100, blank=False, null=False)
    subCategory = models.CharField(max_length = 300, blank=False, null=False)
    imageUrl = models.URLField(blank = False)
    details = models.TextField(max_length = 300, blank=False, null=False)
    price = models.IntegerField(blank = False)
    newProduct = models.BooleanField(default = False)
    tags = models.ManyToManyField(Tag, related_name = "products")

class Score(models.Model):
    score = models.IntegerField(blank = False)

class Rate(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    scores = models.ManyToManyField(Score, related_name = "rates")
    comment = models.TextField(blank=True)
    picture = models.ImageField(default = None)
    likedCount = models.IntegerField(default = 0)
    liked = models.BooleanField(default = False)
