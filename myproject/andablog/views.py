from django.db.models import Q
from django.views.generic import ListView, DetailView

from . import models

from quiz.models import Category
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response

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

def CategoryEntryDetail(request):
    category_name = request.GET.get('category')
    entry_list = Category.objects.get(category=category_name).entry_set.all()
    paginator = Paginator(entry_list, 1) # Show 1 entry per page

    page = request.GET.get('page')
    try:
        entry = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.    
        entry = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        entry = paginator.page(paginator.num_pages)

    return render_to_response('andablog/entry_detail.html', {"entry": entry})
