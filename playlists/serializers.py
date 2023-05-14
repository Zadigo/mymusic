from artists.serializers import AlbumSerializer
from rest_framework import fields
from rest_framework.serializers import Serializer
from django.shortcuts import get_list_or_404, get_object_or_404
from playlists.choices import UserCustomSort
from artists.models import Song
from playlists.models import UserPlaylist

# TODO:


class UserSerializer(Serializer):
    id = fields.IntegerField()
    username = fields.CharField()


class _PlaylistSongSerializer(Serializer):
    id = fields.IntegerField()
    album = AlbumSerializer()
    name = fields.CharField()
    song_file = fields.FileField()
    genre = fields.CharField()
    duration = fields.FloatField()
    bitrate = fields.IntegerField()


class PlaylistSerializer(Serializer):
    id = fields.IntegerField()
    name = fields.CharField()
    author = UserSerializer()
    songs = _PlaylistSongSerializer(many=True)
    cover_image = fields.ImageField()
    background_color = fields.CharField()
    number_of_followers = fields.IntegerField()
    created_on = fields.DateField()


class OfficialPlaylistSerializer(PlaylistSerializer):
    author = None


class SortPlaylistValidator(Serializer):
    user_sort = fields.ChoiceField(
        choices=UserCustomSort.choices,
        default=UserCustomSort.ALBUM_NAME
    )

    def sort_items(self, playlist):
        songs = playlist.songs.all()
        method = self.validated_data['user_sort']

        if method == str(UserCustomSort.ALBUM_NAME):
            songs = songs.order_by('album__name')
        elif method == str(UserCustomSort.SONG_NAME):
            songs = songs.order_by('name')
        elif method == str(UserCustomSort.ARTIST_NAME):
            songs = songs.order_by('album__artist__name')
        elif method == str(UserCustomSort.GENRE):
            songs = songs.order_by('genre')
        elif method == str(UserCustomSort.ADDED):
            songs = songs.order_by('album__release_date')
        elif method == str(UserCustomSort.DURATION):
            songs = songs.order_by('duration')

        playlist.user_sort = self.validated_data['user_sort']
        playlist.save()
        return songs


class PlaylistFromSongs(Serializer):
    """From a selection of songs, create
    a new user playlist"""

    songs = fields.ListField(required=True)

    def create(self, validated_data):
        playlist = get_object_or_404(UserPlaylist, id=1)
        songs = get_list_or_404(Song, id__in=validated_data['songs'])
        for song in songs:
            playlist.songs.add(song)
        return PlaylistSerializer(instance=playlist)
