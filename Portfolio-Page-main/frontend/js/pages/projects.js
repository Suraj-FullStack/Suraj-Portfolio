/**
 * projects.js – Renders the Projects page with filter bar.
 */
import { API } from '../api.js';
import { escHtml, techTag, catEmoji, catLabel } from '../utils.js';

// Use shared API base from ../api.js


export async function renderProjects(el, summary, API) {
  let projects = summary.featured_projects || [];

  // Fetch full project list fresh (not just featured)
  try {
    projects = await API.getProjects();
  } catch (_) {/* use summary fallback */ }

  el.innerHTML = `
  <div style="padding:130px 0 60px;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(99,102,241,.1) 0%,transparent 70%);">
    <div class="container text-center">
      <span class="section-label"><i class="fas fa-briefcase"></i> Work</span>
      <h1 class="section-title fade-in">My <span class="grad-text">Projects</span></h1>
      <div class="divider center"></div>
      <p class="section-sub fade-in">Hands-on projects demonstrating backend, database & web development</p>
    </div>
  </div>

  <div class="container" style="padding-bottom:80px;">
    <!-- Filter bar -->
    <div class="filter-bar fade-in" id="filterBar">
      <button class="filter-btn active" data-cat="all">
        <i class="fas fa-th"></i> All
      </button>
      <button class="filter-btn" data-cat="web">🌐 Web</button>
      <button class="filter-btn" data-cat="backend">⚙️ Backend</button>
      <button class="filter-btn" data-cat="database">🗄️ Database</button>
    </div>

    <!-- Project grid -->
    <div class="projects-grid" id="projectGrid">
      ${renderCards(projects)}
    </div>

    ${!projects.length ? `
      <div class="text-center" style="padding:60px 0;">
        <p class="text-muted">No projects found. Add some via the <a href="http://localhost:8000/admin/" target="_blank">Admin Panel</a>.</p>
      </div>` : ''}
  </div>
  `;

  // Filter logic
  const btns = el.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat);
      el.querySelector('#projectGrid').innerHTML = renderCards(filtered);
    });
  });
}

function renderCards(projects) {
  if (!projects?.length) return defaultCards();
  return projects.map(p => `
    <article class="project-card fade-in">
      <div class="project-thumb">
        ${p.image ? `<img src="${p.image}" alt="${escHtml(p.title)}">` : catEmoji(p.category)}
        <span class="thumb-cat">${catLabel(p.category)}</span>
        ${p.is_featured ? '<span class="thumb-featured">⭐ Featured</span>' : ''}
      </div>
      <div class="project-body">
        <h3 class="project-title">${escHtml(p.title)}</h3>
        <p class="project-desc">${escHtml(p.short_description)}</p>
        <div class="tech-wrap">${p.tech_list?.map(t => `<span class="tech-tag">${escHtml(t)}</span>`).join('') || ''}</div>
        <div class="project-links">
          ${p.github_url ? `<a href="${escHtml(p.github_url)}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm"><i class="fab fa-github"></i> Code</a>` : ''}
          ${p.live_url   ? `<a href="${escHtml(p.live_url)}"   target="_blank" rel="noopener" class="btn btn-outline btn-sm"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
          <button class="btn btn-primary btn-sm" onclick="showDetail('${escHtml(p.slug)}')"><i class="fas fa-eye"></i> Details</button>
        </div>
      </div>
    </article>`).join('');
}

function defaultCards() {
  return [
    { emoji:'📸', cat:'web',      title:'Boundless Moments Photography', desc:'Responsive multi-page photography portfolio with SEO & accessibility.', stack:'HTML5, CSS3, JavaScript', featured:true },
    { emoji:'🏨', cat:'database', title:'Hotel Room Reservation System', desc:'Full-featured hotel management app for Hidden Paradise Hotel with PostgreSQL.', stack:'Python, Tkinter, PostgreSQL, PG8000', featured:true },
    { emoji:'🌐', cat:'backend',  title:'Portfolio REST API + Frontend', desc:'Django REST API + Vanilla JS SPA with fully separated frontend/backend.', stack:'Django, DRF, Python, JavaScript, Bootstrap 5', featured:true },
  ].map(p => `
    <article class="project-card fade-in">
      <div class="project-thumb">
        ${p.emoji}
        <span class="thumb-cat">${catLabel(p.cat)}</span>
        ${p.featured ? '<span class="thumb-featured">⭐ Featured</span>' : ''}
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="tech-wrap">${p.stack.split(',').map(t=>`<span class="tech-tag">${t.trim()}</span>`).join('')}</div>
        <div class="project-links">
          <button class="btn btn-primary btn-sm" onclick="navigate('contact')"><i class="fas fa-envelope"></i> Inquire</button>
        </div>
      </div>
    </article>`).join('');
}

// Expose for inline onclick
window.showDetail = async (slug) => {
  // Simple modal-style detail view (use shared API client)
  try {
    const res = await API.getProjectBySlug(slug);
    const p = res;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    overlay.innerHTML = `
      <div style="background:var(--clr-card);border:1px solid var(--clr-border);border-radius:var(--radius-lg);max-width:700px;width:100%;max-height:90vh;overflow-y:auto;padding:36px;position:relative;">
        <button onclick="this.closest('[style*=fixed]').remove()" style="position:absolute;top:16px;right:16px;background:none;border:none;color:var(--clr-muted);font-size:1.4rem;cursor:pointer;">×</button>
        <span class="badge badge-cyan" style="margin-bottom:14px;">${catLabel(p.category)}</span>
        <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:10px;">${escHtml(p.title)}</h2>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;">${p.tech_list?.map(t=>`<span class="tech-tag">${escHtml(t)}</span>`).join('')||''}</div>
        <p style="color:var(--clr-muted);line-height:1.8;margin-bottom:20px;white-space:pre-line;">${escHtml(p.description)}</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          ${p.github_url?`<a href="${escHtml(p.github_url)}" target="_blank" class="btn btn-ghost btn-sm"><i class="fab fa-github"></i> Code</a>`:''}
          ${p.live_url?`<a href="${escHtml(p.live_url)}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Live Demo</a>`:''}
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  } catch (_) { /* silent */ }
};
