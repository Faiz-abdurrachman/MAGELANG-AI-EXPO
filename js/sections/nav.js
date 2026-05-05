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
          <span>SORCERY MTI<small>Meet The Investor 2026</small></span>
        </a>
        <nav class="nav__menu">
          ${items}
          <div class="nav__indicator"></div>
        </nav>
        <div class="nav__cta">
          <button class="nav__burger" aria-label="Buka menu" type="button"
                  onclick="document.querySelector('.nav__menu').classList.toggle('is-open')">
            <span></span>
          </button>
          <a href="#register" class="btn btn-holographic">Daftar Sekarang</a>
        </div>
      </div>
    </header>
  `;
};

window.SorceryApp.navInit = function() {
  const menu = document.querySelector('.nav__menu');
  const indicator = document.querySelector('.nav__indicator');
  const links = document.querySelectorAll('.nav__link');

  if (!menu || !indicator) return;

  let hoverLink = null;

  const moveIndicator = (el) => {
    if (!el) {
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

  // Sync indicator to whatever the user is currently looking at:
  // hover wins, otherwise active link, otherwise hide.
  const sync = () => {
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
      setTimeout(() => { window.isNavClicking = false; }, 1000);
    });
    link.addEventListener('mouseenter', () => {
      hoverLink = link;
      sync();
    });
    link.addEventListener('mouseleave', () => {
      if (hoverLink === link) hoverLink = null;
      // Don't sync immediately — menu mouseleave handles the final state,
      // and moving between adjacent links fires mouseenter on the next link first.
    });
  });

  menu.addEventListener('mouseleave', () => {
    hoverLink = null;
    sync();
  });

  // Initial position once layout settles.
  requestAnimationFrame(() => requestAnimationFrame(sync));

  // Scroll-spy updates is-active on links — reflect that only when not hovering.
  const observer = new MutationObserver(() => {
    if (!hoverLink) sync();
  });
  links.forEach(link => {
    observer.observe(link, { attributes: true, attributeFilter: ['class'] });
  });

  // Re-sync on resize so the pill stays glued to the link.
  window.addEventListener('resize', sync);
};
