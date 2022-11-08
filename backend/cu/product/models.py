from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Rate(models.Model):
    user_id = models.IntegerField()
    product_id = models.IntegerField()
    category_id = models.IntegerField()
    scores = ArrayField(models.IntegerField())
    comment = models.TextField(blank=True)



class Review(models.Model):
    user_id = models.IntegerField()
    product_id = models.IntegerField()
    scores= ArrayField(models.IntegerField())
    comment = models.TextField(blank=True)
    likedCount = models.IntegerField()
    liked = models.BooleanField()


