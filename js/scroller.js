(function () {
  document.querySelectorAll('[data-scroller]').forEach(function (wrap) {
    var track = wrap.querySelector('.scroller'); var prev = wrap.querySelector('[data-prev]'); var next = wrap.querySelector('[data-next]');
    if (!track || !prev || !next) return;
    var reduce = matchMedia('(prefers-reduced-motion:reduce)');
    function step() { var c = track.querySelector('.cat-card'); return c ? c.getBoundingClientRect().width + 16 : 300; }
    function upd() { prev.disabled = track.scrollLeft <= 2; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduce.matches ? 'auto' : 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduce.matches ? 'auto' : 'smooth' }); });
    track.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
  });
})();
