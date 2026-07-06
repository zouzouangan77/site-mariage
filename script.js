/* ========== MENU HAMBURGER ========== */
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");

burger?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
});

// Ferme le menu quand on clique un lien
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// Ferme le menu en cliquant en dehors
document.addEventListener("click", (e) => {
  if (!burger?.contains(e.target) && !navLinks?.contains(e.target)) {
    navLinks?.classList.remove("open");
    burger?.classList.remove("open");
    burger?.setAttribute("aria-expanded", "false");
  }
});

/* ========== CARROUSEL ========== */
const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");
const slides = track ? Array.from(track.querySelectorAll("figure")) : [];
let current = 0;

const goTo = (index) => {
  if (!slides.length) return;
  current = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dotsContainer?.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });
};

// Créer les points
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "carousel-dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Photo ${i + 1}`);
  dot.addEventListener("click", () => goTo(i));
  dotsContainer?.appendChild(dot);
});

document.getElementById("carouselPrev")?.addEventListener("click", () => goTo(current - 1));
document.getElementById("carouselNext")?.addEventListener("click", () => goTo(current + 1));

// Swipe tactile
let touchStartX = 0;
const carousel = document.getElementById("carousel");

carousel?.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

carousel?.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
}, { passive: true });

// Auto-défilement toutes les 4 secondes
setInterval(() => goTo(current + 1), 4000);