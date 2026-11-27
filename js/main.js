/* HRS Commercial HVAC & Refrigeration — progressive enhancement. No frameworks. */
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
  var mainEl = doc.querySelector('main');
  var footerEl = doc.querySelector('footer');
  if (navToggle) {
    var setBackgroundInert = function (state) {
      if (mainEl) mainEl.inert = state;
      if (footerEl) footerEl.inert = state;
    };
    var open = function () {
      doc.body.classList.add('nav-open');
      navToggle.setAttribute('aria-expanded', 'true');
      setBackgroundInert(true);
      var first = doc.querySelector('.nav a');
      if (first) first.focus();
    };
    var close = function () {
      var wasOpen = doc.body.classList.contains('nav-open');
      doc.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      setBackgroundInert(false);
      if (wasOpen) navToggle.focus();
    };
    navToggle.addEventListener('click', open);
    if (navClose) navClose.addEventListener('click', close);
    doc.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        doc.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        setBackgroundInert(false);
      });
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && doc.body.classList.contains('nav-open')) close();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = Array.prototype.slice.call(doc.querySelectorAll('.reveal'));
  if (!prefersReduced && reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
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

      var subject = 'Commercial estimate request' + (business ? ' — ' + business : (name ? ' — ' + name : ''));
      var lines = [
        'Name: ' + name,
        'Phone: ' + phone,
        email ? 'Email: ' + email : '',
        business ? 'Business / Facility: ' + business : '',
        'What needs attention: ' + label('service'),
        'Best time for a callback: ' + label('timing'),
        '',
        'Notes:',
        message || '(none)'
      ];
      var href = 'mailto:' + FORM_EMAIL + '?' + new URLSearchParams({
        subject: subject,
        body: lines.filter(function (l, idx) { return l !== '' || idx === 6; }).join('\r\n')
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

  /* ---------- Hero quick estimate form — mailto: prefill ---------- */
  var heroForm = doc.getElementById('hero-estimate-form');
  if (heroForm) {
    var heroSuccess = doc.getElementById('hero-form-success');
    var heroBack = doc.getElementById('hero-form-back');

    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!heroForm.reportValidity()) {
        var firstInvalid = heroForm.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var hName = heroForm.querySelector('[name="name"]').value.trim();
      var hPhone = heroForm.querySelector('[name="phone"]').value.trim();
      var hServiceEl = heroForm.querySelector('[name="service"]');
      var hService = hServiceEl ? hServiceEl.value : '';

      var lines = [
        'Name / Business: ' + hName,
        'Phone: ' + hPhone,
        'System / Service: ' + hService
      ];

      window.location.href = 'mailto:' + FORM_EMAIL + '?' + new URLSearchParams({
        subject: 'Free Commercial Estimate — ' + hName,
        body: lines.join('\r\n')
      }).toString();

      if (heroSuccess) {
        heroForm.hidden = true;
        heroSuccess.hidden = false;
      }
    });

    if (heroBack) {
      heroBack.addEventListener('click', function () {
        if (heroSuccess) heroSuccess.hidden = true;
        heroForm.hidden = false;
        heroForm.querySelector('[name="name"]').focus();
      });
    }
  }

  /* ---------- Mobile horizontal swipe carousels ---------- */
  var carousels = doc.querySelectorAll('[data-mobile-carousel]');
  if (carousels.length) {
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    carousels.forEach(function (wrap) {
      var track = wrap.querySelector('.carousel-track-mobile');
      var markersNav = wrap.querySelector('.carousel-markers');
      var prevBtn = wrap.querySelector('[data-direction="previous"]');
      var nextBtn = wrap.querySelector('[data-direction="next"]');
      var statusEl = wrap.querySelector('[role="status"]');
      if (!track || !markersNav) return;

      var slides = Array.prototype.slice.call(track.children);
      if (!slides.length) return;

      var markers = slides.map(function (slide, idx) {
        var btn = doc.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', slide.getAttribute('data-marker-name') || ('Slide ' + (idx + 1)));
        if (idx === 0) btn.setAttribute('aria-current', 'true');
        btn.addEventListener('click', function () {
          scrollToSlide(idx);
        });
        markersNav.appendChild(btn);
        return btn;
      });

      var currentIdx = 0;
      var lastSettledIdx = 0;
      var scrollRaf = null;
      var settleTimer = null;

      function nearestIndex() {
        var trackLeft = track.scrollLeft;
        var bestIdx = 0;
        var bestDist = Infinity;
        slides.forEach(function (slide, idx) {
          var dist = Math.abs(slide.offsetLeft - track.offsetLeft - trackLeft);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        });
        return bestIdx;
      }

      function syncMarkers(idx) {
        if (idx === currentIdx) return;
        currentIdx = idx;
        markers.forEach(function (m, i) {
          if (i === idx) m.setAttribute('aria-current', 'true');
          else m.removeAttribute('aria-current');
        });
      }

      function scrollToSlide(idx) {
        var targetIdx = (idx + slides.length) % slides.length;
        syncMarkers(targetIdx);
        var left = slides[targetIdx].offsetLeft - track.offsetLeft;
        track.scrollTo({
          left: left,
          behavior: reducedMotion ? 'auto' : 'smooth'
        });
      }

      function onSettled() {
        var idx = nearestIndex();
        syncMarkers(idx);
        if (idx !== lastSettledIdx) {
          lastSettledIdx = idx;
          if (statusEl) {
            statusEl.textContent = 'Slide ' + (idx + 1) + ' of ' + slides.length;
          }
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          scrollToSlide(nearestIndex() - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          scrollToSlide(nearestIndex() + 1);
        });
      }

      track.addEventListener('scroll', function () {
        if (!scrollRaf) {
          scrollRaf = window.requestAnimationFrame(function () {
            scrollRaf = null;
            syncMarkers(nearestIndex());
          });
        }
        if (!('onscrollend' in window)) {
          clearTimeout(settleTimer);
          settleTimer = setTimeout(onSettled, 120);
        }
      }, { passive: true });

      if ('onscrollend' in window) {
        track.addEventListener('scrollend', onSettled, { passive: true });
      }
    });
  }

  /* ---------- Year ---------- */
  var yr = doc.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
