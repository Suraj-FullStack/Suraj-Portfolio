"""
DRF Serializers – Convert ORM model instances to/from JSON.
Each serializer maps closely to its model with strict validation.
"""
import re
from rest_framework import serializers
from .models import (
    About, SkillCategory, Skill, Project,
    Education, Experience, Certification, ContactMessage,
)


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model  = About
        fields = [
            "id", "name", "title", "bio", "location",
            "email", "phone", "github_url", "linkedin_url",
            "profile_image", "resume_file", "updated_at",
        ]


class SkillSerializer(serializers.ModelSerializer):
    level_display = serializers.CharField(source="get_level_display", read_only=True)

    class Meta:
        model  = Skill
        fields = ["id", "name", "level", "level_display", "percentage", "icon", "order"]


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model  = SkillCategory
        fields = ["id", "name", "icon", "order", "skills"]


class ProjectSerializer(serializers.ModelSerializer):
    tech_list        = serializers.SerializerMethodField()
    category_display = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model  = Project
        fields = [
            "id", "title", "slug", "category", "category_display",
            "short_description", "description", "tech_stack", "tech_list",
            "image", "github_url", "live_url",
            "is_featured", "is_published", "created_at", "order",
        ]

    def get_tech_list(self, obj):
        return obj.get_tech_list()


class EducationSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model  = Education
        fields = [
            "id", "degree", "institution", "location",
            "start_year", "end_year", "gpa", "description", "duration", "order",
        ]

    def get_duration(self, obj):
        end = str(obj.end_year) if obj.end_year else "Present"
        return f"{obj.start_year} – {end}"


class ExperienceSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source="get_type_display", read_only=True)
    duration     = serializers.SerializerMethodField()

    class Meta:
        model  = Experience
        fields = [
            "id", "type", "type_display", "title", "organization",
            "location", "start_date", "end_date", "duration",
            "description", "tech_used", "order",
        ]

    def get_duration(self, obj):
        end = obj.end_date.strftime("%b %Y") if obj.end_date else "Present"
        return f"{obj.start_date.strftime('%b %Y')} – {end}"


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Certification
        fields = [
            "id", "name", "issuer", "date_issued",
            "credential_url", "icon", "badge_color", "order",
        ]


# ─── Contact Form Serializer (with strict validation) ────────────────────────
class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Validates incoming contact form POST data before saving.
    Enforces length constraints and character rules on each field.
    """
    # Honeypot – must be blank; if filled, request is likely spam
    website = serializers.CharField(
        required=False, allow_blank=True, write_only=True, default=""
    )

    class Meta:
        model  = ContactMessage
        fields = ["name", "email", "subject", "message", "website"]

    # ── Field-level validators ────────────────────────────────────────────────
    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters.")
        if not re.match(r"^[a-zA-Z\s.\-]+$", value):
            raise serializers.ValidationError("Name contains invalid characters.")
        return value

    def validate_email(self, value):
        return value.strip().lower()

    def validate_subject(self, value):
        value = value.strip()
        if len(value) < 5:
            raise serializers.ValidationError("Subject must be at least 5 characters.")
        return value

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 20:
            raise serializers.ValidationError("Message must be at least 20 characters.")
        if len(value) > 5000:
            raise serializers.ValidationError("Message must not exceed 5000 characters.")
        return value

    # ── Cross-field / honeypot validation ────────────────────────────────────
    def validate(self, attrs):
        if attrs.get("website"):
            raise serializers.ValidationError("Spam detected.")
        attrs.pop("website", None)   # Remove honeypot field before save
        return attrs
