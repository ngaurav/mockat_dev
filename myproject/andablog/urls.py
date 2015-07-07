from django.conf.urls import url

from . import views

urlpatterns = [
    url('^$', views.EntriesList.as_view(), name='entrylist'),
    url(r'^cat/(?P<categ>[A-Za-z0-9-_]+)$', views.CategoryEntryDetail, name='catentrydetail'),
    url(r'^(?P<slug>[A-Za-z0-9-_]+)/$', views.EntryDetail.as_view(), name='entrydetail'),
]
