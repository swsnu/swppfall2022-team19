from rest_framework import serializers
from product.models.rateModel import Score, Rate

#serializer: dic format
#serializer.data: json format
class ScoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Score
        fields = '__all__' # score1,2,3,4,5


class RateSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Rate
        fields = '__all__'
