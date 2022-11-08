from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from json import JSONDecodeError
from .models import Rate
from .models import Review

@csrf_exempt
def rate(request, productID):
    if request.method == 'GET':
        try:
            rate = Rate.objects.get(product_id=productID)
            response_dict = {
                    'id': rate.id,
                    'comment': rate.comment,
                    }
            return JsonResponse(response_dict, safe=False)
        except KeyError as e:
            return HttpResponseBadRequest('ProductID does not exist: {}'.format(productID))
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            user_id = json.loads(body)['user_id']
            product_id = json.loads(body)['product_id']
            category_id = json.loads(body)['category_id']
            scores = json.loads(body)['scores']
            comment = json.loads(body)['comment']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        rate = Review(user_id=user_id, product_id=product_id, category_id=category_id, scores=scores, comment=comment)
        rate.save()
        response_dict = {
            'id': rate.id,
            'user_id': rate.user_id,
            'product_id': rate.product_id,
            'category_id': rate.category_id,
            'scores': rate.scores,
            'comment': rate.comment,
        }
        return HttpResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def review(request, productID=None):
    if request.method == 'GET':
        if id is None:
            # get all
            review_all_list = list(Review.objects.all().values())
            return JsonResponse(review_all_list, safe=False)
        else:
            try:
                review = Review.objects.get(product_id=productID)
                response_dict = {
                        'id': review.id,
                        'user_id': review.user_id,
                        'product_id': review.product_id,
                        'scores': review.scores,
                        'comment': review.comment,
                        'likedCount': review.likedCount,
                        'liked': review.liked,
                        }
                return JsonResponse(response_dict, safe=False)
            except KeyError as e:
                return HttpResponseBadRequest('ProductID does not exist: {}'.format(productID))
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            user_id = json.loads(body)['user_id']
            product_id = json.loads(body)['product_id']
            scores = json.loads(body)['scores']
            comment = json.loads(body)['comment']
            likedCount = json.loads(body)['likedCount']
            liked = json.loads(body)['liked']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        review = Review(user_id=user_id, product_id=product_id, scores=scores, comment=comment, likedCount=likedCount, liked=liked)
        review.save()
        response_dict = {
            'id': review.id,
            'user_id': review.user_id,
            'product_id': review.product_id,
            'scores': review.scores,
            'comment': review.comment,
            'likedCount': review.likedCount,
            'liked': review.liked,
        }
        return HttpResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

