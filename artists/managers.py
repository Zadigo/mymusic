from django.db.models import Manager
from django.db.models.expressions import Q
from django.core.cache import cache

class AlbumManager(Manager):
    def search(self, name=None, genre=None, area=[]):
        """Search the website by name, genre or area"""
        queryset = self.prefetch_related('song_set')
        
        if name is not None:
            logic = (
                Q(name__icontains=name) |
                Q(artist__name__icontains=name) |
                Q(song__name__icontains=name)
            )

            queryset = self.filter(logic)

        if genre is not None:
            genre_logic = (
                Q(genre__eq=genre) |
                Q(genre__artist__genre=genre) |
                Q(song__genre=genre)
            )
            queryset = queryset.filter(genre_logic)

        if area:
            if not isinstance(area, (list, tuple)):
                area = [area]
            queryset = queryset.filter(artist__area__in=area)

        return queryset
    
    def genres(self):
        """Return all available genres on
        the website"""
        queryset = cache.get('genres')
        if not queryset:
            queryset = self.values_list('genre', flat=True)
            cache.set('genres', queryset, 3600)
        return list(set(queryset))


class SongManager(Manager):
    def search(self, name, genre=None, area=[]):
        logic = (
            Q(name__icontains=name) |
            Q(album__name__icontains=name) |
            Q(album__artist__name__icontains=name)
        )
        
        queryset = self.filter(logic)
        
        if genre is not None:
            genre_logic = (
                Q(genre__eq=genre) |
                Q(genre__album__genre=genre) |
                Q(genre__album__song__genre=genre)
            )
            queryset = queryset.filter(genre_logic)
        
        if area:
            if not isinstance(area, (list, tuple)):
                raise TypeError('Area should be a list or tuple')
            queryset = queryset.filter(album__artist__area__in=area)
        
        return queryset

    def global_search(self, name, genre=None, area=[]):
        """Search everything on the website
        and return a dict with songs, artists,
        albums and playlists"""
        
