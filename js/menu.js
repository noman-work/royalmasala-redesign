/* Active category chip follows scroll position. */
(function () {
  var bar = document.querySelector('.chips-inner'); if (!bar || !('IntersectionObserver' in window)) return;
  var chips = bar.querySelectorAll('.chip'); var cats = document.querySelectorAll('.menu-cat');
  var by = {}; chips.forEach(function (c) { by[c.getAttribute('href').slice(1)] = c; });
  function set(id) {
    chips.forEach(function (c) { c.removeAttribute('aria-current'); });
    var c = by[id]; if (!c) return; c.setAttribute('aria-current', 'true');
    bar.scrollTo({ left: c.offsetLeft - (bar.clientWidth - c.offsetWidth) / 2, behavior: 'auto' });
  }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) set(e.target.id); }); },
    { rootMargin: '-' + (document.querySelector('.site-header').offsetHeight + 72) + 'px 0px -60% 0px' });
  cats.forEach(function (c) { io.observe(c); });
})();
