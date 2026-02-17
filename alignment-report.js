/* ============================================
   DESN 374 × DOL AI Literacy Framework
   Alignment Report — JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     Toggle individual collapsible sections
     ------------------------------------------ */
  function toggleArea(header) {
    var area = header.closest('.content-area');
    if (!area) return;
    area.classList.toggle('open');
  }

  // Attach click handlers to all content-area headers
  document.querySelectorAll('.content-area-header').forEach(function (header) {
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.addEventListener('click', function () { toggleArea(header); });
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleArea(header);
      }
    });
  });

  /* ------------------------------------------
     Expand All / Collapse All buttons
     ------------------------------------------ */
  document.querySelectorAll('.toggle-all-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var section = btn.closest('.alignment-section');
      if (!section) return;

      var areas = section.querySelectorAll('.content-area');
      var allOpen = Array.from(areas).every(function (a) { return a.classList.contains('open'); });

      areas.forEach(function (a) {
        if (allOpen) {
          a.classList.remove('open');
        } else {
          a.classList.add('open');
        }
      });

      btn.textContent = allOpen ? 'Expand All' : 'Collapse All';
    });
  });

  /* ------------------------------------------
     Scroll-reveal animation (IntersectionObserver)
     ------------------------------------------ */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: make everything visible immediately
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  initScrollReveal();

  /* ------------------------------------------
     Scroll-to-top button
     ------------------------------------------ */
  var scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------
     Open all sections before printing
     ------------------------------------------ */
  window.addEventListener('beforeprint', function () {
    document.querySelectorAll('.content-area').forEach(function (el) {
      el.classList.add('open');
    });
  });

})();
