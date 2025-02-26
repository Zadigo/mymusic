from django.core.validators import FileExtensionValidator
from django.utils.timezone import now
from django.core.exceptions import ValidationError

def song_file_validator(instance):
    validator = FileExtensionValidator(
        allowed_extensions=['mp3', 'aac'], 
        message='File extension is not valid'
    )
    validator(instance)


def validate_date_of_birth(value):
    current_date = now()
    age = current_date.year - value.year
    if age < 15:
        raise ValidationError('Artist does have the legal age')
