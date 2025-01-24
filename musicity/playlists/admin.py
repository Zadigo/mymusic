from django.contrib import admin
from playlists.models import OfficialPlaylist, UserPlaylist


@admin.register(UserPlaylist)
class UserPlaylistAdmin(admin.ModelAdmin):
    list_display = ['name']
    filter_horizontal = ['followers']


@admin.register(OfficialPlaylist)
class OfficialPlaylistAdmin(admin.ModelAdmin):
    list_display = ['name']
    filter_horizontal = ['followers']
