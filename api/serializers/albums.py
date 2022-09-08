from rest_framework.serializers import Serializer
from rest_framework import fields

class ArtistSerializer(Serializer):
    id = fields.IntegerField()
    name = fields.CharField()
    area = fields.CharField()
    date_of_birth = fields.DateField()
    genre = fields.DateField()
    cover_image = fields.ImageField()
    cover_image_thumbnail = fields.FileField()
    number_of_followers = fields.IntegerField()
    created_on = fields.DateField()


class SongSerializer(Serializer):
    id = fields.IntegerField()
        
    name = fields.CharField()
    song_file = fields.FileField()
    genre = fields.CharField()
    duration = fields.DurationField()
    bitrate = fields.IntegerField()
    

class AlbumSerializer(Serializer):
    id = fields.IntegerField()
    
    artist = ArtistSerializer()
    
    song_set = SongSerializer(many=True)
    
    name = fields.CharField()
    genre = fields.CharField()
    
    cover_image = fields.ImageField()
    cover_image_thumbnail = fields.FileField()
    
    is_single = fields.BooleanField()
    number_of_plays = fields.IntegerField()
    number_of_songs = fields.IntegerField()
    
    active = fields.BooleanField()
    created_on = fields.DateField()
