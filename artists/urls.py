from django.urls import re_path

from artists import views

app_name = 'artists'

urlpatterns = [
    re_path(r'^genres', views.genres_view),
    re_path(r'^albums', views.albums_view),



    re_path(r'^search', views.search_albums_view),
    re_path(r'^(?P<reference>[a-zA-Z0-9]+)', views.artist_view),
]
