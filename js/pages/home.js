/**
 * home.js – Renders the landing page using API summary data.
 */
import { escHtml, techTag, catEmoji, catLabel, typewriter } from '../utils.js';

export async function renderHome(el, summary) {
  const { about, featured_projects, skill_categories, certifications } = summary;

  el.innerHTML = `
  <section id="hero">
    <div class="hero-glow-1"></div>
    <div class="hero-glow-2"></div>
    <div class="container">
      <div class="hero-grid">
        <div>
          <div class="avail-dot fade-in">
            <span class="pulse"></span>Available for Internship / Junior Role
          </div>
          <h1 class="hero-name fade-in">
            Hi, I'm<br><span class="grad-text">Suraj Kumar</span><br>Shah
          </h1>
          <p class="hero-role fade-in">
            <span id="typed" class="typed"></span><span class="cursor">|</span>
          </p>
          <p class="hero-bio fade-in">
            ${escHtml(
              about?.bio ||
                'A passionate Computer System Engineering student at ISMT, Kathmandu, specialising in Python & Django backend development.'
            )}
          </p>
          <div class="hero-btns fade-in">
            <button class="btn btn-primary" onclick="navigate('projects')"><i class="fas fa-briefcase"></i> View Projects</button>
            <button class="btn btn-outline" onclick="navigate('contact')"><i class="fas fa-paper-plane"></i> Hire Me</button>
            <button class="btn btn-ghost" onclick="navigate('about')"><i class="fas fa-user"></i> About</button>
          </div>
          <div class="hero-stats fade-in">
            <div><div class="stat-num grad-text">2+</div><div class="stat-lbl">Projects</div></div>
            <div><div class="stat-num grad-text">5+</div><div class="stat-lbl">Certifications</div></div>
            <div><div class="stat-num grad-text">2nd</div><div class="stat-lbl">Year ISMT</div></div>
          </div>
        </div>

        <div class="hero-avatar-wrap">
          <div class="avatar-orbit">
            <div class="avatar-ring">
              <div class="avatar-inner">
                ${about?.profile_image ? `<img src="${about.profile_image}" alt="Suraj Kumar Shah">` : '👨‍💻'}
              </div>
            </div>
            <div class="orbit-pill top-r"><i class="fab fa-python" style="color:#f59e0b"></i> Django Dev</div>
            <div class="orbit-pill bot-l"><i class="fas fa-database" style="color:#06b6d4"></i> PostgreSQL</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container text-center">
      <span class="section-label"><i class="fas fa-code"></i> Tech Stack</span>
      <h2 class="section-title fade-in">Technologies I <span class="grad-text">Work With</span></h2>
      <div class="divider center"></div>
      <div class="skills-chips fade-in" id="chipWrap">${buildChips(skill_categories)}</div>
      <div class="mt-4 fade-in"><button class="btn btn-outline btn-sm" onclick="navigate('skills')">All Skills <i class="fas fa-arrow-right"></i></button></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="text-center">
        <span class="section-label"><i class="fas fa-briefcase"></i> Portfolio</span>
        <h2 class="section-title fade-in">Featured <span class="grad-text">Projects</span></h2>
        <div class="divider center"></div>
        <p class="section-sub fade-in">Real-world applications built to solve meaningful problems</p>
      </div>
      <div class="projects-grid" id="featuredGrid">${buildProjectCards(featured_projects)}</div>
      <div class="text-center mt-4 fade-in"><button class="btn btn-primary" onclick="navigate('projects')"><i class="fas fa-th"></i> All Projects</button></div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="text-center">
        <span class="section-label"><i class="fas fa-certificate"></i> Credentials</span>
        <h2 class="section-title fade-in">Certifications & <span class="grad-text">Training</span></h2>
        <div class="divider center"></div>
      </div>
      <div class="certs-grid fade-in">${buildCertCards(certifications)}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="fade-in" style="background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(6,182,212,.05));border:1px solid var(--clr-border);border-radius:var(--radius-xl);padding:64px 40px;text-align:center;max-width:780px;margin:0 auto;">
        <h2 class="section-title">Let's Build Something <span class="grad-text">Together</span></h2>
        <p class="text-muted mt-2 mb-1" style="font-size:1.05rem;max-width:540px;margin:16px auto 28px;">I'm actively seeking a <strong>Python Django internship</strong> or junior developer role. Clean code, fast learner, ready to contribute from day one.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="navigate('contact')"><i class="fas fa-envelope"></i> Get In Touch</button>
          <a href="mailto:surajks.shah@gmail.com" class="btn btn-outline"><i class="fas fa-paper-plane"></i> surajks.shah@gmail.com</a>
        </div>
      </div>
    </div>
  </section>
  `;

  const typedEl = el.querySelector('#typed');
  if (typedEl) {
    typewriter(typedEl, [
      'Python Django Developer',
      'Backend Engineer',
      'REST API Builder',
      'PostgreSQL Enthusiast',
      'CS Engineering Student',
    ]);
  }
}

function buildChips(cats) {
  if (!cats?.length) return defaultChips();
  return cats
    .flatMap((cat) =>
      cat.skills.map(
        (s) => `<span class="skill-chip">${s.icon ? `<i class="${escHtml(s.icon)}"></i>` : '<i class="fas fa-cog"></i>'}${escHtml(s.name)}</span>`
      )
    )
    .join('');
}

function defaultChips() {
  const chips = [
    ['fab fa-python text-warning', 'Python'],
    ['fas fa-server text-success', 'Django'],
    ['fas fa-code text-info', 'DRF'],
    ['fas fa-database text-primary', 'PostgreSQL'],
    ['fab fa-html5 text-danger', 'HTML5'],
    ['fab fa-css3-alt text-info', 'CSS3'],
    ['fab fa-js-square text-warning', 'JavaScript'],
    ['fab fa-bootstrap', 'Bootstrap'],
    ['fab fa-git-alt text-danger', 'Git'],
    ['fab fa-github', 'GitHub'],
  ];
  return chips.map(([ic, n]) => `<span class="skill-chip"><i class="${ic}"></i>${n}</span>`).join('');
}

function buildProjectCards(projects) {
  if (!projects?.length) return defaultProjects();
  return projects
    .map(
      (p) => `
    <article class="project-card fade-in">
      <div class="project-thumb">
        ${p.image ? `<img src="${p.image}" alt="${escHtml(p.title)}">` : catEmoji(p.category)}
        <span class="thumb-cat">${catLabel(p.category)}</span>
        ${p.is_featured ? '<span class="thumb-featured">⭐ Featured</span>' : ''}
      </div>
      <div class="project-body">
        <h3 class="project-title">${escHtml(p.title)}</h3>
        <p class="project-desc">${escHtml(p.short_description)}</p>
        <div class="tech-wrap">${p.tech_list?.map(techTag).join('') || ''}</div>
        <div class="project-links">
          ${p.github_url ? `<a href="${escHtml(p.github_url)}" target="_blank" class="btn btn-ghost btn-sm"><i class="fab fa-github"></i> Code</a>` : ''}
          ${p.live_url ? `<a href="${escHtml(p.live_url)}" target="_blank" class="btn btn-ghost btn-sm"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
          <button class="btn btn-primary btn-sm" onclick="navigate('projects')"><i class="fas fa-eye"></i> More</button>
        </div>
      </div>
    </article>`
    )
    .join('');
}

function defaultProjects() {
  return [
    {
      emoji: '📸',
      cat: 'Web Dev',
      title: 'Boundless Moments Photography',
      desc: 'Responsive photography portfolio with SEO & accessibility.',
      stack: 'HTML5, CSS3, JavaScript',
    },
    {
      emoji: '🏨',
      cat: 'Database',
      title: 'Hotel Room Reservation System',
      desc: 'Desktop app for Hidden Paradise Hotel with PostgreSQL backend.',
      stack: 'Python, Tkinter, PostgreSQL',
    },
    {
      emoji: '🌐',
      cat: 'Backend',
      title: 'Portfolio REST API + Frontend',
      desc: 'Django REST API + Vanilla JS SPA with separated architecture.',
      stack: 'Django, DRF, JavaScript',
    },
  ]
    .map(
      (p) => `
    <article class="project-card fade-in">
      <div class="project-thumb">${p.emoji}<span class="thumb-cat">${p.cat}</span><span class="thumb-featured">⭐ Featured</span></div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="tech-wrap">${p.stack.split(',').map((t) => `<span class="tech-tag">${t.trim()}</span>`).join('')}</div>
        <div class="project-links"><button class="btn btn-primary btn-sm" onclick="navigate('projects')"><i class="fas fa-eye"></i> Details</button></div>
      </div>
    </article>`
    )
    .join('');
}

function buildCertCards(certs) {
  if (!certs?.length) return defaultCerts();
  return certs
    .map(
      (c) => `
    <div class="cert-card fade-in">
      <div class="cert-icon" style="background:${escHtml(c.badge_color)}22;color:${escHtml(c.badge_color)}">
        <i class="${escHtml(c.icon)}"></i>
      </div>
      <div>
        <div class="cert-name">${escHtml(c.name)}</div>
        <div class="cert-issuer">${escHtml(c.issuer)}</div>
        <div class="cert-date">${c.date_issued || ''}</div>
      </div>
    </div>`
    )
    .join('');
}

function defaultCerts() {
  const c = [
    { icon: 'fas fa-graduation-cap', color: '#10b981', name: 'Full Stack Python Django', issuer: 'Mind Risers Institute of Technology', date: 'May 2026' },
    { icon: 'fas fa-shield-alt', color: '#ef4444', name: 'Cyber Security Workshop', issuer: 'KMC Students Committee', date: 'Mar 2022' },
    { icon: 'fas fa-search', color: '#f59e0b', name: '5-Day SEO Challenge', issuer: 'ORKA SOCIALS', date: 'Jun 2024' },
    { icon: 'fas fa-child', color: '#06b6d4', name: 'Child Rights Toolkit', issuer: 'UNICEF', date: '2024' },
    { icon: 'fas fa-comments', color: '#6366f1', name: 'Building Communication', issuer: 'Kathmandu Model School', date: '2022' },
  ];

  return c
    .map(
      (cc) => `
    <div class="cert-card fade-in">
      <div class="cert-icon" style="background:${cc.color}22;color:${cc.color}"><i class="${cc.icon}"></i></div>
      <div>
        <div class="cert-name">${cc.name}</div>
        <div class="cert-issuer">${cc.issuer}</div>
        <div class="cert-date">${cc.date}</div>
      </div>
    </div>`
    )
    .join('');
}

