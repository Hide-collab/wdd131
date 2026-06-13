// nav.js — Zimbabwe Travel & Culture Guide
// Handles mobile navigation toggle and active page link highlighting.

document.addEventListener("DOMContentLoaded", function () {

  // ── Mobile nav toggle ─────────────────────────────────────
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on outside click
    document.addEventListener("click", function (e) {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── Mark active page link ─────────────────────────────────
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  // ── Footer: current year ──────────────────────────────────
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});