from django.core.exceptions import ValidationError


def song_file_validator(instance):
    if not instance.name.endswith('mp3'):
        raise ValidationError('This is not a valid file extension')
