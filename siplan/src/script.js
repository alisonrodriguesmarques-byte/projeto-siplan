// Navbar muda ao rolar
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// Menu mobile hamburguer
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (toggle && nav) {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("active");
      toggle.classList.remove("active");
    }
  });

  // Fecha ao clicar nos links
  document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.classList.remove("active");
    });
  });
}

// Animações suaves com IntersectionObserver
const elements = document.querySelectorAll(".fade");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
} else {
  // Fallback simples
  const reveal = () => {
    elements.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add("show");
      }
    });
  };
  window.addEventListener("scroll", reveal);
  window.addEventListener("load", reveal);
}
