from django.urls import re_path
from rest_framework.routers import DefaultRouter

from api.views import albums, playlists

app_name = 'api'

router = DefaultRouter()

urlpatterns = [
    re_path(r'^search/albums', albums.search_albums),
    
    re_path(r'^playlists/(?P<pk>\d+)/remove', playlists.remove_song_from_playlist),
    re_path(r'^playlists/(?P<pk>\d+)/delete', playlists.delete_playlist),
    re_path(r'^playlists/(?P<pk>\d+)/add', playlists.add_song_to_playlist),
    re_path(r'^playlists/create', playlists.create_playlist),
    re_path(r'^playlists', playlists.get_user_playlists),
    
    re_path(r'^genres', albums.get_genres),
    re_path(r'^albums', albums.get_albums)
]

urlpatterns += router.urls
