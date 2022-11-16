from rest_framework import serializers
from product.models.productModel import Tag, Product

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name") # Tag's id, name

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # return all the fields of Product model
