const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
toggle?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelector('#year').textContent=new Date().getFullYear();
// SIXSEVEN PHOTO SLIDESHOW
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
// FORMULAIRE DE COMMANDE MUSIC & MERCH
document.querySelectorAll('.order-button').forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    const subject = document.querySelector(
      '#contact form input[name="subject"]'
    );
    const message = document.querySelector(
      '#contact form textarea[name="message"]'
    );

    if (subject) {
      subject.value = 'Commande : ' + product;
    }

    if (message) {
      message.value =
        'Bonjour,\n\n' +
        'Je souhaite commander : ' + product + '.\n\n' +
        'Merci de me communiquer les modalités de paiement et de livraison.';
    }
  });
});

/* DIAPORAMA DES ARTICLES DE PRESSE */
document.querySelectorAll('.press-slideshow').forEach((slideshow) => {
  const slides = Array.from(
    slideshow.querySelectorAll('.press-slide')
  );
  const dotsContainer = slideshow.querySelector('.press-dots');
  const counter = slideshow.querySelector('.press-counter');
  const prevButton = slideshow.querySelector('.press-prev');
  const nextButton = slideshow.querySelector('.press-next');

  if (!slides.length || !dotsContainer) return;

  let currentIndex = 0;
  let autoplay;

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'press-dot';
    dot.setAttribute('aria-label', 'Afficher l’article ' + (index + 1));

    dot.addEventListener('click', () => {
      showSlide(index);
      restartAutoplay();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(
    dotsContainer.querySelectorAll('.press-dot')
  );

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-current',
        i === currentIndex ? 'true' : 'false');
    });

    if (counter) {
      counter.textContent =
        (currentIndex + 1) + ' / ' + slides.length;
    }
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  function startAutoplay() {
    stopAutoplay();

    if (!reduceMotion && !document.hidden) {
      autoplay = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 5000);
    }
  }

  function restartAutoplay() {
    startAutoplay();
  }

  prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    restartAutoplay();
  });

  nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    restartAutoplay();
  });

  slideshow.addEventListener('mouseenter', stopAutoplay);
  slideshow.addEventListener('mouseleave', startAutoplay);
  slideshow.addEventListener('focusin', stopAutoplay);
  slideshow.addEventListener('focusout', startAutoplay);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  showSlide(0);
  startAutoplay();
});
