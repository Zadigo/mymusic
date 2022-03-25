from django.db.models import Choices

class UserCustomsort(Choices):
    SONG_NAME = 'Song name'
    ALBUM_NAME = 'Album name'
    ARTIST_NAME = 'Artist name'
    ADDED = 'Added'
    DURATION = 'Duration'
    GENRE = 'Genre'
