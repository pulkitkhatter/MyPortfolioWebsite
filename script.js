document.getElementById('year').textContent = new Date().getFullYear();

// staged reveal: each element eases in once as it enters the viewport
const els = [...document.querySelectorAll('[data-r]')];
const heroCount = 4;
els.forEach((el, i) => el.style.setProperty('--i', i < heroCount + 2 ? i : 0));
const sig = document.querySelectorAll('.sig-big');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach((el) => io.observe(el));
  sig.forEach((el) => io.observe(el));
} else {
  document.documentElement.className = 'no-js';
}

// safety net: never leave on-screen content hidden if the observer is slow
setTimeout(() => els.forEach((el) => {
  const r = el.getBoundingClientRect();
  if (r.top < innerHeight && r.bottom > 0) el.classList.add('in');
}), 1500);
