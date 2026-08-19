// main.js — navigation, hamburger, carousel, AOS init, simple form validation
document.addEventListener('DOMContentLoaded', function(){
  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('site-nav');
  if(hamburger){
    hamburger.addEventListener('click', ()=>{
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Simple testimonial carousel
  const carousel = document.getElementById('testimonial-carousel');
  if(carousel){
    const slides = carousel.querySelectorAll('.slide');
    let idx = 0;
    setInterval(()=>{
      slides[idx].classList.remove('active');
      idx = (idx+1) % slides.length;
      slides[idx].classList.add('active');
    },5000);
  }

  // AOS
  if(window.AOS) AOS.init({duration:700,once:true});

  // Basic form validation (prevents empty submit and shows alert)
  const forms = document.querySelectorAll('form');
  forms.forEach(form=>{
    form.addEventListener('submit', (e)=>{
      // allow Formspree to handle submission, but do basic validation
      const required = form.querySelectorAll('[required]');
      for(const el of required){
        if(!el.value.trim()){
          e.preventDefault();
          el.focus();
          alert('Please fill required fields before submitting.');
          return;
        }
      }
      // if action still has placeholder, warn user
      if(form.action.includes('YOUR_FORMSPREE_ENDPOINT')){
        e.preventDefault();
        alert('Formspree endpoint not configured. Replace YOUR_FORMSPREE_ENDPOINT in the form action with your Formspree form ID.');
      }
    });
  });
});
