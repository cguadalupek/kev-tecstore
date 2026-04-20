// Inicializar Iconos de Lucide
lucide.createIcons();

// Manejo del scroll para el Header
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('bg-cardbg/95', 'backdrop-blur-xl', 'shadow-sm', 'py-4', 'border-b', 'border-gray-800');
    header.classList.remove('bg-darkbg/90', 'py-4', 'border-transparent');
  } else {
    header.classList.add('bg-darkbg/90', 'py-4', 'border-transparent');
    header.classList.remove('bg-cardbg/95', 'backdrop-blur-xl', 'shadow-sm', 'py-4', 'border-b', 'border-gray-800');
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if(mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}

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
      // Si solo queremos que se anime una vez:
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.motion-element');
  animatedElements.forEach(el => observer.observe(el));
});
