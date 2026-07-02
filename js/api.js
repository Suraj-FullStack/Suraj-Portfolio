/**
 * api.js – Centralised API client for the portfolio frontend.
 */

const API_BASE =
  (typeof window !== 'undefined' && window.location)
    ? 'http://localhost:8000/api/v1'
    : 'http://localhost:8000/api/v1';

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(`API error ${res.status}`), { data: err, status: res.status });
  }
  return res.json();
}

export const API = {
  getSummary:       ()         => apiFetch('/summary/'),
  getAbout:         ()         => apiFetch('/about/'),
  getSkills:        ()         => apiFetch('/skills/'),
  getProjects:      (cat = '') => apiFetch(`/projects/${cat ? `?category=${cat}` : ''}`),
  getProjectBySlug: (slug)     => apiFetch(`/projects/${slug}/`),
  getEducation:     ()         => apiFetch('/education/'),
  getExperience:    ()         => apiFetch('/experience/'),
  getCertifications:()         => apiFetch('/certifications/'),
  sendContact: (body) =>
    apiFetch('/contact/', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
