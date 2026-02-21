// Typewriter animation for hero title (smoother transitions)
const titles = ["Junior Backend Engineer & Cloud Enthusiast", "Building Scalable Web Applications with Laravel, Go, and Express"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 60;
const deleteSpeed = 30;
const delayBetween = 1000;
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
type();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const hamburger = mobileMenuBtn.querySelector(".hamburger");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "-50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document
  .querySelectorAll(".fade-in, .fade-in-left, .fade-in-right")
  .forEach((el) => {
    observer.observe(el);
  });

// Header scroll effect
let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 50) {
    header.classList.add("bg-white/95");
  } else {
    header.classList.remove("bg-white/95");
  }
  lastScrollTop = scrollTop;
});

// Simple i18n for EN / ID
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.work": "Work",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "section.about": "About",
    "section.work": "Work",
    "hero.subtitle":
      "I create digital experiences that are simple, beautiful, and functional.",
    "about.description":
      "Junior Backend Developer focused on building Laravel-based systems and RESTful APIs. Experienced in database design, authentication, Docker, and deploying services to AWS and GCP. Currently learning Golang for scalable, high-performance backend architectures.",
    "work.dante.title": "Dante Pine Enrekang Tourism Platform",
    "work.dante.subtitle":
      "Tourism platform for Dante Pine Enrekang with public landing page and admin portal.",
    "work.dante.description":
      "This Laravel 12 platform manages tourism content, activities, camping packages, café menu, and a centralized, facility-based booking system. Admins manage everything from the dashboard, while visitors see up-to-date information and place bookings online.",
  },
  id: {
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.work": "Karya",
    "nav.blog": "Blog",
    "nav.contact": "Kontak",
    "section.about": "Tentang",
    "section.work": "Karya",
    "hero.subtitle":
      "Saya membuat pengalaman digital yang sederhana, indah, dan fungsional.",
    "about.description":
      "Junior Backend Developer yang fokus membangun sistem berbasis Laravel dan RESTful API. Berpengalaman dalam desain database, autentikasi, Docker, dan deployment layanan ke AWS dan GCP. Saat ini sedang mempelajari Golang untuk arsitektur backend yang skalabel dan high-performance.",
    "work.dante.title": "Laravel Web Pariwisata Dante Pine",
    "work.dante.subtitle":
      "Platform pariwisata Dante Pine Enrekang dengan landing page publik dan portal admin.",
    "work.dante.description":
      "Sistem ini dibangun dengan Laravel 12 untuk mengelola konten wisata, aktivitas, paket camping, menu kafe, serta sistem booking terpusat berbasis fasilitas. Admin dapat mengatur semua data dari dashboard, sementara pengunjung melihat informasi terbaru dan melakukan pemesanan secara online.",
  },
};

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = dict[key];
    if (text) {
      el.textContent = text;
    }
  });

  document.documentElement.setAttribute("data-lang", lang);
  try {
    localStorage.setItem("preferred_lang", lang);
  } catch (e) {
    // ignore storage errors
  }
}

document.querySelectorAll(".lang-switch").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    applyTranslations(lang);
  });
});

// Apply saved or default language on load
let initialLang = "en";
try {
  const stored = localStorage.getItem("preferred_lang");
  if (stored && translations[stored]) {
    initialLang = stored;
  }
} catch (e) {
  // ignore storage errors
}
applyTranslations(initialLang);

// Form submission
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  // Get form data
  const formData = new FormData(e.target);
  const name = e.target.querySelector('input[placeholder="Name"]').value;
  const email = e.target.querySelector('input[placeholder="Email"]').value;
  const message = e.target.querySelector(
    'textarea[placeholder="Message"]'
  ).value;
  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }
  // Simulate form submission
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;
  setTimeout(() => {
    alert("Message sent successfully!");
    e.target.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Add stagger animation delays
document.querySelectorAll(".tech-tag").forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.1}s`;
});

// Parallax effect for hero section (subtle)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.getElementById("home");
  const rate = scrolled * -0.5;
  if (heroSection) {
    heroSection.style.transform = `translateY(${rate}px)`;
  }
});

// Feather icons replace
feather.replace();
