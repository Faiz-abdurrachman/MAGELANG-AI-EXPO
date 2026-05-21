window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.nav = function () {
  const items = window.SorceryData.nav
    .map((item) => `<a href="${item.href}" class="nav__link">${item.label}</a>`)
    .join("");

  return `
    <header class="nav">
      <div class="container nav__inner">
        <a href="#top" class="nav__brand">
          ${window.SorceryIcons.logo}
          <span>MAGELANG AI EXPO<small>AI Expo 2026</small></span>
        </a>
        <nav class="nav__menu">
          ${items}
          <div class="nav__indicator"></div>
        </nav>
        <div class="nav__cta">
          <button class="nav__burger" aria-label="Buka menu" type="button" id="nav-toggle">
            <div class="nav__burger-box">
              <span class="nav__burger-line nav__burger-line--1"></span>
              <span class="nav__burger-line nav__burger-line--2"></span>
              <span class="nav__burger-line nav__burger-line--3"></span>
            </div>
          </button>
          <a href="#register" class="btn btn-holographic">Daftar Produk</a>
        </div>
      </div>
    </header>
  `;
};

window.SorceryApp.navInit = function() {
  const menu = document.querySelector('.nav__menu');
  const indicator = document.querySelector('.nav__indicator');
  const links = document.querySelectorAll('.nav__link');
  const toggle = document.getElementById('nav-toggle');

  if (!menu || !indicator) return;

  // Toggle Mobile Menu
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  let hoverLink = null;

  const moveIndicator = (el) => {
    if (!el || window.innerWidth <= 920) {
      indicator.style.opacity = '0';
      return;
    }
    const rect = el.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    indicator.style.opacity = '1';
    indicator.style.width = `${rect.width}px`;
    indicator.style.height = `${rect.height}px`;
    indicator.style.left = `${rect.left - menuRect.left}px`;
    indicator.style.top = `${rect.top - menuRect.top}px`;
  };

  const sync = () => {
    if (window.innerWidth <= 920) {
      indicator.style.opacity = '0';
      return;
    }
    if (hoverLink) {
      moveIndicator(hoverLink);
      return;
    }
    const activeLink = document.querySelector('.nav__link.is-active');
    if (activeLink) {
      moveIndicator(activeLink);
    } else {
      indicator.style.opacity = '0';
    }
  };

  links.forEach(link => {
    link.addEventListener('click', () => {
      window.isNavClicking = true;
      links.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
      hoverLink = link;
      sync();
      
      // Close mobile menu on click
      if (menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle?.classList.remove('is-active');
        document.body.style.overflow = '';
      }

      setTimeout(() => { window.isNavClicking = false; }, 1000);
    });
    link.addEventListener('mouseenter', () => {
      hoverLink = link;
      sync();
    });
    link.addEventListener('mouseleave', () => {
      if (hoverLink === link) hoverLink = null;
    });
  });

  menu.addEventListener('mouseleave', () => {
    hoverLink = null;
    sync();
  });

  requestAnimationFrame(() => requestAnimationFrame(sync));

  const observer = new MutationObserver(() => {
    if (!hoverLink) sync();
  });
  links.forEach(link => {
    observer.observe(link, { attributes: true, attributeFilter: ['class'] });
  });

  window.addEventListener('resize', () => {
    sync();
    if (window.innerWidth > 920 && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      toggle?.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  });
};
