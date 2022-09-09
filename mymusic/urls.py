import imp
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from mymusic import views

urlpatterns = [
    path('api/v1/artists/', include('artists.urls')),
    path('api/v1/playlists/', include('playlists.urls')),
    path('api-auth/', include('rest_framework.urls')),    
    path('admin/', admin.site.urls),
    path('', views.index),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
