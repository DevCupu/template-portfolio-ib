// ============================================================
// Typewriter animation for hero title
// ============================================================
const titles = [
  "Junior Backend Engineer & Cloud Enthusiast",
  "Building Scalable Web Apps with Laravel, Go & Express",
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 60;
const deleteSpeed = 30;
const delayBetween = 1400;
const typewriter = document.getElementById("typewriter-text");

function type() {
  const current = titles[titleIndex];
  if (isDeleting) {
    charIndex--;
    typewriter.textContent = current.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(type, typeSpeed);
    } else {
      setTimeout(type, deleteSpeed + Math.random() * 20);
    }
  } else {
    charIndex++;
    typewriter.textContent = current.substring(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, delayBetween);
    } else {
      setTimeout(type, typeSpeed + Math.random() * 30);
    }
  }
}
if (typewriter) type();

// ============================================================
// Seamless marquee — duplicate each track so -50% loops cleanly
// ============================================================
document.querySelectorAll("[data-marquee]").forEach((track) => {
  track.innerHTML += track.innerHTML;
});

// ============================================================
// Smooth scrolling for in-page navigation
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============================================================
// Mobile menu toggle
// ============================================================
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const hamburger = mobileMenuBtn.querySelector(".hamburger");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("active");
});

document.querySelectorAll(".mobile-nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");
  });
});

// ============================================================
// Scroll reveal
// ============================================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "-40px 0px" }
);

document
  .querySelectorAll(".fade-in, .fade-in-left, .fade-in-right")
  .forEach((el) => observer.observe(el));

// ============================================================
// Header shadow + scroll progress bar + active nav link
// ============================================================
const header = document.getElementById("header");
const progress = document.getElementById("scroll-progress");
const navLinks = document.querySelectorAll("nav a.nav-item");
const sections = [...navLinks]
  .map((l) => document.querySelector(l.getAttribute("href")))
  .filter(Boolean);

function onScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // header elevation
  header.classList.toggle("shadow-sm", scrollTop > 20);

  // progress bar
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${(scrollTop / docHeight) * 100}%`;

  // active nav link
  let current = "";
  sections.forEach((sec) => {
    if (scrollTop >= sec.offsetTop - 120) current = `#${sec.id}`;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active-link", link.getAttribute("href") === current);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ============================================================
// i18n — EN / ID
// ============================================================
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.work": "Work",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "section.about": "About",
    "section.work": "Featured Projects",
    "hero.subtitle":
      "I design and ship backend systems that are simple, scalable, and reliable.",
    "about.description":
      "Junior Backend Developer focused on building Laravel-based systems and JavaScript (Express.js) RESTful APIs. Experienced in database design, authentication, Docker, and deploying services to AWS and GCP. Currently learning Golang for scalable, high-performance backend architectures.",
    "work.dante.title": "Dante Pine Enrekang Tourism Platform",
    "work.dante.subtitle":
      "Tourism platform with public landing page and admin portal.",
    "work.dante.description":
      "This Laravel 12 platform manages tourism content, activities, camping packages, café menu, and a centralized, facility-based booking system. Admins manage everything from the dashboard, while visitors book online.",
  },
  id: {
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.work": "Karya",
    "nav.blog": "Blog",
    "nav.contact": "Kontak",
    "section.about": "Tentang",
    "section.work": "Proyek Unggulan",
    "hero.subtitle":
      "Saya merancang dan membangun sistem backend yang sederhana, skalabel, dan andal.",
    "about.description":
      "Junior Backend Developer yang fokus membangun sistem berbasis Laravel dan RESTful API dengan JavaScript (Express.js). Berpengalaman dalam desain database, autentikasi, Docker, dan deployment layanan ke AWS dan GCP. Saat ini sedang mempelajari Golang untuk arsitektur backend yang skalabel dan high-performance.",
    "work.dante.title": "Platform Pariwisata Dante Pine Enrekang",
    "work.dante.subtitle":
      "Platform pariwisata dengan landing page publik dan portal admin.",
    "work.dante.description":
      "Sistem Laravel 12 ini mengelola konten wisata, aktivitas, paket camping, menu kafe, serta sistem booking terpusat berbasis fasilitas. Admin mengatur semua data dari dashboard, sementara pengunjung memesan secara online.",
  },
};

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = dict[el.getAttribute("data-i18n")];
    if (text) el.textContent = text;
  });
  document.documentElement.setAttribute("data-lang", lang);
  try {
    localStorage.setItem("preferred_lang", lang);
  } catch (e) {}
}

document.querySelectorAll(".lang-switch").forEach((btn) => {
  btn.addEventListener("click", () =>
    applyTranslations(btn.getAttribute("data-lang"))
  );
});

let initialLang = "en";
try {
  const stored = localStorage.getItem("preferred_lang");
  if (stored && translations[stored]) initialLang = stored;
} catch (e) {}
applyTranslations(initialLang);

// ============================================================
// Contact form
// ============================================================
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('input[placeholder="Name"]').value;
    const email = form.querySelector('input[placeholder="Email"]').value;
    const message = form.querySelector('textarea[placeholder="Message"]').value;
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    setTimeout(() => {
      alert("Message sent successfully!");
      form.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
      if (window.feather) feather.replace();
    }, 1500);
  });
}

// ============================================================
// Dark mode toggle (inline SVG handles the icon via CSS)
// ============================================================
const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    setTheme(next);
  });
}

// Follow system changes only when the user hasn't chosen explicitly
try {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) setTheme(e.matches ? "dark" : "light");
    });
} catch (e) {}

// ============================================================
// Rotating role chip on the hero portrait
// ============================================================
(function rotateRoles() {
  const roles = [
    ["server", "Backend Developer"],
    ["cloud", "Cloud Engineer"],
    ["code", "Web Developer"],
  ];
  const chip = document.querySelector(".hero-portrait__chip");
  const iconEl = document.getElementById("role-icon");
  const textEl = document.getElementById("role-text");
  if (!chip || !iconEl || !textEl) return;
  let i = 0;
  function paint() {
    const [ic, tx] = roles[i];
    if (window.feather && feather.icons[ic]) {
      iconEl.innerHTML = feather.icons[ic].toSvg({ width: 16, height: 16 });
    }
    textEl.textContent = tx;
  }
  paint();
  setInterval(() => {
    i = (i + 1) % roles.length;
    chip.classList.add("role-swap");
    setTimeout(() => {
      paint();
      chip.classList.remove("role-swap");
    }, 240);
  }, 2400);
})();

// ============================================================
// Magnetic buttons (desktop pointers only, motion-safe)
// ============================================================
const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (motionOK && finePointer) {
  document.querySelectorAll(".btn-pill, .btn-ghost").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

// ============================================================
// Feather icons — render now, and again on full load as a fallback
// ============================================================
function renderIcons() {
  if (window.feather) {
    try {
      feather.replace();
    } catch (e) {}
  }
}
renderIcons();
window.addEventListener("load", renderIcons);
