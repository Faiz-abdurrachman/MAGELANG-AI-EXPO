window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.value = function () {
  const cards = window.SorceryData.values
    .map(
      (v) => `
        <div class="value__card-wrapper reveal reveal--scale">
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
          <p class="section-subtitle">Magelang AI Expo memberi ruang agar produk AI bisa dilihat, dicoba, dan dibicarakan oleh orang yang relevan—tanpa menjanjikan hasil yang tidak pasti.</p>
        </div>
        <div class="value__grid reveal-stagger">${cards}</div>
      </div>
    </section>
  `;
};
