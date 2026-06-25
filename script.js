// ===== LOGIN PAGE =====
const API_URL = "https://script.google.com/macros/s/AKfycbzMZVV93BH3d_aL1uADw5Whj_bYIXoZn8_2acT9g5HLRHKTuO_rFCUEoV4aa4XPFMNTMg/exec";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(e){
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const btn = loginForm.querySelector("button");
  btn.textContent = "Authenticating...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.status === "success") {

      // SESSION SECURITY
      const session = {
        username: data.username,
        role: data.role,
        token: data.token,
        loginTime: Date.now()
      };

      localStorage.setItem("intel_session", JSON.stringify(session));

      btn.textContent = "Access Granted";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);

    } else {
      btn.textContent = "Access Denied";
      btn.style.background = "#8B0000";

      setTimeout(() => {
        btn.textContent = "Masuk ke Sistem Intelijen";
        btn.style.background = "#0B3D2E";
      }, 1500);
    }

  } catch (err) {
    btn.textContent = "Server Error";
    console.error(err);
  }
});

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
const session = JSON.parse(localStorage.getItem("intel_session"));

if (!session || !session.token) {
  window.location.href = "index.html";
}
const session = JSON.parse(localStorage.getItem("intel_session"));

if (session) {
  const now = Date.now();
  const maxTime = 60 * 60 * 1000; // 1 jam

  if (now - session.loginTime > maxTime) {
    localStorage.removeItem("intel_session");
    alert("Session expired");
    window.location.href = "index.html";
  }
}
const session = JSON.parse(localStorage.getItem("intel_session"));

if (session.role === "admin") {
  console.log("Full Access Dashboard");
}

if (session.role === "intel") {
  console.log("Intel Access");
}

if (session.role === "viewer") {
  console.log("Read Only Mode");
}
