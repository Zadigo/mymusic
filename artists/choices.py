from django.db.models import Choices


class Genres(Choices):
    BOUYON = 'Bouyon'
    KOMPA = 'Kompa'
    DANCEHALL = 'Dancehall'
    ZOUK = 'Zouk'


class GeographicAreas(Choices):
    GUADELOUPE = 'Guadeloupe'
    JAMAICA = 'Jamaica'


class Nationalities(Choices):
    FRENCH = 'French'
    JAMAICAN = 'Jamaican'
