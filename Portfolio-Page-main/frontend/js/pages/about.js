/**
 * about.js – Renders the About / Timeline page.
 */
import { escHtml, fmtDate } from '../utils.js';

export async function renderAbout(el, summary) {
  const { about, educations, experiences, certifications, skill_categories } = summary;

  el.innerHTML = `
  <!-- Page Hero -->
  <div style="padding:130px 0 60px;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(99,102,241,.1) 0%,transparent 70%);">
    <div class="container text-center">
      <span class="section-label"><i class="fas fa-user"></i> Know Me</span>
      <h1 class="section-title fade-in">About <span class="grad-text">Me</span></h1>
      <div class="divider center"></div>
      <p class="section-sub fade-in">CS Engineering student — backend developer — problem solver</p>
    </div>
  </div>

  <div class="container" style="padding-bottom:80px;">

    <div class="about-grid">
      <!-- Sidebar Card -->
      <div>
        <div class="about-card fade-in">
          <div class="about-avatar">👨‍💻</div>
          <div class="about-name">${escHtml(about?.name || 'Suraj Kumar Shah')}</div>
          <div class="about-role">${escHtml(about?.title || 'Python Django Developer')}</div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
            <span class="badge badge-green"><i class="fas fa-circle"></i> Open to Work</span>
            <span class="badge"><i class="fas fa-map-marker-alt"></i> ${escHtml(about?.location || 'Kathmandu, Nepal')}</span>
          </div>

          <div class="info-row">
            <div class="info-icon"><i class="fas fa-envelope"></i></div>
            <div>
              <span class="info-label">Email</span>
              <a class="info-val" href="mailto:${escHtml(about?.email || '')}">${escHtml(about?.email || 'surajks.shah@gmail.com')}</a>
            </div>
          </div>
          <div class="info-row">
            <div class="info-icon"><i class="fas fa-phone"></i></div>
            <div>
              <span class="info-label">Phone</span>
              <span class="info-val">${escHtml(about?.phone || '+977 9864133310')}</span>
            </div>
          </div>
          <div class="info-row">
            <div class="info-icon"><i class="fab fa-github"></i></div>
            <div>
              <span class="info-label">GitHub</span>
              <a class="info-val" href="${escHtml(about?.github_url || '#')}" target="_blank">github.com</a>
            </div>
          </div>
          <div class="info-row">
            <div class="info-icon"><i class="fab fa-linkedin"></i></div>
            <div>
              <span class="info-label">LinkedIn</span>
              <a class="info-val" href="${escHtml(about?.linkedin_url || '#')}" target="_blank">linkedin.com</a>
            </div>
          </div>
          <div class="info-row">
            <div class="info-icon"><i class="fas fa-globe"></i></div>
            <div>
              <span class="info-label">Languages</span>
              <span class="info-val">Nepali · English · Hindi</span>
            </div>
          </div>

          <button class="btn btn-primary" style="width:100%;margin-top:20px;" onclick="navigate('contact')">
            <i class="fas fa-paper-plane"></i> Contact Me
          </button>
        </div>

        <!-- Stats -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px;">
          ${[['2+','Projects Built'],['5+','Certificates'],['3','Languages'],['2nd','Year @ ISMT']]
            .map(([n,l]) => `
              <div class="card" style="padding:16px;text-align:center;">
                <div class="stat-num grad-text" style="font-size:1.6rem;">${n}</div>
                <div class="stat-lbl">${l}</div>
              </div>`).join('')}
        </div>
      </div>

      <!-- Right: timelines -->
      <div>
        <!-- Objective -->
        <div class="card fade-in" style="padding:24px;margin-bottom:32px;">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;" class="grad-text">
            <i class="fas fa-bullseye me-2"></i> Career Objective
          </h3>
          <p class="text-muted" style="line-height:1.85;">
            ${escHtml(about?.bio || 'Motivated Computer System Engineering student seeking a Python Django internship to apply backend development, database management, and problem-solving skills while contributing to real-world software projects.')}
          </p>
        </div>

        <!-- Education Timeline -->
        <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:10px;">
          <i class="fas fa-graduation-cap" style="color:var(--clr-primary)"></i> Education
        </h3>
        <div class="timeline fade-in">
          ${buildEduTimeline(educations)}
        </div>

        <!-- Experience Timeline -->
        <h3 style="font-size:1.1rem;font-weight:700;margin:32px 0 20px;display:flex;align-items:center;gap:10px;">
          <i class="fas fa-briefcase" style="color:var(--clr-cyan)"></i> Training & Experience
        </h3>
        <div class="timeline fade-in">
          ${buildExpTimeline(experiences)}
        </div>

        <!-- Skills bars -->
        <h3 style="font-size:1.1rem;font-weight:700;margin:32px 0 20px;display:flex;align-items:center;gap:10px;">
          <i class="fas fa-chart-bar" style="color:var(--clr-amber)"></i> Skill Proficiency
        </h3>
        <div class="fade-in" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
          ${buildSkillBars(skill_categories)}
        </div>
      </div>
    </div>

    <!-- Certifications -->
    <div style="margin-top:64px;">
      <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:20px;text-align:center;">
        <i class="fas fa-certificate" style="color:var(--clr-green)"></i> Certifications
      </h3>
      <div class="certs-grid fade-in">
        ${buildCerts(certifications)}
      </div>
    </div>
  </div>
  `;
}

function buildEduTimeline(eduList) {
  const defaults = [
    { degree:'BSc (Hons) Computer System Engineering', institution:'ISMT, Kathmandu', duration:'2023 – Present', gpa:'', description:'Currently in 2nd Year.' },
    { degree:'Higher Secondary Education (+2)', institution:'Kathmandu Model Secondary School, Bagbazar', duration:'2021 – 2023', gpa:'3.44', description:'Science stream.' },
    { degree:'SEE', institution:'Laligurans Academy, Sarlahi', duration:'2019 – 2021', gpa:'3.8', description:'Distinction graduate.' },
  ];
  const list = eduList?.length ? eduList : defaults;
  return list.map(e => `
    <div class="tl-item">
      <div class="tl-dot"></div>
      <div class="tl-card">
        <div class="tl-header">
          <span class="tl-title">${escHtml(e.degree)}</span>
          <span class="tl-year">${escHtml(e.duration || `${e.start_year} – ${e.end_year || 'Present'}`)}</span>
        </div>
        <div class="tl-org">${escHtml(e.institution)}${e.location ? `, ${escHtml(e.location)}` : ''}</div>
        ${e.gpa ? `<span class="badge badge-green" style="font-size:.72rem;margin-bottom:6px;">GPA: ${escHtml(String(e.gpa))}</span>` : ''}
        ${e.description ? `<p class="tl-desc">${escHtml(e.description)}</p>` : ''}
      </div>
    </div>`).join('');
}

function buildExpTimeline(expList) {
  const defaults = [
    { type_display:'Training', title:'Full Stack Python Django', organization:'Mind Risers Institute of Technology', duration:'Nov 2025 – May 2026', description:'Python, Django, DRF, PostgreSQL, Git, Deployment.', tech_used:'Python, Django, DRF, PostgreSQL' },
    { type_display:'Workshop', title:'Cyber Security & Ethical Hacking', organization:'KMC Students Committee', duration:'Mar 2022', description:'Cyber security fundamentals and network security.', tech_used:'Linux, Network Security' },
  ];
  const list = expList?.length ? expList : defaults;
  return list.map(e => `
    <div class="tl-item">
      <div class="tl-dot" style="background:var(--clr-cyan)"></div>
      <div class="tl-card">
        <div style="margin-bottom:6px;"><span class="badge badge-cyan" style="font-size:.7rem;">${escHtml(e.type_display || e.type)}</span></div>
        <div class="tl-header">
          <span class="tl-title">${escHtml(e.title)}</span>
          <span class="tl-year">${escHtml(e.duration || `${fmtDate(e.start_date)} – ${fmtDate(e.end_date)}`)}</span>
        </div>
        <div class="tl-org">${escHtml(e.organization)}</div>
        <p class="tl-desc">${escHtml(e.description)}</p>
        ${e.tech_used ? `<div style="margin-top:8px;">${e.tech_used.split(',').map(t=>`<span class="tech-tag">${t.trim()}</span>`).join(' ')}</div>` : ''}
      </div>
    </div>`).join('');
}

function buildSkillBars(cats) {
  const fallback = {
    Backend:  [['Python',85],['Django',80],['Django REST Framework',72],['PostgreSQL',72]],
    Frontend: [['HTML5 / CSS3',85],['JavaScript',65],['Bootstrap 5',80],['Git & GitHub',70]],
  };

  if (!cats?.length) {
    return Object.entries(fallback).map(([label, skills]) => `
      <div>
        <h4 style="font-size:.85rem;color:var(--clr-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;">${label}</h4>
        ${skills.map(([n,p]) => bar(n, p)).join('')}
      </div>`).join('');
  }

  const chunks = [];
  for (let i = 0; i < Math.min(cats.length, 4); i += 2) {
    chunks.push(cats.slice(i, i + 2));
  }
  return cats.slice(0, 4).map(cat => `
    <div>
      <h4 style="font-size:.85rem;color:var(--clr-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;">${escHtml(cat.name)}</h4>
      ${cat.skills.slice(0, 4).map(s => bar(s.name, s.percentage)).join('')}
    </div>`).join('');
}

function bar(name, pct) {
  return `
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
        <span style="font-size:.85rem;font-weight:500;">${escHtml(name)}</span>
        <span style="font-size:.78rem;color:var(--clr-muted);">${pct}%</span>
      </div>
      <div class="skill-bar-wrap">
        <div class="skill-bar-fill" data-pct="${pct}" style="width:0"></div>
      </div>
    </div>`;
}

function buildCerts(certs) {
  const defaults = [
    { icon:'fas fa-graduation-cap', badge_color:'#10b981', name:'Full Stack Python Django', issuer:'Mind Risers Institute of Technology', date_issued:'2026-05-31' },
    { icon:'fas fa-shield-alt',     badge_color:'#ef4444', name:'Cyber Security Workshop',  issuer:'KMC Students Committee',           date_issued:'2022-03-05' },
    { icon:'fas fa-search',         badge_color:'#f59e0b', name:'5-Day SEO Challenge',       issuer:'ORKA SOCIALS',                     date_issued:'2024-06-15' },
    { icon:'fas fa-child',          badge_color:'#06b6d4', name:'Child Rights Toolkit',      issuer:'UNICEF',                           date_issued:'2024-01-01' },
    { icon:'fas fa-comments',       badge_color:'#6366f1', name:'Building Communication',    issuer:'Kathmandu Model School',           date_issued:'2022-06-01' },
  ];
  const list = certs?.length ? certs : defaults;
  return list.map(c => `
    <div class="cert-card">
      <div class="cert-icon" style="background:${c.badge_color}22;color:${c.badge_color}"><i class="${c.icon}"></i></div>
      <div>
        <div class="cert-name">${escHtml(c.name)}</div>
        <div class="cert-issuer">${escHtml(c.issuer)}</div>
        <div class="cert-date">${fmtDate(c.date_issued)}</div>
      </div>
    </div>`).join('');
}
