from django.db import models
from django.contrib.postgres.fields import ArrayField
from user.models import User


# Create your models here.

class Tag(models.Model):
    name = models.CharField()
    #user subscribed to tags?? 


class Product(models.Model):
    name = models.CharField()
    mainCategory = models.CharField()
    subCategory = models.CharField()
    imageUrl = models.URLField()
    details = models.TextField()
    price = models.IntegerField()
    newProduct = models.BooleanField(default = False)
    tags = models.ManyToManyField(Tag)

class Score(models.Model):
    score = models.IntegerField()

class Rate(models.Model):
    user = models.ForeignKey(User)
    product = models.ForeignKey(Product)
    scores = models.ManyToManyField(Score)
    comment = models.TextField(blank=True)
    picture = models.ImageField(default = None)
    likedCount = models.IntegerField(default = 0)
    liked = models.BooleanField(default = False)
