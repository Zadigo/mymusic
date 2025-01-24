import random

from django.contrib import admin
from django.utils.crypto import get_random_string
from mutagen.mp3 import MP3

from artists.models import Album, Artist, Listener, Song


@admin.register(Artist)
class ArtistsAdmin(admin.ModelAdmin):
    list_display = ['name', 'genre', 'created_on']
    date_hiearchy = 'created_on'
    search_fields = ['name', 'genre']
    list_per_page = 100
    actions = ['duplicate']

    def duplicate(self, request, queryset):
        new_items = []
        salt = get_random_string(length=5)
        for item in queryset:
            params = {
                'name': f'{item.name}_{salt}',
                'fullname': item.fullname,
                'presentation': item.presentation,
                'area': item.area,
                'nationality': item.nationality,
                'date_of_birth': item.date_of_birth,
                'genre': item.genre,
                'cover_image': item.cover_image
            }
            new_items.append(Artist(**params))
        Artist.objects.bulk_create(new_items)


@admin.register(Album)
class AlbumsAdmin(admin.ModelAdmin):
    list_display = ['name', 'artist', 'release_year',
                    'producer', 'is_single', 'is_active']
    date_hiearchy = 'created_on'
    search_fields = ['name', 'artist__name', 'producer']
    actions = ['duplicate', 'activate', 'deactivate']

    def activate(self, request, queryset):
        queryset.update(is_active=True)

    def deactivate(self, request, queryset):
        queryset.update(is_active=False)

    def duplicate(self, request, queryset):
        new_items = []
        for item in queryset:
            params = {
                'artist': item.artist,
                'name': get_random_string(length=5),
                'genre': item.genre,
                'cover_image': item.cover_image,
                'producer': item.producer,
                'is_single': item.is_single,
                'is_active': False
            }
            new_items.append(Album(**params))
        Album.objects.bulk_create(new_items)


@admin.register(Song)
class SongsAdmin(admin.ModelAdmin):
    list_display = ['name', 'album', 'genre', 'bitrate', 'duration']
    date_hiearchy = 'added_on'
    search_fields = ['name', 'album__name', 'genre', 'album__producer']
    actions = ['get_file_metadata', 'create_random']

    def create_random(self, request, queryset):
        """Generate random songs for testing"""
        if request.user.is_superuser:
            albums = Album.objects.all()
            # new_songs = []
            for item in queryset:
                params = {
                    'name': get_random_string(length=5),
                    'song_file': item.song_file,
                    'genre': item.genre,
                    # 'featuring_artists': item.featuring_artists,
                    'is_explicit': item.is_explicit
                }
                new_item = Song.objects.create(
                    album=random.choice(albums), 
                    **params
                )

    def get_file_metadata(self, request, queryset):
        """Manually update the metadata of the
        current MP3 file"""
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
