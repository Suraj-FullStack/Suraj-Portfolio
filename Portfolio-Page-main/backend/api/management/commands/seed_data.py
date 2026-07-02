"""Management command: seed_data – populates database from Suraj Kumar Shah's CV."""
import datetime
from django.core.management.base import BaseCommand
from api.models import (
    About, SkillCategory, Skill, Project,
    Education, Experience, Certification,
)


class Command(BaseCommand):
    help = "Seeds portfolio data from Suraj Kumar Shah's CV"

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING("🌱  Seeding data..."))
        self._about(); self._skills(); self._education()
        self._experience(); self._certs(); self._projects()
        self.stdout.write(self.style.SUCCESS("✅  Done!"))

    def _about(self):
        if About.objects.exists():
            self.stdout.write("  ⏭  About exists, skip."); return
        About.objects.create(
            name="Suraj Kumar Shah",
            title="Python Django Developer | CS Engineering Student",
            bio=(
                "Motivated Computer System Engineering student at ISMT, Kathmandu. "
                "Passionate about building robust backend systems with Python & Django, "
                "designing clean REST APIs, and managing relational databases with PostgreSQL."
            ),
            location="Kathmandu, Nepal",
            email="surajks.shah@gmail.com",
            phone="+977 9864133310",
            github_url="https://github.com/",
            linkedin_url="https://linkedin.com/",
        )
        self.stdout.write("  ✅  About created.")

    def _skills(self):
        if SkillCategory.objects.exists():
            self.stdout.write("  ⏭  Skills exist, skip."); return
        cats = [
            {"name": "Backend", "icon": "fas fa-server", "order": 1, "skills": [
                {"name": "Python",                "level": 4, "percentage": 85, "icon": "fab fa-python"},
                {"name": "Django",                "level": 4, "percentage": 80, "icon": "fas fa-server"},
                {"name": "Django REST Framework", "level": 3, "percentage": 72, "icon": "fas fa-code"},
                {"name": "REST API Design",       "level": 3, "percentage": 70, "icon": "fas fa-plug"},
            ]},
            {"name": "Database", "icon": "fas fa-database", "order": 2, "skills": [
                {"name": "PostgreSQL", "level": 3, "percentage": 72, "icon": "fas fa-database"},
                {"name": "SQLite",     "level": 3, "percentage": 70, "icon": "fas fa-database"},
                {"name": "Django ORM", "level": 4, "percentage": 80, "icon": "fas fa-layer-group"},
                {"name": "DBeaver",    "level": 3, "percentage": 68, "icon": "fas fa-table"},
            ]},
            {"name": "Frontend", "icon": "fas fa-paint-brush", "order": 3, "skills": [
                {"name": "HTML5",       "level": 4, "percentage": 85, "icon": "fab fa-html5"},
                {"name": "CSS3",        "level": 4, "percentage": 82, "icon": "fab fa-css3-alt"},
                {"name": "JavaScript",  "level": 3, "percentage": 65, "icon": "fab fa-js-square"},
                {"name": "Bootstrap 5", "level": 4, "percentage": 80, "icon": "fab fa-bootstrap"},
            ]},
            {"name": "Tools", "icon": "fas fa-tools", "order": 4, "skills": [
                {"name": "Git",              "level": 3, "percentage": 70, "icon": "fab fa-git-alt"},
                {"name": "GitHub",           "level": 3, "percentage": 70, "icon": "fab fa-github"},
                {"name": "VS Code",          "level": 4, "percentage": 85, "icon": "fas fa-code"},
                {"name": "Jupyter Notebook", "level": 3, "percentage": 68, "icon": "fas fa-book"},
            ]},
        ]
        for c in cats:
            skills = c.pop("skills")
            cat = SkillCategory.objects.create(**c)
            for i, s in enumerate(skills):
                Skill.objects.create(category=cat, order=i, **s)
        self.stdout.write("  ✅  Skills created.")

    def _education(self):
        if Education.objects.exists():
            self.stdout.write("  ⏭  Education exists, skip."); return
        rows = [
            {"degree": "BSc (Hons) Computer System Engineering",
             "institution": "ISMT, Kathmandu", "location": "Kathmandu, Nepal",
             "start_year": 2023, "gpa": "", "order": 1,
             "description": "Currently in 2nd Year. Core subjects: DSA, OS, DBMS, Web Tech, SE."},
            {"degree": "Higher Secondary Education (+2)",
             "institution": "Kathmandu Model Secondary School",
             "location": "Bagbazar, Kathmandu",
             "start_year": 2021, "end_year": 2023, "gpa": "3.44", "order": 2,
             "description": "Science stream – Mathematics & Computer Science."},
            {"degree": "SEE (Secondary Education Examination)",
             "institution": "Laligurans Academy",
             "location": "Bayalbas, Sarlahi",
             "start_year": 2019, "end_year": 2021, "gpa": "3.8", "order": 3,
             "description": "Distinction – strong base in Mathematics & Science."},
        ]
        for r in rows: Education.objects.create(**r)
        self.stdout.write("  ✅  Education created.")

    def _experience(self):
        if Experience.objects.exists():
            self.stdout.write("  ⏭  Experience exists, skip."); return
        rows = [
            {"type": "training", "title": "Full Stack Python Django Training",
             "organization": "Mind Risers Institute of Technology", "location": "Kathmandu",
             "start_date": datetime.date(2025, 11, 1), "end_date": datetime.date(2026, 5, 31),
             "description": "Intensive training on Python, Django, DRF, PostgreSQL, Git & Deployment.",
             "tech_used": "Python, Django, DRF, PostgreSQL, Git", "order": 1},
            {"type": "training", "title": "Cyber Security & Ethical Hacking Workshop",
             "organization": "KMC Students Committee", "location": "Kathmandu",
             "start_date": datetime.date(2022, 3, 5), "end_date": datetime.date(2022, 3, 5),
             "description": "Cyber security fundamentals, ethical hacking, and network security.",
             "tech_used": "Linux, Network Security", "order": 2},
        ]
        for r in rows: Experience.objects.create(**r)
        self.stdout.write("  ✅  Experience created.")

    def _certs(self):
        if Certification.objects.exists():
            self.stdout.write("  ⏭  Certs exist, skip."); return
        rows = [
            {"name": "Full Stack Python Django", "issuer": "Mind Risers Institute of Technology",
             "date_issued": datetime.date(2026, 5, 31), "icon": "fas fa-graduation-cap",
             "badge_color": "#10b981", "order": 1},
            {"name": "Cyber Security Workshop", "issuer": "KMC Students Committee",
             "date_issued": datetime.date(2022, 3, 5), "icon": "fas fa-shield-alt",
             "badge_color": "#ef4444", "order": 2},
            {"name": "Building Communication Training", "issuer": "Kathmandu Model Secondary School",
             "date_issued": datetime.date(2022, 6, 1), "icon": "fas fa-comments",
             "badge_color": "#6366f1", "order": 3},
            {"name": "Child Rights Toolkit", "issuer": "UNICEF",
             "date_issued": datetime.date(2024, 1, 1), "icon": "fas fa-child",
             "badge_color": "#06b6d4", "order": 4},
            {"name": "5-Day SEO Challenge", "issuer": "ORKA SOCIALS",
             "date_issued": datetime.date(2024, 6, 15), "icon": "fas fa-search",
             "badge_color": "#f59e0b", "order": 5},
        ]
        for r in rows: Certification.objects.create(**r)
        self.stdout.write("  ✅  Certifications created.")

    def _projects(self):
        if Project.objects.exists():
            self.stdout.write("  ⏭  Projects exist, skip."); return
        rows = [
            {"title": "Boundless Moments Photography",
             "slug": "boundless-moments-photography", "category": "web",
             "short_description": "Responsive multi-page photography portfolio with SEO & accessibility.",
             "description": (
                 "A fully responsive, multi-page photography portfolio website. "
                 "Built with pure HTML, CSS, and JavaScript demonstrating strong frontend fundamentals. "
                 "Features: semantic HTML5 for SEO, CSS Grid/Flexbox responsive layouts, "
                 "JS image lightbox gallery, WCAG 2.1 accessibility, and mobile-first design."
             ),
             "tech_stack": "HTML5, CSS3, JavaScript, SEO, Responsive Design, Accessibility",
             "is_featured": True, "order": 1},
            {"title": "Hotel Room Reservation System",
             "slug": "hotel-room-reservation-system", "category": "database",
             "short_description": "Desktop app for Hidden Paradise Hotel – room bookings & customer management.",
             "description": (
                 "A full-featured desktop hotel management application for 'Hidden Paradise Hotel'. "
                 "Features: room inventory management, customer registration, booking with date-conflict "
                 "detection, check-in/check-out workflow with billing, and a PostgreSQL relational schema."
             ),
             "tech_stack": "Python, Tkinter, PostgreSQL, PG8000, DBeaver",
             "is_featured": True, "order": 2},
            {"title": "Portfolio REST API + Frontend",
             "slug": "portfolio-rest-api-frontend", "category": "backend",
             "short_description": "Full-stack Django REST API + Vanilla JS SPA portfolio with separated frontend/backend.",
             "description": (
                 "This portfolio itself – a full-stack application with a clear frontend/backend separation. "
                 "Backend: Django + DRF REST API with 8 endpoints, serializer validation, CORS headers. "
                 "Frontend: Vanilla JS SPA consuming the API with fetch(), animated UI, and dark theme."
             ),
             "tech_stack": "Django, DRF, Python, Vanilla JS, Bootstrap 5, SQLite, CORS",
             "is_featured": True, "order": 3},
        ]
        for r in rows: Project.objects.create(**r)
        self.stdout.write("  ✅  Projects created.")
