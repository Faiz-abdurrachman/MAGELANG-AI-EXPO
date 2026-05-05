window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.hero = function () {
  return `
    <section class="hero" id="top">
      <div class="hero__bg">
        <!--
          TODO: drop a video here later, e.g.
          <video autoplay muted loop playsinline poster="assets/img/hero-poster.jpg">
            <source src="assets/video/hero.mp4" type="video/mp4">
          </video>
        -->
      </div>
      <div class="hero__watermark">${window.SorceryIcons.dragonWatermark}</div>

      <div class="container hero__inner">
        <div class="reveal">
          <span class="badge">
            <span class="badge__dot"></span>
            Sorcery Summit · 30 Agustus 2026
          </span>
        </div>

        <h1 class="hero__headline reveal">
          Koneksi Nyata,<br>
          Bukan Sekadar <em>Seremoni.</em>
        </h1>

        <p class="hero__sub reveal">
          Mempertemukan inovasi regional terbaik di Jogja-Magelang dengan pemodal nasional.
          Pitching tertutup, eksklusif, dan fokus pada validasi bisnis—bukan teater inovasi.
        </p>

        <div class="hero__actions reveal">
          <a href="#register" class="btn btn--solid btn--lg">Daftarkan Startup Anda →</a>
          <a href="#investors" class="btn btn--outline btn--lg">Lihat Partner Investor</a>
        </div>

        <div class="hero__meta ios-glass reveal">
          <div>
            <div class="hero__meta-label">Hari Pelaksanaan</div>
            <div class="hero__meta-value">30 Agustus 2026</div>
          </div>
          <div>
            <div class="hero__meta-label">Venue</div>
            <div class="hero__meta-value">Lokalfolk Cafe, Jogja</div>
          </div>
          <div class="hero__meta-full">
            <div class="hero__meta-label">Pendaftaran Ditutup Dalam</div>
            <div class="countdown" id="hero-countdown" style="margin-top: 0.625rem;"></div>
          </div>
        </div>
      </div>
    </section>
  `;
};
