from django.contrib import admin
from playlists.models import UserPlaylist


@admin.register(UserPlaylist)
class UserPlaylistAdmin(admin.ModelAdmin):
    list_display = ['name']
