from django.urls import re_path

from playlists import views

app_name = 'playlists'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/sort', views.update_sorting_view),
    re_path(r'^(?P<pk>\d+)/remove$', views.remove_song_from_playlist),
    re_path(r'^(?P<pk>\d+)/add$', views.add_song_to_playlist),
    re_path(r'^(?P<pk>\d+)/delete$', views.delete_playlist_view),
    # re_path(r'^(?P<genre>\w+)', views.explore_genre_view),
    re_path(r'^(?P<pk>\d+)$', views.playlist_details_view),
    re_path(r'^(?P<genre>\w+)$', views.official_playlist_details_view),
    re_path(r'^create', views.create_playlist_view),
    # re_path(r'^explore$', views.explore_view),
    re_path(r'^$', views.user_playslists_view),
]
