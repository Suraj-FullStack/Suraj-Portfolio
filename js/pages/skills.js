/**
 * skills.js – Renders the Skills page with filterable category tabs.
 */
import { escHtml } from '../utils.js';

export async function renderSkills(el, summary) {
  const { skill_categories } = summary;
  const cats = skill_categories?.length ? skill_categories : defaultCategories();

  el.innerHTML = `
  <div style="padding:130px 0 60px;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(99,102,241,.1) 0%,transparent 70%);">
    <div class="container text-center">
      <span class="section-label"><i class="fas fa-code"></i> Expertise</span>
      <h1 class="section-title fade-in">My <span class="grad-text">Skills</span></h1>
      <div class="divider center"></div>
      <p class="section-sub fade-in">Technologies and tools I use to build great software</p>
    </div>
  </div>

  <div class="container" style="padding-bottom:80px;">

    <div class="cat-tabs fade-in" id="catTabs">
      <button class="cat-tab active" data-cat="all">All</button>
      ${cats.map(c => `<button class="cat-tab" data-cat="${c.id}">${escHtml(c.name)}</button>`).join('')}
    </div>

    <div id="skillSections">
      ${cats.map(cat => `
        <div class="skill-section fade-in" data-section="${cat.id}" style="margin-bottom:48px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(99,102,241,.12);display:flex;align-items:center;justify-content:center;color:var(--clr-primary);">
              <i class="${escHtml(cat.icon || 'fas fa-code')}"></i>
            </div>
            <div>
              <h3 style="font-size:1.05rem;font-weight:700;margin-bottom:2px;">${escHtml(cat.name)}</h3>
              <small class="text-muted">${cat.skills.length} skill${cat.skills.length !== 1 ? 's' : ''}</small>
            </div>
          </div>
          <div class="skill-grid">
            ${cat.skills.map(s => `
              <div class="skill-item">
                <div class="skill-icon">
                  <i class="${escHtml(s.icon || 'fas fa-cog')}"></i>
                </div>
                <div class="skill-name">${escHtml(s.name)}</div>
                <div class="skill-level-text">${escHtml(s.level_display || levelLabel(s.level))}</div>
                <div class="skill-bar-wrap">
                  <div class="skill-bar-fill" data-pct="${s.percentage}" style="width:0"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>

    <div class="fade-in" style="margin-top:16px;">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:10px;">
        <i class="fas fa-users" style="color:var(--clr-cyan)"></i> Soft Skills
      </h2>
      <div class="skill-grid">
        ${softSkills().map(([icon,name,color]) => `
          <div class="skill-item">
            <div class="skill-icon" style="background:${color}22;color:${color}"><i class="${icon}"></i></div>
            <div class="skill-name">${name}</div>
          </div>`).join('')}
      </div>
    </div>

  </div>
  `;

  el.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      el.querySelectorAll('.skill-section').forEach(sec => {
        sec.style.display = (cat === 'all' || sec.dataset.section == cat) ? 'block' : 'none';
      });
    });
  });
}

function levelLabel(lvl) { return ['','Beginner','Elementary','Intermediate','Advanced','Expert'][lvl] || 'Intermediate'; }

function softSkills() { return [['fas fa-users','Teamwork','#6366f1'],['fas fa-crown','Leadership','#f59e0b'],['fas fa-puzzle-piece','Problem Solving','#06b6d4'],['fas fa-comments','Communication','#10b981'],['fas fa-sync-alt','Adaptability','#ec4899'],['fas fa-lightbulb','Critical Thinking','#8b5cf6']]; }

function defaultCategories() { return [
  { id:1, name:'Backend', icon:'fas fa-server', skills:[ {name:'Python',level:4,percentage:85,icon:'fab fa-python',level_display:'Advanced'}, {name:'Django',level:4,percentage:80,icon:'fas fa-server',level_display:'Advanced'}, {name:'Django REST Framework',level:3,percentage:72,icon:'fas fa-code',level_display:'Intermediate'}, {name:'REST API Design',level:3,percentage:70,icon:'fas fa-plug',level_display:'Intermediate'} ] },
  { id:2, name:'Database', icon:'fas fa-database', skills:[ {name:'PostgreSQL',level:3,percentage:72,icon:'fas fa-database',level_display:'Intermediate'}, {name:'SQLite',level:3,percentage:70,icon:'fas fa-database',level_display:'Intermediate'}, {name:'Django ORM',level:4,percentage:80,icon:'fas fa-layer-group',level_display:'Advanced'}, {name:'DBeaver',level:3,percentage:68,icon:'fas fa-table',level_display:'Intermediate'} ] },
  { id:3, name:'Frontend', icon:'fas fa-paint-brush', skills:[ {name:'HTML5',level:4,percentage:85,icon:'fab fa-html5',level_display:'Advanced'}, {name:'CSS3',level:4,percentage:82,icon:'fab fa-css3-alt',level_display:'Advanced'}, {name:'JavaScript',level:3,percentage:65,icon:'fab fa-js-square',level_display:'Intermediate'}, {name:'Bootstrap 5',level:4,percentage:80,icon:'fab fa-bootstrap',level_display:'Advanced'} ] },
  { id:4, name:'Tools', icon:'fas fa-tools', skills:[ {name:'Git',level:3,percentage:70,icon:'fab fa-git-alt',level_display:'Intermediate'}, {name:'GitHub',level:3,percentage:70,icon:'fab fa-github',level_display:'Intermediate'}, {name:'VS Code',level:4,percentage:85,icon:'fas fa-code',level_display:'Advanced'}, {name:'Jupyter Notebook',level:3,percentage:68,icon:'fas fa-book',level_display:'Intermediate'} ] },
]; }
