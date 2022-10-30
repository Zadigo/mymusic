from django.contrib import admin
from mutagen.mp3 import MP3

from artists.models import Album, Artist, Listener, Song


@admin.register(Artist)
class ArtistsAdmin(admin.ModelAdmin):
    list_display = ['name', 'genre', 'created_on']
    search_fields = ['name', 'genre']
    list_per_page = 100
    date_hiearchy = 'created_on'


@admin.register(Album)
class AlbumsAdmin(admin.ModelAdmin):
    list_display = ['name', 'artist', 'release_year', 'producer', 'is_single', 'is_active']
    date_hiearchy = 'created_on'
    search_fields = ['name', 'artist__name', 'producer']


@admin.register(Song)
class SongsAdmin(admin.ModelAdmin):
    list_display = ['name', 'album', 'genre', 'bitrate', 'duration']
    date_hiearchy = 'added_on'
    search_fields = ['name', 'album__name', 'genre', 'album__producer']
    actions = ['get_file_metadata']
    
    def get_file_metadata(self, request, queryset):
        for song in queryset:
            instance = MP3(song.song_file.path)
            song.duration = round(instance.info.length, 5)
            song.bitrate = instance.info.bitrate
            song.save()

            # minutes, seconds = duration.split('.')
            # seconds = round(int(seconds), 3)
            # duration = datetime.timedelta(minutes=int(minutes), seconds=seconds)
            # song.duration = duration


@admin.register(Listener)
class ListenerAdmin(admin.ModelAdmin):
    list_display = ['song', 'was_seeked', 'created_on']
