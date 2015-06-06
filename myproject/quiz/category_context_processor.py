from quiz.models import Category, SubCategory

def category_list(request):
	return {'category_list' : Category.objects.all().order_by('rank')}

def domain_list(request):
	return {'domain_list' : Domain.objects.all().order_by('rank')}
