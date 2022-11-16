from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views.productView import ProductViewSet
from .views.rateView import RateViewSet

router = SimpleRouter()
router.register("product", ProductViewSet, basename="product")
router.register("rate", RateViewSet, basename="rate")

urlpatterns = [path("", include(router.urls))]