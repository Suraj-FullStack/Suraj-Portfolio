"""
API Models – Portfolio database schema using Django ORM.
All models follow PEP 8 conventions with clear docstrings.
"""
from django.db import models
from django.utils import timezone


class About(models.Model):
    """Personal information shown in the Hero / About sections."""
    name            = models.CharField(max_length=100)
    title           = models.CharField(max_length=200)
    bio             = models.TextField()
    location        = models.CharField(max_length=100, blank=True)
    email           = models.EmailField()
    phone           = models.CharField(max_length=20, blank=True)
    github_url      = models.URLField(blank=True)
    linkedin_url    = models.URLField(blank=True)
    profile_image   = models.ImageField(upload_to="profile/", blank=True, null=True)
    resume_file     = models.FileField(upload_to="resume/",  blank=True, null=True)
    is_active       = models.BooleanField(default=True)
    updated_at      = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "About"

    def __str__(self):
        return self.name


class SkillCategory(models.Model):
    """Groups skills into logical categories."""
    name  = models.CharField(max_length=100)
    icon  = models.CharField(max_length=100, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class Skill(models.Model):
    """Individual skill with proficiency level."""
    LEVEL_CHOICES = [(i, l) for i, l in enumerate(
        ["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"], 1
    )]
    category   = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name="skills")
    name       = models.CharField(max_length=100)
    level      = models.IntegerField(choices=LEVEL_CHOICES, default=3)
    percentage = models.PositiveIntegerField(default=70)
    icon       = models.CharField(max_length=100, blank=True)
    order      = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.name} ({self.get_level_display()})"


class Project(models.Model):
    """Portfolio project entry."""
    CATEGORY_CHOICES = [
        ("web",      "Web Development"),
        ("backend",  "Backend / API"),
        ("database", "Database"),
        ("ml",       "Machine Learning"),
        ("other",    "Other"),
    ]
    title             = models.CharField(max_length=200)
    slug              = models.SlugField(unique=True)
    category          = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="web")
    short_description = models.CharField(max_length=300)
    description       = models.TextField()
    tech_stack        = models.CharField(max_length=300)
    image             = models.ImageField(upload_to="projects/", blank=True, null=True)
    github_url        = models.URLField(blank=True)
    live_url          = models.URLField(blank=True)
    is_featured       = models.BooleanField(default=False)
    is_published      = models.BooleanField(default=True)
    created_at        = models.DateTimeField(default=timezone.now)
    order             = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-is_featured", "order", "-created_at"]

    def __str__(self):
        return self.title

    def get_tech_list(self):
        return [t.strip() for t in self.tech_stack.split(",") if t.strip()]


class Education(models.Model):
    """Academic qualification entry."""
    degree      = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    location    = models.CharField(max_length=100, blank=True)
    start_year  = models.PositiveIntegerField()
    end_year    = models.PositiveIntegerField(null=True, blank=True)
    gpa         = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    order       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-start_year"]

    def __str__(self):
        return f"{self.degree} — {self.institution}"


class Experience(models.Model):
    """Work experience or professional training."""
    TYPE_CHOICES = [
        ("work",       "Work"),
        ("training",   "Training"),
        ("internship", "Internship"),
    ]
    type         = models.CharField(max_length=20, choices=TYPE_CHOICES, default="training")
    title        = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    location     = models.CharField(max_length=100, blank=True)
    start_date   = models.DateField()
    end_date     = models.DateField(null=True, blank=True)
    description  = models.TextField()
    tech_used    = models.CharField(max_length=300, blank=True)
    order        = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return f"{self.title} @ {self.organization}"


class Certification(models.Model):
    """Professional certificate or workshop completion."""
    name           = models.CharField(max_length=200)
    issuer         = models.CharField(max_length=200)
    date_issued    = models.DateField()
    credential_url = models.URLField(blank=True)
    icon           = models.CharField(max_length=100, default="fas fa-certificate")
    badge_color    = models.CharField(max_length=20, default="#10b981")
    order          = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-date_issued"]

    def __str__(self):
        return f"{self.name} — {self.issuer}"


class ContactMessage(models.Model):
    """Message submitted via the contact form."""
    STATUS = [("new", "New"), ("read", "Read"), ("replied", "Replied")]
    name       = models.CharField(max_length=100)
    email      = models.EmailField()
    subject    = models.CharField(max_length=200)
    message    = models.TextField()
    status     = models.CharField(max_length=20, choices=STATUS, default="new")
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"[{self.status}] {self.subject} — {self.name}"
