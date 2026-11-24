<?php
// Reservation handler. Needs PHP mail() on the host. Recipient comes from content/business.json (copied here by hand).
$to = 'ravintolaroyalmasala@gmail.com';
$from = 'noreply@royalmasala.fi';
function clean($s){ return trim(str_replace(["\r","\n"], ' ', (string)$s)); }
function back($q){ header('Location: index.html?' . $q, true, 303); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') back('virhe=1');
if (!empty($_POST['yritys'])) back('lahetetty=1');            // honeypot: pretend success
$nimi = clean($_POST['nimi'] ?? ''); $email = clean($_POST['email'] ?? ''); $tel = clean($_POST['puhelin'] ?? '');
$pvm = clean($_POST['pvm'] ?? ''); $aika = clean($_POST['aika'] ?? ''); $hlo = (int)($_POST['henkilot'] ?? 0);
$toiv = trim(substr((string)($_POST['toiveet'] ?? ''), 0, 2000));
$d = DateTime::createFromFormat('Y-m-d', $pvm);
if (strlen($nimi) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen(preg_replace('/\D/', '', $tel)) < 6
    || !$d || $d->format('Y-m-d') !== $pvm || $d->format('w') === '0' || !preg_match('/^\d{2}:\d{2}$/', $aika) || $hlo < 1 || $hlo > 200) back('virhe=1');
$body = "Nimi: $nimi\nSähköposti: $email\nPuhelin: $tel\nPäivä: $pvm\nAika: $aika\nHenkilömäärä: $hlo\nErityistoiveet: $toiv\n";
$headers = "From: Royal Masala <$from>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";
$ok = mail($to, '=?UTF-8?B?' . base64_encode("[$nimi] Pöytävaraus") . '?=', $body, $headers);
back($ok ? 'lahetetty=1' : 'virhe=1');
