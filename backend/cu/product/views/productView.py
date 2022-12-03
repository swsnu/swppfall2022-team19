'''
/api/product/
def list(self, request) - products 가져오기

/api/product/mainCategory/
def list(self, request) - 특정 mainCategory products 가져오기

/api/product/{product_id}/
def retrieve(self, request, pk) - 특정 product 가져오기
def update(self, request, pk) - avgScore 수정
'''

import json
from rest_framework import viewsets
from rest_framework.response import Response
from product.models.productModel import Product
from product.serializers.productSerializer import ProductSerializer
#from django.views.decorators.csrf import csrf_exempt
#from django.db.models import Q
from rest_framework.decorators import action

class ProductViewSet(viewsets.GenericViewSet):
    queryset = Product.objects.all() 
    serializer_class = ProductSerializer

    # (O)GET /api/product/
    def list(self, request):
        products = Product.objects.all()
        serializer = self.get_serializer(products, many=True)
        data = serializer.data              # dictionary format not json yet
        print("/api/product")
        return Response(data, status=200)   # json


    # ()GET /api/product/mainCategory/
    @action(detail=False, methods=["GET"])
    def mainCategory(self, request):
        mainCategory=request.GET.get("mainCategory")
        rates = (
            Product.objects.filter(mainCategory=mainCategory)
        )
        serializer = ProductSerializer(rates,many=True)
        return Response(serializer.data, status=200)

    # (O)GET /api/product/{product_id}/
    def retrieve(self, request, pk=None):
        product = self.get_object()
        return Response(self.get_serializer(product).data, status=200)

    # (O)PUT /api/product/{product_id} 
    def update(self, request, pk=None):
        product = self.get_object()
        data = json.loads(request.body.decode('utf-8'))
        averageScoreData = data.pop("averageScore")

        # update, puts only the modifying field, partial true
        serializer = self.get_serializer(product, data={'averageScore': averageScoreData}, partial=True)
        # (O)bad request 400
        serializer.is_valid(raise_exception=True) # if False 400 response
        serializer.save()

        return Response(serializer.data, status=200)

    # def searchName(self, request, searchKey):
    #     products = [Product.objects.filter(Q(name__contains=searchKey))]
    #     serializer = self.get_serializer(products, many=True)
    #     data = serializer.data              # dictionary format not json yet
    #     return Response(data, status=200)   # json

    # def searchTag(self, request, searchTag):
    #     products = [product for product in Product.objects.all() if searchTag in product.tags]
    #     serializer = self.get_serializer(products, many=True)
    #     # data = serializer.data              # dictionary format not json yet
    #     return Response(data, status=200)   # json