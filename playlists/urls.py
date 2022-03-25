from django.urls import re_path
from api import views
from playlists import views

app_name = 'playlists'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/sort', views.update_sorting_view),
    re_path(r'^(?P<pk>\d+)/remove', views.remove_song_from_playlist),
    re_path(r'^(?P<pk>\d+)/add', views.add_song_to_playlist),
    re_path(r'^create', views.create_playlist_view),
    re_path(r'^delete', views.delete_playlist_view),
    re_path(r'^$', views.get_user_playlists),
]
