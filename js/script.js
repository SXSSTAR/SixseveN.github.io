const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
toggle?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('.photo-slideshow').forEach((slideshow) => {
  const slides = [...slideshow.querySelectorAll('.photo-slide')];
  const dots = [...slideshow.querySelectorAll('.photo-dot')];
  const previous = slideshow.querySelector('.photo-prev');
  const next = slideshow.querySelector('.photo-next');

  if (!slides.length || slides.length !== dots.length) return;

  let current = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('active', active);

      if (active) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  }

  previous.addEventListener('click', () => {
    showSlide(current - 1);
  });

  next.addEventListener('click', () => {
    showSlide(current + 1);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  showSlide(0);
});
