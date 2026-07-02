/**
 * app.js – Single-Page Application router + global UI behaviours.
 * Loads page modules dynamically and handles client-side navigation.
 */
import { API }      from './api.js';
import { initFadeIn, animateBars } from './utils.js';
import { renderHome }    from './pages/home.js';
import { renderAbout }   from './pages/about.js';
import { renderSkills }  from './pages/skills.js';
import { renderProjects }from './pages/projects.js';
import { renderContact } from './pages/contact.js';

// ── Page registry ──────────────────────────────────────────────────────────
const PAGES = {
  home:     renderHome,
  about:    renderAbout,
  skills:   renderSkills,
  projects: renderProjects,
  contact:  renderContact,
};

// ── State ──────────────────────────────────────────────────────────────────
let currentPage = null;
let summaryCache = null;    // Cache the summary API response

// ── DOM refs ───────────────────────────────────────────────────────────────
const mainEl      = document.getElementById('main-content');
const navLinks    = document.querySelectorAll('[data-page]');
const hamburger   = document.getElementById('hamburger');
const mobileNav   = document.getElementById('mobile-nav');
const backTopBtn  = document.getElementById('backTop');

// ── Router ─────────────────────────────────────────────────────────────────
async function navigate(page) {
  if (!PAGES[page]) page = 'home';
  if (page === currentPage) return;

  currentPage = page;

  // Update nav active state
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.page === page));

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');

  // Show loading
  mainEl.innerHTML = '<div class="spinner" role="status"></div>';

  try {
    // Pre-fetch summary once for reuse
    if (!summaryCache) summaryCache = await API.getSummary();
    await PAGES[page](mainEl, summaryCache, API);
  } catch (err) {
    console.error('Page render error:', err);
    mainEl.innerHTML = `
      <div class="container section text-center">
        <p style="font-size:3rem">⚠️</p>
        <h2 style="margin:16px 0">Something went wrong</h2>
        <p class="text-muted">Could not load data from the API. Make sure the backend is running on port 8000.</p>
        <button class="btn btn-primary mt-2" onclick="navigate('home')">Go Home</button>
      </div>`;
  }

  // Run post-render hooks
  initFadeIn(mainEl);
  animateBars(mainEl);
}

// Expose navigate globally so inline onclick can use it
window.navigate = navigate;

// ── Event listeners ────────────────────────────────────────────────────────
navLinks.forEach(a => {
  a.addEventListener('click', (e) => { e.preventDefault(); navigate(a.dataset.page); });
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// Back-to-top
window.addEventListener('scroll', () => {
  backTopBtn.classList.toggle('show', window.scrollY > 300);
});
backTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Navbar shrink on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.padding = window.scrollY > 50 ? '0' : '';
});

// ── Boot ───────────────────────────────────────────────────────────────────
navigate('home');
