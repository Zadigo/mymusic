import pandas
from django.db.models import Manager, Count
from django.db.models.expressions import Q
from django.db.models.functions import ExtractMonth
from django.utils.timezone import now

from artists.utils import number_of_days_in_month


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
        """Return all available genres on the website"""
        queryset = self.values_list('genre', flat=True)
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

    def song_listeners_current_month(self, song_id):
        start_day, end_day = number_of_days_in_month()
        song = self.get(id=song_id)

        d = now()
        lower_date = d.replace(day=start_day)
        upper_date = d.replace(day=end_day)

        listeners = song.listener_set.filter(
            created_on__gte=lower_date,
            created_on__lte=upper_date
        )
        return listeners.aggregate(count=Count('id'))

    def song_listeners_per_year(self, song_id):
        pass

    def song_listeners_at_launch_date(self, song_id):
        """Number of listeners on the launch date of a song"""
        pass

    def song_listeners_at_launch_week(self, song_id):
        """Number of listeners on the launch week of a song"""
        pass


class ListenerManager(Manager):
    def top_hundred(self):
        """Top 100 of most listened songs"""
        pass

    def song_listeners_per_month(self, song):
        listeners = song.listener_set.annotate(month=ExtractMonth('created_on')).values('song__name', 'month')
        df = pandas.DataFrame(listeners)
        total_count = df.groupby('month')['song__name'].count()
        return total_count.to_json()
