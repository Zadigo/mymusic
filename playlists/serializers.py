from rest_framework import fields
from rest_framework.serializers import Serializer
# from api.serializers.albums import SongSerializer
from api.serializers.albums import AlbumSerializer
from api.serializers.auth import UserSerializer
from playlists.choices import UserCustomsort


class PlaylistSongSerializer(Serializer):
    id = fields.IntegerField()

    album = AlbumSerializer()

    name = fields.CharField()
    song_file = fields.FileField()
    genre = fields.CharField()
    duration = fields.DurationField()
    bitrate = fields.IntegerField()


class PlaylistSerializer(Serializer):
    id = fields.IntegerField()
    name = fields.CharField()

    author = UserSerializer()
    songs = PlaylistSongSerializer(many=True)

    cover_image = fields.ImageField()
    background_color = fields.CharField()
    number_of_followers = fields.IntegerField()
    created_on = fields.DateField()


class SortPlaylistSerializer(Serializer):
    user_sort = fields.ChoiceField(
        choices=UserCustomsort.choices,
        default=UserCustomsort.ALBUM_NAME
    )
    
    def sort_items(self, playlist):
        songs = playlist.songs.all()
        method = self.validated_data['user_sort']

        if method == str(UserCustomsort.ALBUM_NAME):
            songs = songs.order_by('album__name')
        elif method == str(UserCustomsort.SONG_NAME):
            songs = songs.order_by('name')
        elif method == str(UserCustomsort.ARTIST_NAME):
            songs = songs.order_by('album__artist__name')
        elif method == str(UserCustomsort.GENRE):
            songs = songs.order_by('genre')
        elif method == str(UserCustomsort.ADDED):
            pass
        elif method == str(UserCustomsort.DURATION):
            songs = songs.order_by('duration')

        playlist.user_sort = self.validated_data['user_sort']
        playlist.save()
        return songs
