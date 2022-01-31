from django.core.exceptions import ValidationError


def song_file_validator(instance, name):
    if not name.endswith('mp3'):
        raise ValidationError('This is not a valid file extension')
