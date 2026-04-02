/* ── NAVBAR scroll shadow ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

/* ── HAMBURGER ── */
document.getElementById('navHam').addEventListener('click', function(){
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('#navLinks a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'))
);

/* ── SCROLL REVEAL (IntersectionObserver) ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── COUNTER animation ── */
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const dur = 1800;
  const step = target / (dur / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur += step;
    if(cur >= target){ el.textContent = target; clearInterval(t); }
    else { el.textContent = Math.floor(cur); }
  }, 16);
}
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.count-num').forEach(el => animateCount(el));
  }, 800);
});

/* ── HERO PARTICLES ── */
(function createParticles(){
  const container = document.getElementById('heroParticles');
  const colors = ['#F97316','#FBBF24','#5BC8F5','rgba(255,255,255,0.6)','#22C55E'];
  for(let i = 0; i < 28; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      bottom:${-10}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*12 + 8}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
})();

/* ── ACTIVE NAV LINK on scroll ── */
const sections = ['hero','services','solar','petroleum','why','process','projects','testimonials','contact'];
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if(el && window.scrollY >= el.offsetTop - 120) cur = id;
  });
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

/* ── PROJECT FILTER ── */
function filterProj(cat, btn){
  document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('pf-active'));
  btn.classList.add('pf-active');
  document.querySelectorAll('.proj-item').forEach(item => {
    if(cat === 'all' || item.dataset.cat === cat){
      item.classList.remove('hidden');
      item.style.display = '';
    } else {
      item.classList.add('hidden');
      setTimeout(() => { if(item.classList.contains('hidden')) item.style.display = 'none'; }, 350);
    }
  });
}

/* ── WHATSAPP ENQUIRY FORM ── */
function sendWA(e){
  e.preventDefault();
  const name    = document.getElementById('f_name').value.trim();
  const phone   = document.getElementById('f_phone').value.trim();
  const service = document.getElementById('f_service').value;
  const budget  = document.getElementById('f_budget').value;
  const city    = document.getElementById('f_city').value.trim();
  const msg     = document.getElementById('f_msg').value.trim();
  if(!name || !phone || !service || !city){
    alert('Please fill in all required fields (Name, Phone, Service, City).');
    return;
  }
  const text =
    `*Matrix Solar & Petroleum — New Enquiry*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* ${phone}\n` +
    `🔧 *Service:* ${service}\n` +
    `💰 *Budget:* ${budget || 'Not specified'}\n` +
    `📍 *Location:* ${city}\n` +
    `💬 *Message:* ${msg || 'No additional details'}`;
  /* ⚠️  Replace 91XXXXXXXXXX with actual WhatsApp number */
  window.open('https://wa.me/91XXXXXXXXXX?text=' + encodeURIComponent(text), '_blank');
}
