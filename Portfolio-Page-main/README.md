# Suraj Kumar Shah – Portfolio

> **Python Django Developer | CS Engineering Student | Kathmandu, Nepal**

A full-stack portfolio built with a **Django REST Framework** backend and a **Vanilla JS SPA** frontend — completely separated into `/backend` and `/frontend` directories.

---

## 🗂 Project Structure

```
suraj-portfolio/
├── backend/                    # Django REST API (port 8000)
│   ├── config/                 # Django project settings & URLs
│   │   ├── settings.py         # INSTALLED_APPS, CORS, DRF config
│   │   ├── urls.py             # Root URL routing
│   │   └── wsgi.py
│   ├── api/                    # Main Django app
│   │   ├── models.py           # 8 ORM models (About, Skills, Projects, …)
│   │   ├── serializers.py      # DRF serializers with validation
│   │   ├── views.py            # 9 class-based API views
│   │   ├── urls.py             # /api/v1/ URL patterns
│   │   ├── admin.py            # Django admin registrations
│   │   └── management/
│   │       └── commands/
│   │           └── seed_data.py  # Seeds full CV data
│   ├── migrations/             # Database migrations
│   ├── manage.py
│   └── ecosystem.config.cjs    # PM2 config (backend only)
│
├── frontend/                   # Vanilla JS SPA (port 5500)
│   ├── index.html              # SPA shell – single HTML entry point
│   ├── css/
│   │   └── style.css           # ~700 lines – dark theme, CSS variables
│   ├── js/
│   │   ├── api.js              # Centralized API client (Fetch wrapper)
│   │   ├── app.js              # SPA router – navigate() + state
│   │   ├── utils.js            # Helpers: escHtml, typewriter, animateBars
│   │   └── pages/
│   │       ├── home.js         # Hero, skills chips, featured projects, CTA
│   │       ├── about.js        # Profile, education/exp timelines, skill bars
│   │       ├── skills.js       # Category tabs + skill grid
│   │       ├── projects.js     # Filter bar, cards grid, modal detail
│   │       └── contact.js      # Contact form with AJAX + honeypot
│   └── server.py               # Python static file server (dev only)
│
├── ecosystem.config.cjs        # PM2 config for BOTH services
└── .gitignore
```

---

## ✨ Features

### Frontend (Vanilla JS SPA)
- 🌑 **Modern dark theme** – CSS custom properties, glassmorphism, gradient text
- ⚡ **Client-side routing** – Zero page reloads, smooth transitions
- 🔤 **Typewriter effect** – Rotating role phrases in the hero section
- 📱 **Fully responsive** – Mobile hamburger menu, adaptive grid layouts
- 🎞 **IntersectionObserver animations** – Fade-in and skill bar animations
- 🏠 **Home** – Hero + tech stack chips + featured projects + certifications + CTA
- 👤 **About** – Sidebar profile + education/experience timelines + skill progress bars
- 💡 **Skills** – Tabbed categories (Backend / Database / Frontend / Tools) with animated bars
- 🗂 **Projects** – Filter by category + card grid + modal detail view
- ✉️ **Contact** – AJAX form with client + server validation + honeypot protection

### Backend (Django REST Framework API)
- 🔌 **9 REST endpoints** under `/api/v1/`
- 🧩 **8 ORM models** – About, SkillCategory, Skill, Project, Education, Experience, Certification, ContactMessage
- 🔒 **Strict form validation** – Field-level + cross-field validators in serializers
- 🛡 **Honeypot spam protection** – Hidden `website` field in contact endpoint
- 💨 **Single round-trip endpoint** – `/api/v1/summary/` loads everything for the home page
- 🔑 **Django admin** – Full model management at `/admin/`
- 🌍 **CORS enabled** – `django-cors-headers` with `CORS_ALLOW_ALL_ORIGINS = True`
- 🌱 **Seed command** – `python manage.py seed_data` populates all CV data

---

## 🛠 Tech Stack

| Layer       | Technology                               |
|-------------|------------------------------------------|
| Backend     | Python 3, Django 5, Django REST Framework |
| Database    | SQLite (dev) / PostgreSQL (prod-ready)   |
| Frontend    | Vanilla JS (ES Modules), HTML5, CSS3     |
| Fonts       | Inter + JetBrains Mono (Google Fonts)    |
| Icons       | Font Awesome 6                           |
| Process Mgr | PM2                                      |
| Timezone    | Asia/Kathmandu (UTC+5:45)               |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- pip

### Backend Setup

```bash
cd backend

# Create & activate virtual environment
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers pillow

# Run migrations
python manage.py migrate

# Seed CV data
python manage.py seed_data

# Create admin superuser
python manage.py createsuperuser

# Start API server
python manage.py runserver 0.0.0.0:8000
```

### Frontend Setup

```bash
cd frontend

# Option 1: Python static server
python server.py             # Starts on http://localhost:5500

# Option 2: Any static server
npx serve . -p 5500
# or
python -m http.server 5500
```

### Run Both with PM2

```bash
# From the root suraj-portfolio/ directory
pm2 start ecosystem.config.cjs
pm2 list                      # Check status
pm2 logs --nostream           # View logs
```

---

## 📡 API Endpoints

| Method | Endpoint                       | Description                    |
|--------|--------------------------------|--------------------------------|
| GET    | `/api/v1/summary/`             | All home-page data (1 request) |
| GET    | `/api/v1/about/`               | Profile information            |
| GET    | `/api/v1/skills/`              | Skills grouped by category     |
| GET    | `/api/v1/projects/`            | All projects (filterable)      |
| GET    | `/api/v1/projects/<slug>/`     | Single project detail          |
| GET    | `/api/v1/education/`           | Education history              |
| GET    | `/api/v1/experience/`          | Work experience                |
| GET    | `/api/v1/certifications/`      | Certifications list            |
| POST   | `/api/v1/contact/`             | Submit contact message         |

**Filter projects by category:**
```
GET /api/v1/projects/?category=web
GET /api/v1/projects/?category=backend
GET /api/v1/projects/?category=database
```

---

## 🗄 Data Models

```
About          → name, title, bio, location, email, phone, GitHub, LinkedIn
SkillCategory  → name, icon, order
Skill          → name, level (1-5), percentage, icon, category (FK)
Project        → title, slug, short_description, description, tech_stack,
                 category, github_url, live_url, is_featured, image
Education      → institution, degree, field, start_date, end_date, description
Experience     → company, role, start_date, end_date, description, is_current
Certification  → name, issuer, date_issued, credential_url, icon, badge_color
ContactMessage → name, email, subject, message, is_read, created_at
```

---

## 🧑‍💻 About Suraj

**Suraj Kumar Shah** is a Computer System Engineering student at **ISMT College, Kathmandu**, passionate about:
- 🐍 Python & Django backend development
- 🔌 Designing clean REST APIs
- 🗄 Relational databases (PostgreSQL, SQLite)
- 🌐 Full-stack web development

📧 surajks.shah@gmail.com | 📍 Kathmandu, Nepal | 📞 +977 9864133310

---

## 📄 License

MIT License — feel free to use this as a template for your own portfolio.

---

*Built with ❤️ using Django REST Framework + Vanilla JavaScript*
