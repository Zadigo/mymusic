from re import S
from api.serializers.albums import SongSerializer
from api.serializers.playlists import PlaylistSerializer, SortPlaylistSerializer
from api.views import create_response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from playlists.choices import UserCustomsort

from playlists.models import UserPlaylist
from artists.models import Song
from django.contrib.auth import get_user_model

USER_MODEL = get_user_model()

@api_view(['get'])
def get_user_playlists(request, **kwargs):
    queryset = UserPlaylist.objects.filter(author__username='zadigo')
    serializers = PlaylistSerializer(instance=queryset, many=True)
    return create_response(serializer=serializers)


@api_view(['post'])
def update_sorting(request, pk, **kwargs):
    """Get a playlist and sort the songs in
    regards to the"""
    playlist = get_object_or_404(UserPlaylist, id=pk)
    
    serializer = SortPlaylistSerializer(data=request.data)
    serializer.is_valid(raise_exception=False)

    songs = playlist.songs.all()
    method = serializer.validated_data['user_sort']

    if method == str(UserCustomsort.ALBUM_NAME):
        songs = songs.order_by('name')
    elif method == str(UserCustomsort.ARTIST_NAME):
        songs = songs.order_by('album__artist__name')
    elif method == str(UserCustomsort.GENRE):
        songs = songs.order_by('genre')
    elif method == str(UserCustomsort.ADDED):
        pass
    elif method == str(UserCustomsort.DURATION):
        pass
    playlist.user_sort = serializer.validated_data['user_sort']
    playlist.save()
    
    serialized_songs = SongSerializer(instance=songs, many=True)
    return create_response(data={'id': playlist.id, 'songs': serialized_songs.data})


@api_view(['post'])
def add_song_to_playlist(request, pk, **kwargs):
    playlist = get_object_or_404(UserPlaylist, id=pk)
    song = get_object_or_404(Song, id=request.data.get('song_id'))
    playlist.songs.add(song)
    return create_response(data={'state': 'True'})


@api_view(['post', 'delete'])
def remove_song_from_playlist(request, pk, **kwargs):
    playlist = get_object_or_404(UserPlaylist, id=pk)
    song = get_object_or_404(Song, id=request.data.get('song_id'))
    
    playlist.songs.remove(song)
    playlist.refresh_from_db(fields=['songs'])
    
    serialized_playlist = PlaylistSerializer(instance=playlist)
    return create_response(serializer=serialized_playlist)


@api_view(['post'])
def create_playlist(request, **kwargs):
    # TODO: Authentify the user that sends
    # the request by using a token
    user = get_object_or_404(USER_MODEL, id=1)
    
    last_playlist = UserPlaylist.objects.last()
    
    name = f'Playlist n°{last_playlist.id + 1}'
    playlist = UserPlaylist.objects.create(author=user, name=name)
    serialized_playlist = PlaylistSerializer(instance=playlist)
    
    return create_response(serializer=serialized_playlist)


@api_view(['post', 'delete'])
def delete_playlist(request, pk, **kwargs):
    # TODO: Authentify the user on the backend
    user = None
    # playlist = get_object_or_404(UserPlaylist, id=request.data.get('playlist_id'), user=user)
    playlist = get_object_or_404(UserPlaylist, id=pk)
    playlist.delete()
    return create_response(data={ 'id': playlist.id })
