from django.conf.urls import patterns, url

from .views import QuizListView, CategoriesListView,\
    ViewQuizListByCategory, QuizUserProgressView, QuizMarkingList,\
    QuizMarkingDetail, QuizDetailView, QuizTake,\
    QuizDetailView2, QuizDetailView3, ResponseView


urlpatterns = patterns('',

                       url(regex=r'^$',
                           view=QuizListView.as_view(),
                           name='quiz_index'),

                       url(regex=r'^category/$',
                           view=CategoriesListView.as_view(),
                           name='quiz_category_list_all'),

                       url(regex=r'^category/(?P<category_name>[A-Za-z0-9-_]+)/$',
                           view=ViewQuizListByCategory.as_view(),
                           name='quiz_category_list_matching'),

                       url(regex=r'^progress/$',
                           view=QuizUserProgressView.as_view(),
                           name='quiz_progress'),

                       url(regex=r'^marking/$',
                           view=QuizMarkingList.as_view(),
                           name='quiz_marking'),

                       url(regex=r'^marking/(?P<pk>[\d.]+)/$',
                           view=QuizMarkingDetail.as_view(),
                           name='quiz_marking_detail'),

                       url(regex=r'^post/$',
                           view=ResponseView,
                           name='response_page'),

                       #  passes variable 'quiz_name' to quiz_take view

                       url(regex=r'^(?P<slug>[\w-]+)/$',
                           view=QuizDetailView.as_view(),
                           name='quiz_start_page'),

                       url(regex=r'^(?P<quiz_name>[\w-]+)/take/$',
                           view=QuizTake.as_view(),
                           name='quiz_question'),

                       url(regex=r'^(?P<slug>[\w-]+)/instructions.html?orgId=media@@mockId=(?P<quiz_name>[\w-]+)$',
                           view=QuizDetailView2,
                           name='instructions_page'),

                       url(regex=r'^(?P<slug>[\w-]+)/quiz.html?orgId=media@@mockId=(?P<quiz_name>[\w-]+)$',
                           view=QuizDetailView3,
                           name='test_start_page'),
)
