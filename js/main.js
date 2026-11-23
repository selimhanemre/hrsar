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

  /* ---------- Estimate form — mailto: prefill ----------------------------
     The form opens the visitor's own email app with a prefilled request.

     ★ SWAP POINT (GoHighLevel): the owner is replacing this mailto flow
       with a GoHighLevel form later. When that happens:
       1. set FORM_EMAIL / the handler below aside, and
       2. give <form id="book-form"> an action="https://…gohighlevel endpoint…"
           method="post" with the field names GH Level expects.
     Everything else on this page keeps working unchanged.
     -------------------------------------------------------------------- */
  var FORM_EMAIL = 'selimhan.dagtas@gmail.com';

  var form = doc.getElementById('book-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var val = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el ? el.value.trim() : '';
      };
      var label = function (n) {
        var sel = form.querySelector('[name="' + n + '"]');
        return sel && sel.options ? sel.options[sel.selectedIndex].text : '';
      };

      var name = val('name');
      var phone = val('phone');
      var email = val('email');
      var business = val('business');
      var message = val('message');

      var subject = 'Free estimate request' + (name ? ' — ' + name : '');
      var lines = [
        'Name: ' + name,
        'Phone: ' + phone,
        email ? 'Email: ' + email : '',
        business ? 'Business: ' + business : '',
        'What needs attention: ' + label('service'),
        'Best time for a callback: ' + label('timing'),
        '',
        'Notes:',
        message || '(none)'
      ];
      var href = 'mailto:' + FORM_EMAIL + '?' + new URLSearchParams({
        subject: subject,
        body: lines.join('\r\n')
      }).toString();

      window.location.href = href;

      var success = doc.getElementById('form-success');
      if (success) {
        form.style.display = 'none';
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    var backBtn = doc.getElementById('form-back');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        var success = doc.getElementById('form-success');
        if (success) success.classList.remove('show');
        form.style.display = '';
        form.querySelector('[name="name"]').focus();
      });
    }
  }

  /* ---------- Year ---------- */
  var yr = doc.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
