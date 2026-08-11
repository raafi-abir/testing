// UI/UX Pro Max Interactive Scripts

// Terminal Tab Content Data
const terminalData = {
  skills: `> cat skills.txt
- Electrical Engineering: Circuit Analysis, Semiconductor Devices, KVL/KCL, Laplace Transform
- Programming: C (beginner), Python (beginner), Shell Scripting
- Operating Systems: Linux System Tuning, Kernel Exploration, Arch/Debian Config
- Mathematics: Differential Equations, Linear Algebra, Signal Concepts`,
  courses: `> cat courses.txt
- EEE 201: Circuit Analysis II
- EEE 203: Semiconductor Devices & Physics
- MATH 201: Differential Equations & Laplace Transform
- PHY 102: Engineering Physics Laboratory`,
  specs: `> cat specs.txt
- University: University of Asia Pacific (UAP), Dhaka
- Degree: B.Sc. in Electrical and Electronics Engineering
- Academic Year: 2nd Year Undergraduate
- Primary Focus: Microelectronics & Physical Electronics`,
  contact: `> cat contact.txt
- Email: raafiqulhasan756@gmail.com
- GitHub: github.com/raafi-abir
- LinkedIn: linkedin.com/in/raafiqul-hasan
- Location: Dhaka, Bangladesh`
};

// Global Theme Management
function setTheme(theme) {
  const html = document.documentElement;
  const body = document.body;
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  html.classList.remove('dark-mode', 'light-mode');
  body.classList.remove('dark-mode', 'light-mode');
  html.classList.add(`${theme}-mode`);
  body.classList.add(`${theme}-mode`);
  html.setAttribute('data-theme', theme);

  if (sunIcon && moonIcon) {
    sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
    moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
  }
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

// Mobile Menu Navigation
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
    }
  });
}

// Scroll Progress & Back-to-Top Floating Button
function initScrollIndicators() {
  const progress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;

    if (progress) progress.style.width = `${scrolled}%`;
    if (backToTop) {
      if (scrollTop > 300) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Terminal Interactive Tab Switcher & Typing Effect
let typingTimer = null;

function typeTerminalText(text) {
  const outputEl = document.getElementById('terminal-output');
  if (!outputEl) return;

  if (typingTimer) clearInterval(typingTimer);
  outputEl.textContent = '';
  let index = 0;

  typingTimer = setInterval(() => {
    if (index < text.length) {
      outputEl.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typingTimer);
    }
  }, 12);
}

function initTerminalTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const tabKey = btn.getAttribute('data-tab');
      if (terminalData[tabKey]) {
        typeTerminalText(terminalData[tabKey]);
      }
    });
  });

  // Default initial load
  typeTerminalText(terminalData.skills);
}

// Interactive Project Category Filter
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

// Interactive Diode Circuit Playground Simulator (Canvas & Math)
function initDiodeSimulator() {
  const canvas = document.getElementById('diodeCanvas');
  const slider = document.getElementById('voltageSlider');
  const voltVal = document.getElementById('voltageValue');
  const currVal = document.getElementById('currentValue');
  const stateVal = document.getElementById('diodeState');
  const typeSelect = document.getElementById('diodeTypeSelect');

  if (!canvas || !slider) return;

  const ctx = canvas.getContext('2d');

  function calculateDiodeState(v, type) {
    let current = 0;
    let state = 'Reverse Cut-off';

    const vt = 0.026; // Thermal voltage ~26mV
    const n = 1.2;

    if (type === 'rectifier') {
      if (v > 0.6) {
        current = 0.001 * (Math.exp((v - 0.6) / (n * vt)) - 1);
        state = 'Forward Conduction';
      } else if (v < -50) {
        current = -0.05;
        state = 'Reverse Breakdown';
      } else {
        current = 1e-9;
        state = 'Reverse Cut-off';
      }
    } else { // Zener Diode
      if (v > 0.6) {
        current = 0.001 * (Math.exp((v - 0.6) / (n * vt)) - 1);
        state = 'Forward Conduction';
      } else if (v < -5.1) {
        current = -0.015 * Math.pow(Math.abs(v) - 5.1, 1.5);
        state = 'Zener Breakdown (Regulating)';
      } else {
        current = -1e-6;
        state = 'Reverse Blocking';
      }
    }

    return { current: Math.max(-0.1, Math.min(0.1, current)), state };
  }

  function drawIVCurve(voltage, type) {
    const w = canvas.width = canvas.parentElement.clientWidth || 340;
    const h = canvas.height = 200;

    ctx.clearRect(0, 0, w, h);

    // Axes
    const cx = w / 2;
    const cy = h / 2 + 20;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;

    // X Axis (Voltage)
    ctx.beginPath();
    ctx.moveTo(10, cy);
    ctx.lineTo(w - 10, cy);
    ctx.stroke();

    // Y Axis (Current)
    ctx.beginPath();
    ctx.moveTo(cx, 10);
    ctx.lineTo(cx, h - 10);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('+V', w - 25, cy - 6);
    ctx.fillText('-V', 15, cy - 6);
    ctx.fillText('+I', cx + 6, 20);
    ctx.fillText('-I', cx + 6, h - 15);

    // Plot Curve
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    let operatingX = cx;
    let operatingY = cy;

    for (let xPixel = 10; xPixel < w - 10; xPixel += 2) {
      const vVal = ((xPixel - cx) / (w / 2)) * 10; // -10V to +10V
      const { current } = calculateDiodeState(vVal, type);
      const yPixel = cy - (current / 0.05) * (cy - 20);

      if (xPixel === 10) ctx.moveTo(xPixel, yPixel);
      else ctx.lineTo(xPixel, yPixel);

      if (Math.abs(vVal - voltage) < 0.15) {
        operatingX = xPixel;
        operatingY = yPixel;
      }
    }
    ctx.stroke();

    // Highlight Operating Point
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(operatingX, operatingY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function updateSimulator() {
    const v = parseFloat(slider.value);
    const type = typeSelect ? typeSelect.value : 'zener';
    const { current, state } = calculateDiodeState(v, type);

    if (voltVal) voltVal.textContent = `${v.toFixed(2)} V`;
    if (currVal) currVal.textContent = `${(current * 1000).toFixed(2)} mA`;
    if (stateVal) stateVal.textContent = state;

    drawIVCurve(v, type);
  }

  slider.addEventListener('input', updateSimulator);
  if (typeSelect) typeSelect.addEventListener('change', updateSimulator);

  window.addEventListener('resize', updateSimulator);
  updateSimulator();
}

// Intersection Observer for Reveal Animations & Progress Fill
function initScrollObserver() {
  const reveals = document.querySelectorAll('.reveal');
  const progressFills = document.querySelectorAll('.progress-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Fill progress bars inside card
        const fills = entry.target.querySelectorAll('.progress-bar-fill');
        fills.forEach((fill) => {
          const pct = fill.getAttribute('data-pct') || '80%';
          fill.style.width = pct;
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach((el) => observer.observe(el));
  progressFills.forEach((fill) => {
    const pct = fill.getAttribute('data-pct') || '80%';
    fill.style.width = pct;
  });
}

// Copy Email & Toast Notification
function showToast(message) {
  let toast = document.getElementById('toast-popup');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-popup';
    toast.className = 'toast-popup';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#22c55e;"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'raafiqulhasan756@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        showToast('Email: raafiqulhasan756@gmail.com');
      });
    });
  });
}

// Dynamic Year Update
function initDynamicYear() {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('.current-year').forEach((el) => {
    el.textContent = currentYear;
  });
}

// Fix profile photo image fallback
function initImageFallback() {
  document.querySelectorAll('.profile-image img').forEach((img) => {
    img.addEventListener('error', () => {
      img.src = '/images/avatar.jpg';
    });
  });
}

// Run All Initializations on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollIndicators();
  initTerminalTabs();
  initProjectFilter();
  initDiodeSimulator();
  initScrollObserver();
  initCopyEmail();
  initDynamicYear();
  initImageFallback();
});
