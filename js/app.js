/**
 * app.js – Frontend entrypoint for the portfolio.
 * Bootstraps routing, loads data from API, renders pages and removes the spinner.
 */

import { API } from './api.js';
import { initFadeIn, animateBars } from './utils.js';

import { renderHome } from './pages/home.js';
import { renderProjects } from './pages/projects.js';
import { renderSkills } from './pages/skills.js';
import { renderAbout } from './pages/about.js';
import { renderContact } from './pages/contact.js';

function getInitialPage() {
  // Supports deep links via hash: #/projects or #projects
  const raw = (typeof window !== 'undefined' ? window.location.hash : '') || '';
  const cleaned = raw.replace(/^#\/?/, '');
  const page = cleaned.split('?')[0].trim();
  return page || 'home';
}

function setActiveNav(page) {
  document.querySelectorAll('[data-page]').forEach(a => a.classList.remove('active'));
  document.querySelectorAll(`[data-page="${page}"]`).forEach(a => a.classList.add('active'));
}

function showSpinner(show) {
  const spinner = document.querySelector('.spinner');
  if (!spinner) return;
  spinner.style.display = show ? 'block' : 'none';
}

function mainMount(el) {
  // Ensure baseline
  el.innerHTML = '';
}

async function loadSummary() {
  // Summary is optional: pages can render with defaults.
  try {
    return await API.getSummary();
  } catch (_) {
    return {};
  }
}

function routeTo(page) {
  // Public function used by HTML buttons.
  const next = String(page || 'home');
  window.location.hash = `#/${next}`;
  renderRoute(next);
}

async function renderRoute(page) {
  const root = document.getElementById('main-content');
  if (!root) return;

  showSpinner(true);
  mainMount(root);

  const normalized = String(page || 'home');
  setActiveNav(normalized);

  const summary = await loadSummary();

  try {
    switch (normalized) {
      case 'home':
        await renderHome(root, summary, API);
        break;
      case 'about':
        await renderAbout(root, summary, API);
        break;
      case 'skills':
        await renderSkills(root, summary, API);
        break;
      case 'projects':
        await renderProjects(root, summary, API);
        break;
      case 'contact':
        await renderContact(root, summary, API);
        break;
      default:
        await renderHome(root, summary, API);
        break;
    }
  } catch (e) {
    root.innerHTML = `<div class="container" style="padding:120px 0 80px;text-align:center;">
      <h1 style="margin-bottom:10px;">Something went wrong</h1>
      <p class="text-muted">${String(e?.message || e || 'Unknown error')}</p>
    </div>`;
  } finally {
    showSpinner(false);
    initFadeIn(document);
    animateBars(document);
  }
}

window.navigate = routeTo;

// Initial boot
renderRoute(getInitialPage());

window.addEventListener('hashchange', () => {
  const next = (window.location.hash || '').replace(/^#\/?/, '').trim() || 'home';
  renderRoute(next);
});

