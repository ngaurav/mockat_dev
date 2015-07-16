"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from quiz.views import solView, reportView, statsView
from andablog.views import startView, aboutView

urlpatterns = [
    url(r'^quiz/', include('quiz.urls')),
    url(r'^accounts/', include('allaccess.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^markitup/', include('markitup.urls')),
    url(r'^content/', include('andablog.urls', namespace='andablog')),
    url(r'^forum/', include('spirit.urls')),
    url(r'^solution/(?P<slug>[A-Za-z0-9-_]+)', solView.as_view(), name="solution"),
    url(r'^report/(?P<slug>[A-Za-z0-9-_]+)', reportView.as_view(), name="report"),
    url(r'^progress/$', statsView.as_view(), name="stats"),
    url(r'^contact/$', contactView.as_view(), name="about"),
    url(r'^$', startView, name="home"),
]
