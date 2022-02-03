import binascii
import datetime
import struct

import numpy as np
import scipy
import scipy.cluster
import scipy.misc
from PIL import Image


def dominant_image_color(instance):
    """Get the most common color in an image
    and return it in hexadecimal. Note that
    this only returns the numbers/letters"""
    NUM_CLUSTERS = 5
    
    # Just return black if there's no
    # path associated with the instance
    image = getattr(instance, '_file', None)
    if image is None:
        return '000000'

    # print('reading image')
    # im = Image.open('D:/coding/websites/mymusic/media/cover/bouyon_patrimoine/c7dfae3baf2d5838261c.jpg')
    im = Image.open(instance.path)
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
