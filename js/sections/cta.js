window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.cta = function () {
  return `
    <section class="cta">
      <div class="cta__watermark">${window.SorceryIcons.dragonWatermark}</div>
      <div class="container cta__inner reveal">
        <span class="cta__eyebrow">Deadline · 30 Agustus 2026</span>
        <h2 class="cta__headline">Sepuluh Kursi. Satu Sore. Tak Terulang Tahun Ini.</h2>
        <p class="cta__sub">Sorcery hanya mengundang founder yang siap pitch dan menutup deal. Jika itu Anda—sisa waktu pendaftaran ada di bawah ini.</p>
        <div class="cta__countdown countdown" id="cta-countdown"></div>
        <a href="#register" class="btn btn--lg cta__btn">Daftarkan Startup Anda →</a>
      </div>
    </section>
  `;
};
