import datetime

from artists.models import Song
from artists.serializers import SongSerializer2
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.db.models import Avg, Count, StdDev
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from mymusic.utils import create_response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from playlists.models import OfficialPlaylist, UserPlaylist
from playlists.serializers import (OfficialPlaylistSerializer,
                                   PlaylistSerializer, SortPlaylistValidator)

USER_MODEL = get_user_model()


@api_view(['get'])
def user_playslists_view(request, **kwargs):
    queryset = UserPlaylist.objects.filter(author__username='zadigo')
    queryset = queryset.annotate(number_of_followers=Count('followers__id'))
    serializer = PlaylistSerializer(instance=queryset, many=True)
    return create_response(serializer=serializer)


@api_view(['post'])
def update_sorting_view(request, pk, **kwargs):
    """Get a playlist and sort the songs in
    regards to the incoming sorting method"""
    playlist = get_object_or_404(UserPlaylist, id=pk)

    serializer = SortPlaylistValidator(data=request.data)
    serializer.is_valid(raise_exception=False)
    songs = serializer.sort_items(playlist)
    serialized_songs = SongSerializer2(instance=songs, many=True)
    return create_response(serializer=serialized_songs)


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
def explore_view(request, **kwargs):
    playlists = OfficialPlaylist.objects.filter(genre__iexact=None)

    # Top

    # New releases
    new_releases = OfficialPlaylistSerializer(instance=playlists, many=True)

    return_reponse = {
        'top': [],
        'new_releases': new_releases.data
    }
    return create_response(data=return_reponse)


@api_view(['get'])
def playlist_details_view(request, pk, **kwargs):
    playlist = get_object_or_404(UserPlaylist, id=pk)
    return_response = {
        **playlist.followers.aggregate(count=Count('id'))
    }
    return create_response(data=return_response)


@api_view(['get'])
def official_playlist_details_view(request, genre, **kwargs):
    """how the uer the top, newet and themed oriented playlit"""
    queryset = OfficialPlaylist.objects.filter(name__icontains=genre).order_by('created_on')
    queryset = queryset.annotate(number_of_followers=Count('followers__id'))

    # Top
    statistics = queryset.aggregate(Avg('number_of_followers'), StdDev('number_of_followers'))
    average = statistics['number_of_followers__avg'] or 0
    stddev = statistics['number_of_followers__stddev'] or 0
    plus_one = average + stddev
    top_playlists = queryset.filter(number_of_followers__gte=average, number_of_followers__lte=plus_one)

    # New
    fifteen_days_ago = now() - datetime.timedelta(days=15)
    newest_playlists = queryset.filter(created_on__gte=fifteen_days_ago.date(), created_on__lte=now())

    top_playlists_serializer = OfficialPlaylistSerializer(instance=top_playlists, many=True)
    newest_playlists_serializer = OfficialPlaylistSerializer(instance=newest_playlists, many=True)
    return_response = {
        'top': top_playlists_serializer.data,
        'newest': newest_playlists_serializer.data
    }
    return create_response(data=return_response)
