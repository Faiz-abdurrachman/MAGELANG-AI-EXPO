window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.format = function () {
  const cards = window.SorceryData.zones
    .map(
      (z, i) => `
        <div class="format__card-wrapper reveal">
          <div class="format__card">
            <div class="format__slide format__slide--1">
              <div class="format__num">Zone 0${i + 1}</div>
              <div class="format__name">${z.name}</div>
              <div class="format__role">${z.role}</div>
            </div>
            <div class="format__slide format__slide--2">
              <div class="format__content">
                <p class="format__desc">${z.desc}</p>
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section format" id="format">
      <div class="container">
        <div class="format__head reveal">
          <span class="eyebrow">The Venue Format</span>
          <h2 class="section-title">Tiga Zona, Satu Hari Penuh.</h2>
          <p class="section-subtitle">Venue acara diatur menjadi tiga zona spesifik—masing-masing dirancang untuk format interaksi yang berbeda. Investor tidak perlu berjalan jauh; semua diatur dalam radius hospitality eksekutif.</p>
        </div>
        <div class="format__grid">${cards}</div>
      </div>
    </section>
  `;
};
