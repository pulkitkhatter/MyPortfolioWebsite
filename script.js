const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    });
});

document.getElementById('year').textContent = new Date().getFullYear();

// rotate the role line in the terminal (static text stays if motion is reduced)
const roles = [
    'Founder, KATS Guru · Cloud & DevOps engineer',
    'Builds software & cloud solutions',
    'AI / ML trainer & mentor',
    'One-to-one teacher'
];
const roleEl = document.getElementById('role');
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let i = 0;
    setInterval(() => {
        i = (i + 1) % roles.length;
        roleEl.textContent = roles[i];
    }, 2600);
}
