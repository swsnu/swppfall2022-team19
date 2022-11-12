from django.db import models


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
    averageScore = models.FloatField(default = 0)


    def __str__(self):
        return self.name


