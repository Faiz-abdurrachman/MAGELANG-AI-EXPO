window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.nav = function () {
  const items = window.SorceryData.nav
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  return `
    <header class="nav">
      <div class="container nav__inner">
        <a href="#top" class="nav__brand">
          ${window.SorceryIcons.logo}
          <span>SORCERY MTI<small>Meet The Investor 2026</small></span>
        </a>
        <nav class="nav__menu">${items}</nav>
        <div class="nav__cta">
          <button class="nav__burger" aria-label="Buka menu" type="button"
                  onclick="document.querySelector('.nav__menu').classList.toggle('is-open')">
            <span></span>
          </button>
          <a href="#register" class="btn btn--solid">Daftar Sekarang</a>
        </div>
      </div>
    </header>
  `;
};
