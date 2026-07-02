"""
API Views – Django REST Framework class-based views.
All endpoints return JSON. Contact form uses CreateAPIView with validation.
"""
import logging
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    About, SkillCategory, Project,
    Education, Experience, Certification, ContactMessage,
)
from .serializers import (
    AboutSerializer, SkillCategorySerializer, ProjectSerializer,
    EducationSerializer, ExperienceSerializer, CertificationSerializer,
    ContactMessageSerializer,
)

logger = logging.getLogger(__name__)


# ─── About ───────────────────────────────────────────────────────────────────
class AboutView(APIView):
    """
    GET /api/v1/about/
    Returns the active personal profile record.
    """
    def get(self, request):
        about = About.objects.filter(is_active=True).first()
        if not about:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = AboutSerializer(about, context={"request": request})
        return Response(serializer.data)


# ─── Skills ──────────────────────────────────────────────────────────────────
class SkillListView(generics.ListAPIView):
    """
    GET /api/v1/skills/
    Returns all skill categories with nested skills.
    """
    queryset         = SkillCategory.objects.prefetch_related("skills").all()
    serializer_class = SkillCategorySerializer


# ─── Projects ────────────────────────────────────────────────────────────────
class ProjectListView(generics.ListAPIView):
    """
    GET /api/v1/projects/
    Returns all published projects. Supports ?category=web filtering.
    """
    serializer_class = ProjectSerializer

    def get_queryset(self):
        qs       = Project.objects.filter(is_published=True)
        category = self.request.query_params.get("category")
        if category and category != "all":
            qs = qs.filter(category=category)
        return qs


class ProjectDetailView(generics.RetrieveAPIView):
    """
    GET /api/v1/projects/<slug>/
    Returns a single published project by slug.
    """
    queryset         = Project.objects.filter(is_published=True)
    serializer_class = ProjectSerializer
    lookup_field     = "slug"


# ─── Education ───────────────────────────────────────────────────────────────
class EducationListView(generics.ListAPIView):
    """GET /api/v1/education/"""
    queryset         = Education.objects.all()
    serializer_class = EducationSerializer


# ─── Experience ──────────────────────────────────────────────────────────────
class ExperienceListView(generics.ListAPIView):
    """GET /api/v1/experience/"""
    queryset         = Experience.objects.all()
    serializer_class = ExperienceSerializer


# ─── Certifications ──────────────────────────────────────────────────────────
class CertificationListView(generics.ListAPIView):
    """GET /api/v1/certifications/"""
    queryset         = Certification.objects.all()
    serializer_class = CertificationSerializer


# ─── Contact ─────────────────────────────────────────────────────────────────
class ContactCreateView(generics.CreateAPIView):
    """
    POST /api/v1/contact/
    Validates and saves an incoming contact form submission.
    Returns 201 on success with a confirmation message.
    """
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"success": False, "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Capture client IP before saving
        msg            = serializer.save()
        msg.ip_address = self._get_ip(request)
        msg.save(update_fields=["ip_address"])

        logger.info("Contact message from %s <%s>", msg.name, msg.email)

        return Response(
            {
                "success": True,
                "message": "Thank you! I'll reply within 24 hours.",
            },
            status=status.HTTP_201_CREATED,
        )

    @staticmethod
    def _get_ip(request):
        forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.META.get("REMOTE_ADDR")


# ─── Portfolio Summary (single round-trip for home page) ─────────────────────
class PortfolioSummaryView(APIView):
    """
    GET /api/v1/summary/
    Returns all sections in one response – used by the frontend home page
    to minimise network round-trips.
    """
    def get(self, request):
        about          = About.objects.filter(is_active=True).first()
        skill_cats     = SkillCategory.objects.prefetch_related("skills").all()
        featured_projs = Project.objects.filter(is_featured=True, is_published=True)[:3]
        educations     = Education.objects.all()
        experiences    = Experience.objects.all()
        certifications = Certification.objects.all()

        ctx = {"request": request}

        return Response({
            "about":          AboutSerializer(about, context=ctx).data if about else None,
            "skill_categories": SkillCategorySerializer(skill_cats, many=True, context=ctx).data,
            "featured_projects": ProjectSerializer(featured_projs, many=True, context=ctx).data,
            "educations":     EducationSerializer(educations, many=True, context=ctx).data,
            "experiences":    ExperienceSerializer(experiences, many=True, context=ctx).data,
            "certifications": CertificationSerializer(certifications, many=True, context=ctx).data,
        })
