from rest_framework import serializers
from product.models.rateModel import Rate

        
class RateSerializer(serializers.ModelSerializer): 
    username = serializers.ReadOnlyField(source="user.username")
    # image = serializers.ImageField(allow_empty_file=True, required=False)
    
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
        )
