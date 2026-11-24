/* Marks today's row in every hours table. Without JS the full table still shows. */
(function () {
  var dow = new Date().getDay();
  document.querySelectorAll('.hours tr[data-dow]').forEach(function (tr) {
    if (+tr.getAttribute('data-dow') !== dow) return;
    tr.setAttribute('aria-current', 'date');
    var th = tr.querySelector('th');
    var s = document.createElement('span'); s.className = 'today'; s.textContent = 'Tänään';
    th.appendChild(s);
  });
})();
