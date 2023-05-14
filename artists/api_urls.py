from django.urls import re_path

from artists import api_views

app_name = 'api_artists'

urlpatterns = [
    re_path(r'^genres', api_views.genres_view),
    re_path(r'^search', api_views.search_albums_view),
    re_path(r'^(?P<reference>[a-zA-Z0-9]+)', api_views.artist_details_view),
]
