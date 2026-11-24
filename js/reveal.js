/* Scroll reveal: once, via IntersectionObserver. Styles apply only when html has .js. */
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in'); io.unobserve(en.target);
      en.target.addEventListener('transitionend', function () { en.target.style.willChange = 'auto'; }, { once: true });
    });
  }, { threshold: .15, rootMargin: '0px 0px -10% 0px' });
  els.forEach(function (e) { e.style.willChange = 'transform, opacity'; io.observe(e); });
})();
