from django.test import RequestFactory, TestCase
from artists import views

class TestViews(TestCase):
    fixtures = ['albums']
    
    def setUp(self):
        self.factory = RequestFactory()
        
    def test_albums_view(self):
        request = self.factory.get('/api/v1/artists/albums')
        response = views.albums_view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['name'], 'Bad like me')
        
    def test_search_view(self):
        search_items = [
            {
                'name': 'Bad like me'
            },
            {
                'name': 'Bad like me',
                'area': 'Jamaica'
            },
            {
                'genre': 'Dancehall'
            }
        ]
        for item in search_items:
            request = self.factory.post('/api/v1/artists/albums', data=item)
            with self.subTest(item=item):
                response = views.search_albums_view(request)
                self.assertEqual(response.status_code, 200)
                self.assertEqual(response.data[0]['name'], 'Bad like me')

    def test_albums_view(self):
        request = self.factory.get('/api/v1/artists/genress')
        response = views.genres_view(request)
        self.assertIn({'id': 0, 'name': 'Bouyon', 'viewname': 'bouyon'}, response.data)
