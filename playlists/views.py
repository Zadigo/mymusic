from api.serializers.albums import SongSerializer
from api.views import create_response
from artists.models import Song
from django.contrib.auth import get_user_model
from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from playlists.models import UserPlaylist
from playlists.serializers import PlaylistSerializer, SortPlaylistSerializer

USER_MODEL = get_user_model()


@api_view(['get'])
def user_playslists_view(request, **kwargs):
    queryset = UserPlaylist.objects.filter(author__username='zadigo')
    queryset = queryset.annotate(number_of_followers=Count('followers__id'))
    serializers = PlaylistSerializer(instance=queryset, many=True)
    return create_response(serializer=serializers)


@api_view(['post'])
def update_sorting_view(request, pk, **kwargs):
    """Get a playlist and sort the songs in
    regards to the incoming sorting method"""
    playlist = get_object_or_404(UserPlaylist, id=pk)

    serializer = SortPlaylistSerializer(data=request.data)
    serializer.is_valid(raise_exception=False)

    # songs = playlist.songs.all()
    # method = serializer.validated_data['user_sort']

    # if method == str(UserCustomsort.ALBUM_NAME):
    #     songs = songs.order_by('album__name')
    # elif method == str(UserCustomsort.NAME):
    #     songs = songs.order_by('name')
    # elif method == str(UserCustomsort.ARTIST_NAME):
    #     songs = songs.order_by('album__artist__name')
    # elif method == str(UserCustomsort.GENRE):
    #     songs = songs.order_by('genre')
    # elif method == str(UserCustomsort.ADDED):
    #     pass
    # elif method == str(UserCustomsort.DURATION):
    #     songs = songs.order_by('duration')

    # playlist.user_sort = serializer.validated_data['user_sort']
    # playlist.save()
    songs = serializer.sort_items(playlist)
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
def create_playlist_view(request, **kwargs):
    user = get_object_or_404(USER_MODEL, id=1)

    last_playlist = UserPlaylist.objects.last()

    name = f'Playlist n°{last_playlist.id + 1}'
    playlist = UserPlaylist.objects.create(author=user, name=name)
    serialized_playlist = PlaylistSerializer(instance=playlist)

    return create_response(serializer=serialized_playlist)


@api_view(['post', 'delete'])
def delete_playlist_view(request, pk, **kwargs):
    user = None
    # playlist = get_object_or_404(UserPlaylist, id=request.data.get('playlist_id'), user=user)
    playlist = get_object_or_404(UserPlaylist, id=pk)
    playlist.delete()
    return create_response(data={'id': playlist.id})


@api_view(['get'])
def explore_genre_view(request, genre, **kwargs):
    # TODO: Find a way to get a playlist by genre
    playlists = UserPlaylist.objects.filter(name__icontains=genre)
    serializer = PlaylistSerializer(instance=playlists, many=True)
    return create_response(serializer=serializer)


@api_view(['get'])
def playlist_details_view(request, pk, **kwargs):
    playlist = get_object_or_404(UserPlaylist, id=pk)
    return_response = {
        **playlist.followers.aggregate(count=Count('id'))
    }
    return create_response(data=return_response)
