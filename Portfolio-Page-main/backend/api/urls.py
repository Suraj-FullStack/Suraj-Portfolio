"""
API URL routing – all endpoints prefixed with /api/v1/ in config/urls.py
"""
from django.urls import path
from . import views

urlpatterns = [
    # Personal info
    path("about/",          views.AboutView.as_view(),           name="about"),
    # Skills
    path("skills/",         views.SkillListView.as_view(),       name="skills"),
    # Projects
    path("projects/",       views.ProjectListView.as_view(),     name="projects"),
    path("projects/<slug:slug>/", views.ProjectDetailView.as_view(), name="project-detail"),
    # Timeline
    path("education/",      views.EducationListView.as_view(),   name="education"),
    path("experience/",     views.ExperienceListView.as_view(),  name="experience"),
    # Certifications
    path("certifications/", views.CertificationListView.as_view(), name="certifications"),
    # Contact form
    path("contact/",        views.ContactCreateView.as_view(),   name="contact"),
    # All-in-one summary endpoint
    path("summary/",        views.PortfolioSummaryView.as_view(), name="summary"),
]
