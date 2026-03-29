(() => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggleBtn = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (toggleBtn && nav) {
    const setExpanded = (expanded) => {
      toggleBtn.setAttribute("aria-expanded", String(expanded));
      toggleBtn.setAttribute("aria-label", expanded ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", expanded);
    };

    toggleBtn.addEventListener("click", () => {
      const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      setExpanded(!expanded);
    });

    nav.addEventListener("click", (e) => {
      if (e.target instanceof HTMLAnchorElement) setExpanded(false);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setExpanded(false);
    });
  }

  // Sticky header elevation
  const header = document.querySelector("[data-elevate]");
  const onScroll = () =>
    header?.classList.toggle("is-elevated", window.scrollY > 6);

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Demo contact form
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  if (form && note) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      note.textContent =
        "Thanks — this form is a demo. Replace with your email/link or backend.";
      form.reset();
    });
  }
})();

/* ===============================
   Cinematic Scroll Effect
================================ */

const stages = document.querySelectorAll(".cinematic-stage");
let ticking = false;

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function updateCinematic() {
  ticking = false;
  const vh = window.innerHeight;
  stages.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const elCenter = rect.top + rect.height / 2;
    const dist = (elCenter - vh / 2) / (vh * 1.2);
    const p = clamp(dist, -1, 1);
    const amt = Math.abs(p);
    const scale = 0.97 + (1 - amt) * 0.03; 
    const opacity = 0.85 + (1 - amt) * 0.15;
    const translateY = p * -15; 
    el.style.transform = `translateY(${translateY}px) scale(${scale})`;
    el.style.opacity = opacity;
  });
}

// Auto-apply reveal to common blocks (repeats every time)
const autoTargets = document.querySelectorAll(`
  .section-head,
  .panel,
  .feature,
  .tile,
  .contact-card,
  .hero-copy > *,
  .hero-visual
`);

autoTargets.forEach((el) => el.classList.add("reveal"));

// Scroll reveal (repeats every time)
const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealEls.forEach((el) => io.observe(el));

document.querySelectorAll(".grid3, .split").forEach((grid) => {
  [...grid.children].forEach((child, i) => {
    child.style.setProperty("--d", `${i * 80}ms`);
  });
});

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateCinematic);
    }
  },
  { passive: true }
);

window.addEventListener("resize", updateCinematic);
updateCinematic();