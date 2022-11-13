from rest_framework import viewsets
from rest_framework.response import Response
from product.models.productModel import Tag, Product
from product.serializers.productSerializer import ProductSerializer
from django.views.decorators.csrf import csrf_exempt

'''
/api/product/
def list(request)

/api/product/{product_id}
def retrieve(request, pk)
def update(request, pk)
'''

class ProductViewSet(viewsets.GenericViewSet):
    queryset = Product.objects.all() 
    serializer_class = ProductSerializer

    # GET /api/product/
    @csrf_exempt
    def list(self, request):       # filter mainCategory
        mainCategory = request.GET.get("mainCategory", "")  
        products = (
            self.get_queryset()
            .filter(
                mainCategoryicontains=mainCategory
            )
            .distinct()
        )
        products = products[:20]            # 20 product lists
        serializer = self.get_queryset(products, many=True)
        data = serializer.data              # dictionary format not json yet
        return Response(data, status=200)   # json

    # GET /api/product/{product_id}
    @csrf_exempt
    def retrieve(self, request, pk=None):
        product = Product.objects.get(id=pk)
        return Response(self.get_queryset(product).data, status=200)

    # PUT /api/product/{product_id}  
    @csrf_exempt
    def update(self, request, pk=None):
        product = Product.objects.get(id=pk)
        data = request.data.copy()
        averageScoreData = data.pop("averageScore")

        # update, puts only the modifying field, partial true
        serializer = self.get_queryset(product, data={'averageScore': averageScoreData}, partial=True)
        serializer.is_valid(raise_exception=True) # if False 400 response
        serializer.save()

        return Response(serializer.data, status=200)
