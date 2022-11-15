from rest_framework import serializers
from product.models.rateModel import Score, Rate

#serializer: dic format
#serializer.data: json format

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score

        fields = ( # name, score1,2,3,4,5
            "score1",
            "score2",
            "score3",
            "score4",
            "score5",
        )
        

class newRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = '__all__'

class RateSerializer(serializers.ModelSerializer): 
    username = serializers.ReadOnlyField(source="user.username")
    scores = ScoreSerializer()

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


    # if an object is a list
    # scores = serializers.ListField(child = serializers.IntegerField())

