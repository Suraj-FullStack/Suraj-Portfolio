/**
 * contact.js – Renders the Contact page with AJAX form submission.
 */
import { escHtml } from '../utils.js';

export async function renderContact(el, summary, API) {
  const about = summary.about;

  el.innerHTML = `
  <div style="padding:130px 0 60px;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(99,102,241,.1) 0%,transparent 70%);">
    <div class="container text-center">
      <span class="section-label"><i class="fas fa-envelope"></i> Contact</span>
      <h1 class="section-title fade-in">Get In <span class="grad-text">Touch</span></h1>
      <div class="divider center"></div>
      <p class="section-sub fade-in">Looking for a Python Django internship or junior developer role — let's talk!</p>
    </div>
  </div>

  <div class="container" style="padding-bottom:80px;">
    <div class="contact-grid">

      <div class="contact-info-card fade-in">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.3);color:var(--clr-green);padding:7px 16px;border-radius:50px;font-size:.82rem;font-weight:600;margin-bottom:20px;">
          <span class="pulse"></span> Available for Opportunities
        </div>
        <h2 style="font-size:1.3rem;font-weight:800;margin-bottom:10px;">Let's Build Something <span class="grad-text">Amazing</span></h2>
        <p class="text-muted" style="line-height:1.8;margin-bottom:24px;font-size:.92rem;">
          I'm a motivated CS Engineering student eager to apply my Django & Python skills in a real environment.
          Internship, freelance, or collaboration — I'd love to hear from you!
        </p>

        <div class="contact-item">
          <div class="contact-ic email"><i class="fas fa-envelope"></i></div>
          <div>
            <span style="font-size:.72rem;color:var(--clr-muted);display:block;">Email</span>
            <a href="mailto:${escHtml(about?.email || 'surajks.shah@gmail.com')}" style="font-weight:600;font-size:.9rem;">${escHtml(about?.email || 'surajks.shah@gmail.com')}</a>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-ic phone"><i class="fas fa-phone"></i></div>
          <div>
            <span style="font-size:.72rem;color:var(--clr-muted);display:block;">Phone</span>
            <a href="tel:${escHtml(about?.phone || '+9779864133310')}" style="font-weight:600;font-size:.9rem;">${escHtml(about?.phone || '+977 9864133310')}</a>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-ic loc"><i class="fas fa-map-marker-alt"></i></div>
          <div>
            <span style="font-size:.72rem;color:var(--clr-muted);display:block;">Location</span>
            <span style="font-weight:600;font-size:.9rem;">${escHtml(about?.location || 'Kathmandu, Nepal')}</span>
          </div>
        </div>

        <div style="margin-top:24px;">
          <h6 style="font-size:.75rem;color:var(--clr-muted);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px;">Find Me Online</h6>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <a href="${escHtml(about?.github_url || 'https://github.com/')}" target="_blank" class="btn btn-ghost btn-sm"><i class="fab fa-github"></i> GitHub</a>
            <a href="${escHtml(about?.linkedin_url || 'https://linkedin.com/')}" target="_blank" class="btn btn-ghost btn-sm"><i class="fab fa-linkedin-in"></i> LinkedIn</a>
          </div>
        </div>

        <div style="margin-top:24px;padding:16px;background:rgba(99,102,241,.06);border:1px solid var(--clr-border);border-radius:var(--radius-sm);">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <i class="fas fa-clock" style="color:var(--clr-primary)"></i>
            <strong style="font-size:.85rem;">Typical Response Time</strong>
          </div>
          <p class="text-muted" style="font-size:.82rem;margin:0;">Usually within <strong>24 hours</strong>. Urgent? Call or WhatsApp directly.</p>
        </div>
      </div>

      <div class="contact-form-card fade-in">
        <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:4px;">Send a Message</h2>
        <p class="text-muted" style="font-size:.85rem;margin-bottom:24px;">I'll reply as soon as possible.</p>

        <div class="success-screen" id="successScreen" style="display:none;">
          <div class="success-icon-wrap"><i class="fas fa-check"></i></div>
          <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:8px;">Message Sent! 🎉</h3>
          <p class="text-muted" style="margin-bottom:20px;">Thank you for reaching out. I'll reply within 24 hours.</p>
          <button class="btn btn-outline btn-sm" id="resetFormBtn"><i class="fas fa-redo"></i> Send Another</button>
        </div>

        <form id="contactForm" novalidate style="display:block;">
          <div style="display:none;" aria-hidden="true">
            <input type="text" name="website" id="website" tabindex="-1" autocomplete="off">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="nameInput"><i class="fas fa-user"></i> Full Name <span style="color:var(--clr-red)">*</span></label>
              <input class="form-control" id="nameInput" name="name" type="text" placeholder="Your full name" autocomplete="name" required>
              <span class="field-error" id="nameErr"></span>
            </div>
            <div class="form-group">
              <label class="form-label" for="emailInput"><i class="fas fa-envelope"></i> Email <span style="color:var(--clr-red)">*</span></label>
              <input class="form-control" id="emailInput" name="email" type="email" placeholder="your@email.com" autocomplete="email" required>
              <span class="field-error" id="emailErr"></span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="subjectInput"><i class="fas fa-tag"></i> Subject <span style="color:var(--clr-red)">*</span></label>
            <input class="form-control" id="subjectInput" name="subject" type="text" placeholder="What is this about?" required>
            <span class="field-error" id="subjectErr"></span>
          </div>

          <div class="form-group">
            <label class="form-label" for="messageInput"><i class="fas fa-comment-alt"></i> Message <span style="color:var(--clr-red)">*</span></label>
            <textarea class="form-control" id="messageInput" name="message" placeholder="Write your message here…" required></textarea>
            <span class="field-error" id="messageErr"></span>
          </div>

          <div id="formGlobalErr" class="field-error" style="margin-bottom:10px;"></div>

          <button type="submit" class="btn btn-primary" style="width:100%;" id="submitBtn">
            <i class="fas fa-paper-plane"></i> Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
  `;

  const form       = el.querySelector('#contactForm');
  const submitBtn  = el.querySelector('#submitBtn');
  const successDiv = el.querySelector('#successScreen');
  const resetBtn   = el.querySelector('#resetFormBtn');

  const fields = { name:'nameErr', email:'emailErr', subject:'subjectErr', message:'messageErr' };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const data = {
      name:    form.querySelector('#nameInput').value.trim(),
      email:   form.querySelector('#emailInput').value.trim(),
      subject: form.querySelector('#subjectInput').value.trim(),
      message: form.querySelector('#messageInput').value.trim(),
      website: form.querySelector('#website').value,
    };

    let valid = true;
    if (!data.name)    { showErr('nameErr',    'Name is required.');          valid = false; }
    if (!data.email)   { showErr('emailErr',   'Email is required.');         valid = false; }
    if (!data.subject) { showErr('subjectErr', 'Subject is required.');       valid = false; }
    if (!data.message) { showErr('messageErr', 'Message is required.');       valid = false; }
    if (data.message.length < 20) { showErr('messageErr','At least 20 characters.'); valid = false; }
    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px;margin:0 8px 0 0;animation:spin .6s linear infinite;"></span> Sending…';

    try {
      await API.sendContact(data);
      form.style.display = 'none';
      successDiv.style.display = 'block';
    } catch (err) {
      const errors = err.data?.errors || err.data || {};
      if (typeof errors === 'object') {
        Object.entries(errors).forEach(([field, msgs]) => {
          const errId = fields[field];
          if (errId) showErr(errId, Array.isArray(msgs) ? msgs[0] : msgs);
        });
      } else {
        el.querySelector('#formGlobalErr').textContent = 'Something went wrong. Please try again.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  });

  resetBtn?.addEventListener('click', () => { form.reset(); form.style.display = 'block'; successDiv.style.display = 'none'; });

  function showErr(id, msg) { const span = el.querySelector(`#${id}`); if (span) { span.textContent = msg; } const input = el.querySelector(`#${id.replace('Err','Input')}`); if (input) input.classList.add('error'); }
  function clearErrors() { el.querySelectorAll('.field-error').forEach(e => e.textContent = ''); el.querySelectorAll('.form-control').forEach(e => e.classList.remove('error')); }
}
