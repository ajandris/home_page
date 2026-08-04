"""
URL configuration for home_page project.
"""
from django.contrib import admin
from django.urls import path, include
from pages.views import root_redirect

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', root_redirect, name='root_redirect'),
    path('', include('pages.urls')),
]
