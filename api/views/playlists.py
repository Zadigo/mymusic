from api.serializers.playlists import PlaylistSerializer
from api.views import create_response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view

from playlists.models import UserPlaylist
from artists.models import Song


@api_view(['get'])
def get_user_playlists(request, **kwargs):
    queryset = UserPlaylist.objects.filter(author__username='zadigo')
    serializers = PlaylistSerializer(instance=queryset, many=True)
    return create_response(serializer=serializers)


@api_view(['post'])
def add_song_to_playlist(request, **kwargs):
    playlist = get_object_or_404(UserPlaylist, id=kwargs.get('pk'))
    song = get_object_or_404(Song, id=request.data.get('song_id'))
    playlist.songs.add(song)
    return create_response(data={'state': 'True'})
