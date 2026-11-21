/* HRS demo site — progressive enhancement, ~3KB. No frameworks. */
(function () {
  'use strict';

  var doc = document;

  /* ---------- Sticky header shadow ---------- */
  var header = doc.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = doc.querySelector('.nav-toggle');
  var navClose = doc.querySelector('.nav-close');
  if (navToggle) {
    var open = function () {
      doc.body.classList.add('nav-open');
      navToggle.setAttribute('aria-expanded', 'true');
      var first = doc.querySelector('.nav a');
      if (first) first.focus();
    };
    var close = function () {
      doc.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    navToggle.addEventListener('click', open);
    if (navClose) navClose.addEventListener('click', close);
    doc.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && doc.body.classList.contains('nav-open')) close();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(doc.querySelectorAll('.reveal'));
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Estimate form (demo, front-end only) ---------- */
  var form = doc.getElementById('book-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var panel = form.closest('.form-panel') || form.parentElement;
      var success = doc.getElementById('form-success');
      if (success) {
        var phoneEl = form.querySelector('[name="phone"]');
        if (phoneEl && phoneEl.value) {
          var span = success.querySelector('strong[data-echo]');
          if (span) span.textContent = phoneEl.value.trim();
        }
        form.style.display = 'none';
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ---------- Year ---------- */
  var yr = doc.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
