from django.db.models import Q
from django.views.generic import ListView, DetailView

from . import models

from quiz.models import Category

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

def EntryRedirect(request):
    category_id=request.GET.get('category', 1)
    page_number=request.GET.get('page', 1)
    try:
        ent = Category.entry_set.all()[page_number]
        return redirect(EntryDetail.as_view(), slug=ent.slug)
    except:
        return None
