/* Header state, animated mobile menu, floating buttons. Design.md sections 7 and 8. */
(function () {
  var root = document.documentElement;
  var header = document.querySelector('.site-header');
  var sentinel = document.querySelector('.sentinel');
  var btn = document.querySelector('.menu-btn');
  var sheet = document.getElementById('mobile-nav');
  var scrim = document.querySelector('.scrim');
  var floats = document.querySelectorAll('.floating');
  var footer = document.querySelector('.site-footer');
  var inertEls = document.querySelectorAll('main, .site-footer, .floating, .site-header');
  var closeBtn = sheet && sheet.querySelector('.sheet-close');
  var desktop = window.matchMedia('(min-width:1024px)');
  var menuOpen = false, footerVisible = false;

  if (sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { header.classList.toggle('is-scrolled', !e[0].isIntersecting); }).observe(sentinel);
  }
  function syncFloats() {
    floats.forEach(function (f) { f.classList.toggle('is-hidden', menuOpen || footerVisible); });
  }
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { footerVisible = e[0].isIntersecting; syncFloats(); }).observe(footer);
  }
  if (!btn || !sheet) return;

  function setInert(on) { inertEls.forEach(function (el) { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); }); }
  function open() {
    if (menuOpen) return; menuOpen = true;
    root.classList.add('sheet-open');
    btn.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-label', 'Sulje valikko');
    setInert(true); syncFloats();
    var first = sheet.querySelector('a'); if (first) first.focus({ preventScroll: true });
  }
  function close(restore) {
    if (!menuOpen) return; menuOpen = false;
    root.classList.remove('sheet-open');
    btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Avaa valikko');
    setInert(false); syncFloats();
    if (restore !== false) btn.focus({ preventScroll: true });
  }
  btn.addEventListener('click', function () { menuOpen ? close() : open(); });
  scrim.addEventListener('click', function () { close(); });
  if (closeBtn) closeBtn.addEventListener('click', function () { close(); });
  sheet.addEventListener('click', function (e) { if (e.target.closest('a')) close(false); });
  document.addEventListener('keydown', function (e) {
    if (!menuOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    var items = Array.prototype.slice.call(sheet.querySelectorAll('a[href],button'));
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  window.addEventListener('hashchange', function () { close(false); });
  (desktop.addEventListener ? desktop.addEventListener.bind(desktop, 'change') : desktop.addListener.bind(desktop))(function (e) { if (e.matches) close(false); });
})();
