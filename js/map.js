/* Loads the Google Maps iframe only on click (no third-party cookies on page load). */
(function () {
  document.querySelectorAll('[data-map]').forEach(function (box) {
    var b = box.querySelector('button'); if (!b) return;
    b.addEventListener('click', function () {
      var f = document.createElement('iframe'); f.src = box.getAttribute('data-map'); f.title = 'Kartta: Royal Masala, Oksasenkatu 1, Lappeenranta';
      f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; box.textContent = ''; box.appendChild(f);
    });
  });
})();
