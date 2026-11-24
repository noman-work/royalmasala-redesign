/* Daily lunch tabs (Design.md 6.8). Panels are plain content without JS. */
(function () {
  var days = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
  document.querySelectorAll('[data-lunch]').forEach(function (box, n) {
    var list = box.querySelector('.tabs'); var panels = box.querySelectorAll('.panel[data-dow]');
    var now = new Date(); var today = now.getDay();
    var order = []; // today .. Sunday
    for (var i = 0; i < 7; i++) { var d = (today + i) % 7; order.push(d); if (d === 0) break; }
    list.setAttribute('role', 'tablist'); list.setAttribute('aria-label', 'Lounaslista päivittäin');
    var tabs = [];
    panels.forEach(function (p) { p.hidden = true; p.setAttribute('role', 'tabpanel'); p.tabIndex = 0; });
    order.forEach(function (dow, k) {
      var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + k);
      var p = box.querySelector('.panel[data-dow="' + dow + '"]'); if (!p) return;
      var id = 'lt' + n + '-' + dow;
      var t = document.createElement('button'); t.type = 'button'; t.className = 'tab'; t.id = id; t.setAttribute('role', 'tab');
      t.setAttribute('aria-controls', id + 'p'); t.setAttribute('aria-selected', 'false'); t.tabIndex = -1;
      t.innerHTML = days[dow] + ' <small>' + date.getDate() + '.' + (date.getMonth() + 1) + '.</small>';
      p.id = id + 'p'; p.setAttribute('aria-labelledby', id);
      var meta = p.querySelector('.date-slot'); if (meta) meta.textContent = days[dow] + ' ' + date.getDate() + '.' + (date.getMonth() + 1) + '.';
      list.appendChild(t); tabs.push({ t: t, p: p });
    });
    function select(i, focus) {
      tabs.forEach(function (o, k) { var on = k === i; o.t.setAttribute('aria-selected', on); o.t.tabIndex = on ? 0 : -1; o.p.hidden = !on; });
      if (focus) tabs[i].t.focus();
      tabs[i].t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' });
    }
    tabs.forEach(function (o, i) {
      o.t.addEventListener('click', function () { select(i); });
      o.t.addEventListener('keydown', function (e) {
        var k = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
        if (k !== undefined) { e.preventDefault(); select(k, true); }
      });
    });
    // days without a panel at all are not shown; initial scroll must not move the page
    tabs.forEach(function (o, k) { o.t.setAttribute('aria-selected', k === 0); o.t.tabIndex = k === 0 ? 0 : -1; o.p.hidden = k !== 0; });
    list.scrollLeft = 0;
  });
})();
