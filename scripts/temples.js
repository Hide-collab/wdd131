/**
 * temples.js
 * Handles:
 *  1. Footer — dynamic copyright year & last modified date
 *  2. Hamburger menu toggle (mobile only)
 */

// ─── 1. Footer dynamic content

const yearSpan = document.getElementById('current-year');
const modSpan  = document.getElementById('last-modified');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (modSpan) {
  modSpan.textContent = document.lastModified;
}

// ─── 2. Hamburger menu toggle ─────────────────────────────────────────────────

const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');
const hamIcon   = hamburger ? hamburger.querySelector('.ham-icon') : null;

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');

    // Swap icon: ☰ open / ✕ close
    if (hamIcon) {
      hamIcon.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    }

    // Update accessibility attribute
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav when a link is tapped (good UX on mobile)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      if (hamIcon) hamIcon.innerHTML = '&#9776;';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}