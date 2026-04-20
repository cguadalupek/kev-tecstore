// Inicializar Iconos de Lucide
lucide.createIcons();

// Manejo del scroll para el Header
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('shadow-md', 'py-4', 'border-b');
    header.classList.remove('border-transparent');
  } else {
    header.classList.remove('shadow-md', 'border-b');
    header.classList.add('border-transparent');
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll('.nav-link');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIconSun = document.getElementById('theme-icon-sun');
const themeIconMoon = document.getElementById('theme-icon-moon');
const htmlElement = document.documentElement;

function updateThemeIcons(isLight) {
  if (isLight) {
    themeIconSun?.classList.remove('hidden');
    themeIconMoon?.classList.add('hidden');
  } else {
    themeIconSun?.classList.add('hidden');
    themeIconMoon?.classList.remove('hidden');
  }
}

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
  htmlElement.classList.add('light');
  updateThemeIcons(true);
} else {
  htmlElement.classList.remove('light');
  updateThemeIcons(false);
}

themeToggle?.addEventListener('click', () => {
  const isLight = htmlElement.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcons(isLight);
});

function setActiveLink(hash) {
  // Desktop links
  navLinks.forEach(link => {
    const linkHash = link.getAttribute('href');
    if (linkHash === hash || (hash === '' && linkHash === '#')) {
      link.classList.add('text-primary', 'border-primary', 'font-bold');
      link.classList.remove('text-main-custom', 'border-transparent', 'font-semibold');
    } else {
      link.classList.remove('text-primary', 'border-primary', 'font-bold');
      link.classList.add('text-main-custom', 'border-transparent', 'font-semibold');
    }
  });

  // Mobile links
  mobileLinks.forEach(link => {
    const linkHash = link.getAttribute('href');
    if (linkHash === hash || (hash === '' && linkHash === '#')) {
      link.classList.add('text-primary', 'font-bold');
      link.classList.remove('text-main-custom', 'font-semibold');
    } else {
      link.classList.remove('text-primary', 'font-bold');
      link.classList.add('text-main-custom', 'font-semibold');
    }
  });
}

// Handle click on nav links
[...navLinks, ...mobileLinks].forEach(link => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    setActiveLink(hash);
  });
});

if(mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que el clic se propague
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });

  // Cerrar menú si se hace clic fuera
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    }
  });

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}

// Intersection Observer para las secciones y actualizar el nav
const sectionObserverOptions = {
  root: null,
  rootMargin: '-20% 0px -70% 0px', // Ajustado para detectar la sección predominante
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      setActiveLink(id ? `#${id}` : '#');
    }
  });
}, sectionObserverOptions);

// Intersection Observer para las animaciones
const animationObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const animationObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, animationObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Observar secciones para el estado activo
  const sections = [
    document.querySelector('main > section:first-child'), // Hero
    document.getElementById('productos'),
    document.getElementById('servicios')
  ];
  
  sections.forEach(section => {
    if (section) sectionObserver.observe(section);
  });

  // Observar elementos para animaciones
  const animatedElements = document.querySelectorAll('.motion-element');
  animatedElements.forEach(el => animationObserver.observe(el));
});
