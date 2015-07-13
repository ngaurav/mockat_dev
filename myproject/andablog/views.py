from django.db.models import Q
from django.views.generic import ListView, DetailView

from . import models

from quiz.models import Category, HistoryOfUser
from django.shortcuts import render
from django.http import HttpResponse
import logging
logger = logging.getLogger(__name__)

def startView(request):
    top_page = models.StartPage.objects.order_by('rank').first()
    return render(request, 'andablog/start_page.html', {'page':top_page});

class EntriesList(ListView):

    model = models.Entry
    template_name = 'andablog/entry_list.html'
    context_object_name = 'entries'
    paginate_by = 10
    paginate_orphans = 5

    def get_queryset(self):
        queryset = super(EntriesList, self).get_queryset().filter(
            Q(is_published=True) | Q(author__isnull=False, author=self.request.user.id))
        return queryset.order_by('is_published', '-published_timestamp')  # Put 'drafts' first.


class EntryDetail(DetailView):

    model = models.Entry
    template_name = 'andablog/entry_detail.html'
    context_object_name = 'entry'
    slug_field = 'slug'

    def get_queryset(self):
        cat = self.get_object().category
        history, c = HistoryOfUser.objects.get_or_create(user=self.request.user)
        history.category_list[cat.id]=max(history.category_list[cat.id],1)
        return super(EntryDetail, self).get_queryset().filter(
            Q(is_published=True) | Q(author__isnull=False, author=self.request.user.id))

def CategoryEntryDetail(request,categ):
    if request.method=='POST':
        page = int(request.POST['page'].strip())
        cat = Category.objects.get(category=categ)
        entry = cat.entry_set.all()[page-1]
        #logger.debug(entry)
        history, c = HistoryOfUser.objects.get_or_create(user=self.request.user)
        history.category_list[cat.id]=max(history.category_list[cat.id],1)
        return render(request, 'andablog/entry_detail.html', {"entry": entry})
    else:
        return HttpResponse()
