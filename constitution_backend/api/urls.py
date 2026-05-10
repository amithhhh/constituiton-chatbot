from django.urls import path
from .views import PredictAnswer

urlpatterns = [
    path('predict/', PredictAnswer.as_view(), name='predict-answer'),
]