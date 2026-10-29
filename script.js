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

// scroll progress bar (transform only)
const bar = document.createElement('div'); bar.className = 'progress'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
let tick = false;
addEventListener('scroll', () => { if (tick) return; tick = true; requestAnimationFrame(() => {
  const m = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (m > 0 ? scrollY / m : 0) + ')'; tick = false; }); }, { passive: true });

// count-up numbers
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-count]').forEach((el) => {
  const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '';
  const fmt = (v) => v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
  if (still) return;
  el.textContent = fmt(0);
  new IntersectionObserver((e, o) => { if (!e[0].isIntersecting) return; o.disconnect();
    const t0 = performance.now(), D = 1400;
    (function f(t) { const p = Math.min((t - t0) / D, 1), v = end * (1 - Math.pow(1 - p, 4)); el.textContent = fmt(v); if (p < 1) requestAnimationFrame(f); })(t0);
  }, { threshold: 0.6 }).observe(el);
});

// cursor spotlight on project cards
document.querySelectorAll('.case').forEach((c) => c.addEventListener('pointermove', (e) => {
  const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));
