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
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    const product = button.dataset.product;
    const subject = document.querySelector(
      '#contact form input[name="subject"]'
    );
    const message = document.querySelector(
      '#contact form textarea[name="message"]'
    );

    if (subject) {
      subject.value = (lang === 'en' ? 'Order: ' : 'Commande : ') + product;
    }

    if (message) {
      message.value = lang === 'en'
        ? `Hello,\n\nI would like to order: ${product}.\n\nPlease let me know the payment and delivery options.`
        : `Bonjour,\n\nJe souhaite commander : ${product}.\n\nMerci de me communiquer les modalités de paiement et de livraison.`;
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
    dot.dataset.pressIndex = String(index + 1);
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

/* LANGUES : dictionnaire à clés plates pour correspondre aux attributs data-i18n. */
(() => {
  const translations = {
    en: {
      menu: 'Open menu',
      'nav.home': 'Home', 'nav.videos': 'Videos', 'nav.photos': 'Photos',
      'nav.shop': 'Shop', 'nav.contact': 'Contact', 'nav.press': 'Press',
      'hero.watch': 'WATCH THE VIDEOS',
      'intro.title': 'A new dimension for SixseveN.',
      'intro.p1': 'After two LP albums released in 2013 (<em>After the Crash</em>) and 2017 (<em>The new Horizon</em>), SixseveN returns with a new album, “67 EP1”, their first release in EP format.',
      'intro.p2': 'For this new release, the band from Hannut called on Didier Dessers (Rapsat, Maurane, Perry Rose, Curt Close, Loop the Loop, …) for the arrangements, mixing and mastering, giving their compositions a new dimension.',
      'intro.p3': 'Their sound has evolved towards <strong>Alternative Pop</strong>, infused with Electro, Disco, Rock and Funk, while preserving the unity and distinctive SixseveN signature.',
      'photos.title': 'SixseveN in pictures',
      'photo.slideshow': 'SixseveN slideshow', 'photo.prev': 'Previous photo',
      'photo.next': 'Next photo', 'photo.choose': 'Choose a photo',
      'shop.title': 'Music & merch', 'shop.order': 'ORDER',
      'contact.title': 'Contact us', 'contact.intro': 'For booking requests and merchandise orders:',
      'contact.name': 'Name *', 'contact.email': 'Email *', 'contact.subject': 'Subject',
      'contact.message': 'Message', 'contact.send': 'SEND',
      'press.slideshow': 'In the Press', 'press.prev': 'Previous article',
      'press.next': 'Next article', 'press.choose': 'Choose an article',
      'newsletter.title': 'Subscribe to our Newsletter!',
      'newsletter.intro': 'Receive SixseveN news and updates.',
      'newsletter.name': 'First + Last name', 'newsletter.nameAria': 'First and last name',
      'newsletter.email': 'Your email address', 'newsletter.emailAria': 'Your email address',
      'newsletter.subscribe': 'SUBSCRIBE', 'press.article': 'Show article'
    },
    fr: {
      menu: 'Ouvrir le menu',
      'nav.home': 'Accueil', 'nav.videos': 'Vidéos', 'nav.photos': 'Photos',
      'nav.shop': 'Boutique', 'nav.contact': 'Contact', 'nav.press': 'Presse',
      'hero.watch': 'REGARDER LES VIDÉOS',
      'intro.title': 'Une nouvelle dimension pour SixseveN.',
      'intro.p1': 'Après deux albums LP sortis en 2013 (<em>After the Crash</em>) et 2017 (<em>The new Horizon</em>), SixseveN revient avec un nouvel album, « 67 EP1 », le premier au format EP.',
      'intro.p2': 'Pour ce nouvel opus, les Hannutois ont fait appel à Didier Dessers (Rapsat, Maurane, Perry Rose, Curt Close, Loop the Loop, …) pour les arrangements, le mixage et le mastering, afin de donner une dimension supplémentaire à leurs compositions.',
      'intro.p3': 'Le style s’est orienté vers une <strong>Pop alternative</strong>, empreinte d’Electro, de Disco, de Rock et de Funk, tout en gardant l’unité et la signature SixseveN.',
      'photos.title': 'SixseveN en images',
      'photo.slideshow': 'Diaporama SixseveN', 'photo.prev': 'Photo précédente',
      'photo.next': 'Photo suivante', 'photo.choose': 'Choisir une photo',
      'shop.title': 'Musique & merchandising', 'shop.order': 'COMMANDER',
      'contact.title': 'Contactez-nous', 'contact.intro': 'Pour les demandes de réservation et les commandes de produits dérivés :',
      'contact.name': 'Nom *', 'contact.email': 'E-mail *', 'contact.subject': 'Objet',
      'contact.message': 'Message', 'contact.send': 'ENVOYER',
      'press.slideshow': 'Articles de presse', 'press.prev': 'Article précédent',
      'press.next': 'Article suivant', 'press.choose': 'Choisir un article',
      'newsletter.title': 'Abonnez-vous à notre newsletter !',
      'newsletter.intro': 'Recevez les actualités et nouveautés de SixseveN.',
      'newsletter.name': 'Nom + prénom', 'newsletter.nameAria': 'Nom et prénom',
      'newsletter.email': 'Votre adresse e-mail', 'newsletter.emailAria': 'Votre adresse e-mail',
      'newsletter.subscribe': 'S’ABONNER', 'press.article': 'Afficher l’article'
    }
  };

  const staticCopy = {
    en: {
      heroTagline: 'ALTERNATIVE POP · BELGIUM',
      heroGenres: 'ELECTRO · DISCO · ROCK · FUNK',
      videosHeading: 'Live &amp; music',
      pressHeading: 'Clippings',
      country: 'Belgium'
    },
    fr: {
      heroTagline: 'POP ALTERNATIVE · BELGIQUE',
      heroGenres: 'ELECTRO · DISCO · ROCK · FUNK',
      videosHeading: 'Live &amp; musique',
      pressHeading: 'Articles de presse',
      country: 'Belgique'
    }
  };

  function setLabelText(label, value) {
    const textNode = Array.from(label.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.nodeValue = value;
    else label.insertBefore(document.createTextNode(value), label.firstChild);
  }

  function applyLanguage(language) {
    const lang = Object.prototype.hasOwnProperty.call(translations, language) ? language : 'fr';
    const t = translations[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = t[element.dataset.i18n];
      if (value === undefined) return;
      if (element.matches('label')) setLabelText(element, value);
      else element.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const value = t[element.dataset.i18nAria];
      if (value !== undefined) element.setAttribute('aria-label', value);
    });

    const switcher = document.querySelector('.language-switcher');
    if (switcher) {
      switcher.setAttribute('role', 'group');
      switcher.setAttribute('aria-label', lang === 'en' ? 'Language selection' : 'Sélection de la langue');
    }

    document.querySelectorAll('.lang-button').forEach(button => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const setText = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = value;
    };
    setText('#home .eyebrow', staticCopy[lang].heroTagline);
    setText('#home .hero-sub', staticCopy[lang].heroGenres);
    setText('#videos h2', staticCopy[lang].videosHeading);
    setText('#photos-title', t['photos.title']);
    setText('#presse h2', staticCopy[lang].pressHeading);

    document.querySelectorAll('.order-button').forEach(button => {
      button.textContent = t['shop.order'];
    });

    document.querySelectorAll('.press-dot').forEach(dot => {
      dot.setAttribute('aria-label', `${t['press.article']} ${dot.dataset.pressIndex}`);
    });

    const contactSubject = document.getElementById('contact-subject');
    if (contactSubject) contactSubject.value = lang === 'en'
      ? 'New request from the SixseveN website'
      : 'Nouvelle demande depuis le site SixseveN';
    const formLanguage = document.getElementById('form-language');
    if (formLanguage) formLanguage.value = lang;
    const newsletterSubject = document.querySelector('.newsletter-form input[name="_subject"]');
    if (newsletterSubject) newsletterSubject.value = lang === 'en'
      ? 'New SixseveN newsletter subscription'
      : 'Nouvelle inscription à la newsletter SixseveN';

    const newsletterName = document.querySelector('.newsletter-form input[name="name"]');
    const newsletterEmail = document.querySelector('.newsletter-form input[name="email"]');
    if (newsletterName) {
      newsletterName.placeholder = t['newsletter.name'];
      newsletterName.setAttribute('aria-label', t['newsletter.nameAria']);
    }
    if (newsletterEmail) {
      newsletterEmail.placeholder = t['newsletter.email'];
      newsletterEmail.setAttribute('aria-label', t['newsletter.emailAria']);
    }

    const footerText = document.querySelector('footer > p');
    if (footerText) footerText.innerHTML = `© <span id="year">${new Date().getFullYear()}</span> SixseveN · ${staticCopy[lang].country}`;

    try { localStorage.setItem('sixseven-language', lang); } catch (error) { /* storage may be disabled */ }
  }

  document.querySelectorAll('.lang-button').forEach(button => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  let savedLanguage = 'fr';
  try { savedLanguage = localStorage.getItem('sixseven-language') || 'fr'; } catch (error) { /* storage may be disabled */ }
  applyLanguage(savedLanguage);
})();
