from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views.productView import ProductViewSet
from .views.rateView import RateViewSet

router = SimpleRouter()
router.register("product", ProductViewSet, basename="product")
router.register("rate", RateViewSet, basename="rate")

urlpatterns = [path("", include(router.urls))]



'''
# api/product/
# total product -> list
# specific product-> retrieve

# api/rate/
# total rate... -> list
# specific rate -> retrieve, update, destroy

urlpatterns = [
    path('<str:mainCategory>/all/', ProductViewSet.list, name='product_by_main_category'),
    path('<int:id>/', ProductViewSet.retrieve, name = "getProduct"),
    path('<int:id>/', ProductViewSet.update, name = "updateProduct"),
    path('<int:id>/rate/' ,RateViewSet.create, name='createRate'),
    path('<int:id>/rates/', RateViewSet.list, name='fetchRates'),
    path('rate/<int:id>/', RateViewSet.update, name='updateRate'),
    path('rate/<int:id>/', RateViewSet.destroy, name='deleteRate'),
]
'''

