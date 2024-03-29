import imp

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path

from mymusic import views

urlpatterns = [
    path('api/v1/artists/', include('artists.api.urls')),
    path('api/v1/playlists/', include('playlists.api_urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('app/', views.index, name='music_app'),
    re_path(r'^$', views.HomeView.as_view(), name='home')
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
