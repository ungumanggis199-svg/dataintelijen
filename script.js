
// ===============================
// CONFIG
// ===============================
const API_URL = "https://script.google.com/macros/s/AKfycbzMZVV93BH3d_aL1uADw5Whj_bYIXoZn8_2acT9g5HLRHKTuO_rFCUEoV4aa4XPFMNTMg/exec";

// ===============================
// INIT SAFE
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {

    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    // ===============================
    // PASSWORD TOGGLE FIX
    // ===============================
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener("click", () => {
        const isHidden = passwordInput.type === "password";
        passwordInput.type = isHidden ? "text" : "password";
        togglePassword.textContent = isHidden ? "🙈" : "👁";
      });
    }

    // ===============================
    // LOGIN SUBMIT
    // ===============================
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const btn = loginForm.querySelector("button");

      btn.textContent = "Authenticating...";
      btn.disabled = true;

      try {

        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        });

        // ===============================
        // CHECK HTTP STATUS
        // ===============================
        if (!res.ok) {
          throw new Error("HTTP Error: " + res.status);
        }

        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          throw new Error("Response bukan JSON: " + text);
        }

        // ===============================
        // LOGIN SUCCESS
        // ===============================
        if (data.status === "success") {

          localStorage.setItem("intel_session", JSON.stringify({
            username: data.username,
            role: data.role,
            token: data.token,
            loginTime: Date.now()
          }));

          btn.textContent = "Access Granted";

          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 800);

        }

        // ===============================
        // LOGIN FAILED
        // ===============================
        else {
          btn.textContent = "Access Denied";
          btn.style.background = "#8B0000";

          setTimeout(() => {
            btn.textContent = "Masuk ke Sistem Intelijen";
            btn.disabled = false;
            btn.style.background = "#0B3D2E";
          }, 1500);
        }

      } catch (err) {

        console.error("LOGIN ERROR:", err);

        btn.textContent = "Server Error";
        btn.style.background = "#8B0000";

        setTimeout(() => {
          btn.textContent = "Masuk ke Sistem Intelijen";
          btn.disabled = false;
          btn.style.background = "#0B3D2E";
        }, 2000);
      }

    });
  }

  // ===============================
  // DASHBOARD PROTECTION
  // ===============================
  if (window.location.pathname.includes("dashboard")) {

    const session = JSON.parse(localStorage.getItem("intel_session"));

    if (!session || !session.token) {
      window.location.href = "index.html";
    }
  }

});

// ===============================
// DASHBOARD MENU
// ===============================
function showPage(id){

  const pages = document.querySelectorAll(".page");
  const menus = document.querySelectorAll(".menu");

  pages.forEach(p => p.classList.remove("active"));
  menus.forEach(m => m.classList.remove("active"));

  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

// ===============================
// LOGOUT
// ===============================
function logout(){
  localStorage.removeItem("intel_session");
  window.location.href = "index.html";
}
