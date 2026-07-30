/* ---------- Mandala petals ---------- */
(function drawPetals(){
    const group = document.getElementById('petals');
    const total = 12;
    for(let i=0;i<total;i++){
        const angle = (360/total)*i;
        const petal = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
        petal.setAttribute("cx","100");
        petal.setAttribute("cy","30");
        petal.setAttribute("rx","6");
        petal.setAttribute("ry","18");
        petal.setAttribute("transform",`rotate(${angle} 100 100)`);
        group.appendChild(petal);
    }
})();
 
/* ---------- Dark / Light mode ---------- */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('yw-theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
if(initialTheme === 'light'){
    document.body.setAttribute('data-theme','light');
}
themeToggle.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    if(isLight){
        document.body.removeAttribute('data-theme');
        localStorage.setItem('yw-theme','dark');
    } else {
        document.body.setAttribute('data-theme','light');
        localStorage.setItem('yw-theme','light');
    }
});
 
/* ---------- Sticky nav shrink ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('backToTop').classList.toggle('show', window.scrollY > 500);
});
 
/* ---------- Mobile menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});
 
/* ---------- Breathing label sync ---------- */
const breathLabel = document.getElementById('breathLabel');
let breathingIn = true;
setInterval(() => {
    breathLabel.textContent = breathingIn ? 'Breathe Out' : 'Breathe In';
    breathingIn = !breathingIn;
}, 4000);
 
/* ---------- Language toggle ---------- */
document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        document.querySelectorAll('.lang-toggle button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.about-wrap p').forEach(p => {
            p.classList.toggle('active', p.dataset.lang === lang);
        });
    });
});
 
/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
},{ threshold:0.15 });
revealEls.forEach(el => observer.observe(el));
 
/* ---------- Testimonials slider ---------- */
const slides = document.querySelectorAll('.testimonial-slide');
const dotsWrap = document.getElementById('testimonialDots');
let current = 0;
 
slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsWrap.appendChild(dot);
});
 
function showSlide(index){
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
}
 
setInterval(() => {
    showSlide((current + 1) % slides.length);
}, 5000);
 
/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if(!isOpen) item.classList.add('open');
    });
});
 
/* ---------- Contact form (demo only) ---------- */
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formMsg.classList.add('show');
    contactForm.reset();
    setTimeout(() => formMsg.classList.remove('show'), 4000);
});
 
/* ---------- Newsletter (demo only) ---------- */
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Joined!';
    newsletterForm.reset();
    setTimeout(() => btn.textContent = original, 2500);
});
 
/* ---------- Back to top ---------- */
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:'smooth' });
});