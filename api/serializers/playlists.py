from rest_framework import fields
from rest_framework.serializers import Serializer
# from api.serializers.albums import SongSerializer
from api.serializers.albums import AlbumSerializer

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
    
    songs = PlaylistSongSerializer(many=True)
    
    cover_image = fields.ImageField()
    created_on = fields.DateField()
