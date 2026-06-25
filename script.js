// ===== LOGIN PAGE =====
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data Member");
  const data = sheet.getDataRange().getValues();

  const req = JSON.parse(e.postData.contents);
  const username = req.username;
  const password = req.password;

  for (let i = 1; i < data.length; i++) {
    const user = data[i][0];
    const pass = data[i][1];

    if (user === username && pass === password) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "success",
          username: user
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      status: "failed"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===== DASHBOARD PAGE =====
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');
const titles = {
  kinerja: 'Capaian Kinerja Intelijen',
  aplikasi: 'Aplikasi Intelijen',
  pusatdata: 'Pusat Data Intelijen',
  laporan: 'Laporan Otomatis'
};

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-target');
    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    pages.forEach(p => p.classList.remove('active'));
    const el = document.getElementById(target);
    if (el) el.classList.add('active');
    if (pageTitle && titles[target]) pageTitle.textContent = titles[target];
    document.querySelector('.sidebar')?.classList.remove('open');
  });
});

const burger = document.getElementById('burger');
if (burger) {
  burger.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
  });
}

// Date chip
const dateChip = document.getElementById('dateChip');
if (dateChip) {
  const now = new Date();
  dateChip.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const btn = loginForm.querySelector('.btn-primary span');
  const btnParent = loginForm.querySelector('.btn-primary');

  btn.textContent = 'Memverifikasi identitas...';
  btnParent.style.opacity = "0.85";

  setTimeout(() => {
    btn.textContent = 'Autentikasi berhasil';
    btnParent.style.background = "#155A41";

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 600);
  }, 1200);
});
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {

    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    togglePassword.textContent = isPassword ? "🙈" : "👁";
  });
}
