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
        return super(EntryDetail, self).get_queryset().filter(
            Q(is_published=True) | Q(author__isnull=False, author=self.request.user.id))

def CategoryEntryDetail(request,categ):
    if request.method=='POST':
        try:
            page1 = request.POST['page'].strip()
            page = int(page1)
        except KeyError:
            page = 1
        cat = Category.objects.get(category=categ)
        entry = cat.entry_set.all()[page-1]
        one_or_two = 1
        if page=cat.entry_set.count():
            one_or_two = 2
        #logger.debug(entry)
        history, c = HistoryOfUser.objects.get_or_create(user=request.user)
        history.category_data[cat.id-1]=max(history.category_data[cat.id-1],one_or_two)
        history.save()
        return render(request, 'andablog/entry_detail.html', {"entry": entry})
    else:
        cat = Category.objects.get(category=categ)
        entry = cat.entry_set.earliest
        history, c = HistoryOfUser.objects.get_or_create(user=request.user)
        history.category_data[cat.id-1]=max(history.category_data[cat.id-1],1)
        history.save()
        return render(request, 'andablog/entry_detail.html', {"entry": entry})
