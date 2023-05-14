from django.urls import re_path

from artists import api_views

app_name = 'api_artists'

urlpatterns = [
    re_path(r'^charts$', api_views.charts_view),
    re_path(r'^followed$', api_views.followed_artists_view),
    re_path(r'^genres$', api_views.genres_view),
    re_path(r'^search$', api_views.search_albums_view),
    re_path(r'^(?P<pk>[0-9]+)/unfollow$', api_views.unfollow_artist_view),
    re_path(r'^(?P<pk>[0-9]+)/follow$', api_views.follow_artist_view),
    re_path(r'^(?P<reference>[a-zA-Z0-9]+)$', api_views.artist_details_view),
]
