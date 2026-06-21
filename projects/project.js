// Shared behavior for project pages: theme toggle, icons, scroll reveal.

// ---- Theme ----
function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
}

// Floating theme toggle (injected so every page is consistent)
(function injectToggle() {
  const btn = document.createElement("button");
  btn.id = "theme-toggle";
  btn.type = "button";
  btn.setAttribute("aria-label", "Toggle dark mode");
  btn.title = "Toggle dark mode";
  btn.className =
    "theme-toggle fixed bottom-6 right-6 z-50 w-12 h-12 grid place-items-center rounded-full " +
    "bg-white/90 border border-gray-200 text-gray-700 shadow-lg backdrop-blur " +
    "hover:text-ink hover:border-gray-300 dark:bg-[#141416]/90 dark:border-white/15 dark:text-gray-200";
  btn.innerHTML =
    '<svg class="icon-moon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' +
    '<svg class="icon-sun w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';
  btn.addEventListener("click", () => {
    setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
  });
  document.addEventListener("DOMContentLoaded", () => document.body.appendChild(btn));
})();

try {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) setTheme(e.matches ? "dark" : "light");
  });
} catch (e) {}

// ---- Scroll reveal ----
document.addEventListener("DOMContentLoaded", () => {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          obs.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "-40px 0px" }
  );
  document.querySelectorAll("main section").forEach((s, i) => {
    s.classList.add("fade-in");
    s.style.transitionDelay = Math.min(i * 0.06, 0.3) + "s";
    obs.observe(s);
  });
});

// ---- Icons ----
function renderIcons() {
  if (window.feather) {
    try {
      feather.replace();
    } catch (e) {}
  }
}
renderIcons();
window.addEventListener("load", renderIcons);
