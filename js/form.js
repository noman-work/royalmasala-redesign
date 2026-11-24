/* Reservation form: inline validation, focus to message. Server-side validation is in submit.php. */
(function () {
  var form = document.getElementById('res-form'); if (!form) return;
  var ok = document.getElementById('msg-ok'), bad = document.getElementById('msg-err');
  var q = location.search;
  function show(m) { m.hidden = false; m.focus(); }
  if (/lahetetty=1/.test(q)) { show(ok); form.hidden = true; }
  else if (/virhe=1/.test(q)) show(bad);
  var date = form.elements.pvm; if (date) { var t = new Date(); date.min = t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2); }
  var rules = {
    nimi: function (v) { return v.trim().length < 2 ? 'Kirjoita nimesi.' : ''; },
    email: function (v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? '' : 'Kirjoita sähköpostiosoite muodossa nimi@esimerkki.fi.'; },
    puhelin: function (v) { return v.replace(/[^\d]/g, '').length < 6 ? 'Kirjoita puhelinnumerosi.' : ''; },
    pvm: function (v) { if (!v) return 'Valitse päivämäärä.'; var d = new Date(v + 'T12:00:00'); return d.getDay() === 0 ? 'Sunnuntaille ei voi varata lomakkeella. Soita meille.' : ''; },
    aika: function (v) { return v ? '' : 'Valitse kellonaika.'; },
    henkilot: function (v) { return +v >= 1 ? '' : 'Kirjoita henkilömäärä (vähintään 1).'; }
  };
  function check(el) {
    var f = el.closest('.field'); var e = f.querySelector('.err'); var m = rules[el.name] ? rules[el.name](el.value) : '';
    f.classList.toggle('invalid', !!m); e.textContent = m;
    if (m) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
    return !m;
  }
  Object.keys(rules).forEach(function (n) { var el = form.elements[n]; if (el) el.addEventListener('blur', function () { check(el); }); });
  form.addEventListener('submit', function (e) {
    var first = null;
    Object.keys(rules).forEach(function (n) { var el = form.elements[n]; if (el && !check(el) && !first) first = el; });
    if (first) { e.preventDefault(); first.focus(); }
  });
})();
