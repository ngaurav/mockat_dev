from quiz.models import Category, Domain
from andablog.models import Entry

def category_list(request):
    return {'category_list' : Category.objects.all().order_by('rank')}

def domain_list(request):
    return {'domain_list' : Domain.objects.all().order_by('rank')}

def entry_list(request):
    return {'entry_list': Entry.objects.all().order_by('rank')}
