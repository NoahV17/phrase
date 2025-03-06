from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('lessons/', views.lessons_list, name='lessons_list'),
    path('lessons/<int:lesson_id>/', views.lesson_detail, name='lesson_detail'),
    path('transcribe/', views.transcribe_page, name='transcribe_page'),
    # API endpoint
    path('api/transcribe/', views.transcribe_audio, name='transcribe_audio'),
]
