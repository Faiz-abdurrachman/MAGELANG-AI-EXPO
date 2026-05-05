window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.value = function () {
  const cards = window.SorceryData.values
    .map(
      (v) => `
        <div class="value__card-wrapper reveal">
          <div class="value__card">
            <div class="value__card-inner">
              <div class="value__icon">${window.SorceryIcons[v.icon] || ""}</div>
              <h3>${v.title}</h3>
              <p>${v.desc}</p>
              <div class="value__card-glow"></div>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section value" id="deliverables">
      <div class="container">
        <div class="value__head reveal">
          <span class="eyebrow">What You Get</span>
          <h2 class="section-title">Enam Hal yang Anda<br>Bawa Pulang.</h2>
          <p class="section-subtitle">Selain potensi term sheet—Sorcery memberikan exposure, dokumentasi profesional, dan akses lanjutan yang biasanya tidak terbeli oleh tiket event mana pun.</p>
        </div>
        <div class="value__grid">${cards}</div>
      </div>
    </section>
  `;
};
