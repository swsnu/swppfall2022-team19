from rest_framework import serializers
from product.models.rateModel import Rate

        
class RateSerializer(serializers.ModelSerializer): 
    username = serializers.ReadOnlyField(source="user.username")
    
    class Meta:
        model = Rate
        fields = (
            "id",
            "user_id",
            "username",
            "product_id",
            "scores",
            "comment",
            "picture",
            "likedCount",
            "created_at",
        )
