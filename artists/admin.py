import datetime
from django.contrib import admin
from mutagen.mp3 import MP3

from artists.models import Album, Artist, Song


@admin.register(Artist)
class ArtistsAdmin(admin.ModelAdmin):
    list_display = ['name', 'genre', 'created_on']
    search_fields = ['name', 'genre']
    date_hiearchy = 'created_on'


@admin.register(Album)
class AlbumsAdmin(admin.ModelAdmin):
    list_display = ['name', 'artist', 'is_single', 'active']
    date_hiearchy = 'created_on'
    search_fields = ['name', 'artist__name']


@admin.register(Song)
class SongsAdmin(admin.ModelAdmin):
    list_display = ['name', 'album', 'genre', 'duration']
    date_hiearchy = 'added_on'
    search_fields = ['name', 'album__name', 'genre']
    actions = ['get_file_metadata']
    
    def get_file_metadata(self, request, queryset):
        for song in queryset:
            instance = MP3(song.song_file.path)
            duration = str(instance.info.length)
            minutes, seconds = duration.split('.')
            seconds = round(int(seconds), 3)
            duration = datetime.timedelta(minutes=int(minutes), seconds=seconds)
            song.duration = duration
            song.bitrate = instance.info.bitrate
            song.save()
