window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.cta = function () {
  return `
    <section class="section cta">
      <div class="cta__watermark">${window.SorceryIcons.dragonWatermark}</div>
      <div class="container cta__inner reveal">
        <span class="cta__eyebrow">Acara · 4 Juni 2026</span>
        <h2 class="cta__headline">Produk AI Anda Perlu Dilihat Orang yang Tepat.</h2>
        <p class="cta__sub">Magelang AI Expo bukan janji investasi instan. Ini ruang untuk demo, validasi, networking, dan membuka peluang yang lebih realistis.</p>
        <div class="cta__countdown countdown" id="cta-countdown"></div>
        <a href="#register" class="btn btn-holographic btn--lg cta__btn">Daftarkan Produk Anda</a>
      </div>
    </section>
  `;
};
