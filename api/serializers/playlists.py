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
    created_on = fields.DateField()
    
    
class SortPlaylistSerializer(Serializer):
    user_sort = fields.ChoiceField(
        choices=UserCustomsort.choices,
        default=UserCustomsort.ALBUM_NAME
    )
