from django.urls import path
from .views import UserApiView

app_name = 'users'
urlpatterns = [
    path('', UserApiView.as_view())
]
