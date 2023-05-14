from django.urls import re_path

from playlists import api_views

app_name = 'api_playlists'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/from-songs$', api_views.update_sorting_view),
    re_path(r'^(?P<pk>\d+)/sort$', api_views.update_sorting_view),
    re_path(r'^(?P<pk>\d+)/remove$', api_views.remove_song_from_playlist),
    re_path(r'^(?P<pk>\d+)/add$', api_views.add_song_to_playlist),
    re_path(r'^(?P<pk>\d+)/delete$', api_views.delete_playlist_view),
    # re_path(r'^(?P<genre>\w+)', api_views.explore_genre_view),
    re_path(r'^(?P<pk>\d+)$', api_views.playlist_details_view),
    re_path(r'^merge$', api_views.merge_playlists_view),
    re_path(r'^create$', api_views.create_playlist_view),
    re_path(r'^$', api_views.user_playslists_view),
    
    # TODO: This is a "catch all" url that prevents the "merge, create urls"
    # from working correctly
    re_path(r'^(?P<genre>\w+)$', api_views.official_playlist_details_view),
    # re_path(r'^explore$', api_views.explore_view),
]
