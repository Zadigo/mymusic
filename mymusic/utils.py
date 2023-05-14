from django.core.files.base import File, ContentFile
import math
from typing import Any, Generator
from rest_framework.serializers import BaseSerializer, Serializer
from rest_framework.response import Response
from rest_framework import status
import binascii
import pathlib
from io import BytesIO

import numpy as np
import requests
from django.conf import settings
import scipy
from PIL import Image


def get_image(url):
    response = requests.get(url)
    return Image.open(BytesIO(response.content))


def dominant_image_color(instance, is_url=False):
    """Get the most common color in an image
    and return it in hexadecimal. Note that
    this only returns the numbers/letters"""
    NUM_CLUSTERS = 5

    # Just return black if there's no
    # path associated with the instance
    image_path = getattr(instance, 'path', None)
    if image_path is None:
        return '000000'

    # print('reading image')
    # im = Image.open('D:/coding/websites/mymusic/media/cover/bouyon_patrimoine/c7dfae3baf2d5838261c.jpg')
    im = Image.open(image_path)
    im = im.resize((150, 150))      # optional, to reduce time
    ar = np.asarray(im)
    shape = ar.shape
    # ar = ar.reshape(scipy.product(shape[:2]), shape[2]).astype(float)
    ar = ar.reshape(np.product(shape[:2]), shape[2]).astype(float)

    # print('finding clusters')
    codes, dist = scipy.cluster.vq.kmeans(ar, NUM_CLUSTERS)
    # print('cluster centres:\n', codes)

    vecs, dist = scipy.cluster.vq.vq(ar, codes)         # assign codes
    # counts, bins = scipy.histogram(vecs, len(codes))    # count occurrences
    counts, bins = np.histogram(vecs, len(codes))    # count occurrences

    # index_max = scipy.argmax(counts)                    # find most frequent
    index_max = np.argmax(counts)  # find most frequent
    peak = codes[index_max]
    colour = binascii.hexlify(bytearray(int(c) for c in peak)).decode('ascii')
    # print('most frequent is %s (#%s)' % (peak, colour))
    return colour


def create_response(data: Any = None, serializer: Serializer = None):
    attrs = {'data': None, 'status': status.HTTP_200_OK}
    if serializer is not None:
        attrs.update(data=serializer.data)
    elif data is not None:
        if isinstance(data, (Generator)):
            data = list(data)

        if not isinstance(data, (list, dict)):
            raise ValueError('Data should be a list of a dict')

        attrs.update(data=data)
    return Response(**attrs)


def map_list(dataset):
    for i, item in enumerate(dataset):
        yield {'id': i, 'name': item, 'viewname': item.lower()}


def variance(values):
    average = sum(values) / len(values)
    return ((value - average) ^ 2 for value in values)


def standard_deviation(values):
    return math.sqrt(variance(values))


def get_image_template(name='cover1.jpg'):
    """Returns an image template from the
    media folder"""
    media_path = settings.MEDIA_ROOT
    path = media_path / f'templates/{name}'

    if not path.exists():
        raise

    if not path.is_file():
        raise

    f = open(path, mode='rb')
    instance = ContentFile(f.read(), name=name)
    f.close()
    return instance
