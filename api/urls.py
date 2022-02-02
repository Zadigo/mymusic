from django.urls import re_path
from rest_framework.routers import DefaultRouter

from api.views import albums

app_name = 'api'

router = DefaultRouter()

urlpatterns = [
    re_path(r'^search/albums', albums.search_albums),
    re_path(r'^genres', albums.get_genres),
    re_path(r'^albums', albums.get_albums)
]

urlpatterns += router.urls
