// Inicializar Iconos de Lucide
lucide.createIcons();

// Manejo del scroll para el Header
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('bg-white/90', 'backdrop-blur-xl', 'shadow-sm', 'py-4');
    header.classList.remove('bg-transparent', 'py-6');
  } else {
    header.classList.add('bg-transparent', 'py-6');
    header.classList.remove('bg-white/90', 'backdrop-blur-xl', 'shadow-sm', 'py-4');
  }
});

// Intersection Observer para las animaciones (reemplazo de motion/react)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Si solo queremos que se anime una vez (viewport={{ once: true }} en Framer Motion):
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.motion-element');
  animatedElements.forEach(el => observer.observe(el));
});
