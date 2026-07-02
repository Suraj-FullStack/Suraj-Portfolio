/**
 * utils.js – Shared utility helpers used across page modules.
 */

/** Escape HTML to prevent XSS when injecting API strings into innerHTML */
export function escHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Build a tech tag pill */
export function techTag(name) {
  return `<span class="tech-tag">${escHtml(name)}</span>`;
}

/** Category → emoji map for project thumbnails */
export function catEmoji(cat) {
  const map = { web: '🌐', backend: '⚙️', database: '🗄️', ml: '🧠', other: '💡' };
  return map[cat] || '💡';
}

/** Category → readable label */
export function catLabel(cat) {
  const map = {
    web: 'Web Dev', backend: 'Backend / API',
    database: 'Database', ml: 'Machine Learning', other: 'Other',
  };
  return map[cat] || cat;
}

/** Render a spinner element */
export function spinner() {
  return '<div class="spinner" role="status" aria-label="Loading…"></div>';
}

/** Render an error banner */
export function errBanner(msg) {
  return `<div class="badge badge-red" style="margin:40px auto;display:flex;width:fit-content;">
            <i class="fas fa-exclamation-triangle"></i> ${escHtml(msg)}
          </div>`;
}

/** Animate skill bar fills after they enter the viewport */
export function animateBars(container = document) {
  const fills = container.querySelectorAll('.skill-bar-fill[data-pct]');
  if (!fills.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.pct + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  fills.forEach(f => obs.observe(f));
}

/** Fade-in observer for .fade-in elements */
export function initFadeIn(root = document) {
  const els = root.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/** Typed text animation */
export function typewriter(el, phrases, speed = 90, pause = 1800) {
  let pi = 0, ci = 0, del = false;
  function tick() {
    const cur = phrases[pi];
    el.textContent = del ? cur.slice(0, ci--) : cur.slice(0, ci++);
    if (!del && ci > cur.length)  { del = true;  setTimeout(tick, pause); return; }
    if (del && ci < 0)             { del = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 500); return; }
    setTimeout(tick, del ? 45 : speed);
  }
  tick();
}

/** Format date string to "Mon YYYY" */
export function fmtDate(d) {
  if (!d) return 'Present';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
