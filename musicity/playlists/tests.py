from django.test import TestCase
from django.test.client import Client, RequestFactory
from playlists import views


class TestViews(TestCase):
    fixtures = ['playlists.json']
    
    def test_user_playslists_view(self):
        factory = RequestFactory()
        request = factory.get('api/v1/playlists')
        response = views.user_playslists_view(request)
        print(response)
        self.assertEqual(response.status_code, 200)
