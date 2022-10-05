from django.contrib import admin
from todo.models import Project, TODO




admin.site.register(Project, admin.ModelAdmin)
admin.site.register(TODO, admin.ModelAdmin)
