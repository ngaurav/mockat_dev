from django import forms
from django.contrib import admin
from django.contrib.admin.widgets import FilteredSelectMultiple

from .models import Quiz, Category, Domain, Progress, Question, UserTrackrecord, HistoryOfUser
from multichoice.models import MCQuestion, Answer, Paragraph
from true_false.models import TF_Question
from essay.models import Essay_Question


class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 4

class QuizAdminForm(forms.ModelForm):
    """
    below is from
    http://stackoverflow.com/questions/11657682/
    django-admin-interface-using-horizontal-filter-with-
    inline-manytomany-field
    """

    class Meta:
        model = Quiz
        exclude = []

    questions = forms.ModelMultipleChoiceField(
        queryset=Question.objects.all().select_subclasses(),
        required=False,
        widget=FilteredSelectMultiple(
            verbose_name='Questions',
            is_stacked=False))

    def __init__(self, *args, **kwargs):
        super(QuizAdminForm, self).__init__(*args, **kwargs)
        if self.instance.pk:
            self.fields['questions'].initial =\
                self.instance.question_set.all().select_subclasses()

    def save(self, commit=True):
        quiz = super(QuizAdminForm, self).save(commit=False)
        quiz.save()
        quiz.question_set = self.cleaned_data['questions']
        self.save_m2m()
        return quiz


class QuizAdmin(admin.ModelAdmin):
    form = QuizAdminForm

    list_display = ('title', 'category', )
    list_filter = ('category',)
    search_fields = ('description', 'category', )


class CategoryAdmin(admin.ModelAdmin):
    search_fields = ('category', )
    list_display = ('category', 'domain',)
    list_filter = ('domain',)


class DomainAdmin(admin.ModelAdmin):
    search_fields = ('domain', )

class ParagraphAdmin(admin.ModelAdmin):
    list_display = ('title', 'content',)
    search_fields = ('content',)

class MCQuestionAdmin(admin.ModelAdmin):
    list_display = ('content', 'category', )
    list_filter = ('category','para',)
    fields = ('content', 'category', 'rank',
              'figure', 'quiz', 'explanation', 'answer_order',
              'split_view', 'para', 'ques_type', 'section_two', 'group_no')

    search_fields = ('content', 'explanation', 'category')
    filter_horizontal = ('quiz',)

    inlines = [AnswerInline]


class ProgressAdmin(admin.ModelAdmin):
    """
    to do:
            create a user section
    """
    search_fields = ('user', 'score', )
    list_display = ('user', )

class RecordAdmin(admin.ModelAdmin):
    search_fields = ('user','end_date', )
    list_display = ('user', 'quiz', 'end_date')
    list_filter = ('quiz',)

class HistoryAdmin(admin.ModelAdmin):
    search_fields = ('user',)
    list_display = ('user',)
    list_filter = ('user',)

class TFQuestionAdmin(admin.ModelAdmin):
    list_display = ('content', 'category', )
    list_filter = ('category',)
    fields = ('content', 'category', 'rank',
              'figure', 'quiz', 'explanation', 'correct',)

    search_fields = ('content', 'explanation', 'category',)
    filter_horizontal = ('quiz',)


class EssayQuestionAdmin(admin.ModelAdmin):
    list_display = ('content', 'category', )
    list_filter = ('category',)
    fields = ('content', 'category', 'rank', 'quiz', 'explanation', )
    search_fields = ('content', 'explanation', 'category',)
    filter_horizontal = ('quiz',)

admin.site.register(Quiz, QuizAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Domain, DomainAdmin)
admin.site.register(MCQuestion, MCQuestionAdmin)
admin.site.register(Paragraph, ParagraphAdmin)
admin.site.register(Progress, ProgressAdmin)
admin.site.register(TF_Question, TFQuestionAdmin)
admin.site.register(Essay_Question, EssayQuestionAdmin)
admin.site.register(UserTrackrecord, RecordAdmin)
admin.site.register(HistoryOfUser, HistoryAdmin)
