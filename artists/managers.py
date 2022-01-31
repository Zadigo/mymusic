from django.db.models import Manager


class SongManager(Manager):
    def filter_by_name(self, name):
        return
