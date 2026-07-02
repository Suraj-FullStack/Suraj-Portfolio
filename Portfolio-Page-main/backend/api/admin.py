"""Django admin registrations for all API models."""
from django.contrib import admin
from .models import (
    About, SkillCategory, Skill, Project,
    Education, Experience, Certification, ContactMessage,
)


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "email", "is_active", "updated_at")


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    inlines = [SkillInline]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ("title", "category", "is_featured", "is_published", "order")
    list_editable = ("is_featured", "is_published", "order")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "start_year", "end_year", "gpa")


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "organization", "type", "start_date", "end_date")


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("name", "issuer", "date_issued")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display  = ("name", "email", "subject", "status", "created_at")
    list_editable = ("status",)
    readonly_fields = ("name", "email", "subject", "message", "ip_address", "created_at")

    def has_add_permission(self, request):
        return False
