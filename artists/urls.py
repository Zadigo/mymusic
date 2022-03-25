from django.urls import re_path
from artists import views

urlpatterns = [
    re_path(r'^search', views.search_albums_view),
    re_path(r'^genres', views.genres_view),
    re_path(r'^albums', views.albums_view)
]
