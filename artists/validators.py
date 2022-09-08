from django.core.validators import FileExtensionValidator
from django.utils.timezone import now
from django.core.exceptions import ValidationError

def song_file_validator(instance):
    instance = FileExtensionValidator(
        allowed_extensions=['mp3', 'aac'], 
        message='File extension is not valid'
    )
    instance(instance)
    # if not instance.name.endswith('mp3'):
    #     raise ValidationError('This is not a valid file extension')


def validate_date_of_birth(value):
    current_date = now()
    age = current_date.year() - value.year()
    if age < 15:
        raise ValidationError('Artist does have the legal age')
