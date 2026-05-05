window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.hero = function () {
  return `
    <section class="hero" id="top">
      <div class="hero__bg-glow"></div>
      <div class="hero__watermark">${window.SorceryIcons.dragonWatermark}</div>

      <span class="hero__rail" aria-hidden="true">SORCERY · MEET THE INVESTOR · MAGELANG</span>

      <div class="container hero__inner">
        <div class="hero__grid">
          <div class="hero__content">
            <div class="hero__badge reveal">
              <span class="hero__badge-dot"></span>
              <span>Sorcery Summit · 22 Mei 2026</span>
            </div>

            <h1 class="hero__headline reveal">
              Koneksi Nyata,<br>
              Bukan Sekadar <span class="hero__headline-accent">Seremoni<em>.</em></span>
            </h1>

            <p class="hero__sub reveal">
              Mempertemukan inovasi regional terbaik di Jogja-Magelang dengan pemodal nasional. Pitching tertutup, eksklusif, fokus pada validasi bisnis.
            </p>

            <div class="hero__actions reveal">
              <a href="#register" class="btn btn-holographic btn--lg">Daftarkan Startup Anda →</a>
              <a href="#investors" class="hero__link-arrow">
                Lihat Partner Investor
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside class="hero__ticket reveal" aria-label="Detail acara">
            <div class="hero__ticket-head">
              <span class="hero__ticket-tag">Event Brief</span>
              <span class="hero__ticket-id">#MTI-2026</span>
            </div>

            <div class="hero__ticket-body">
              <div class="hero__ticket-row">
                <span class="hero__ticket-label">Tanggal</span>
                <span class="hero__ticket-value">22 Mei 2026</span>
                <span class="hero__ticket-meta">Jumat · 09:00 — 17:00 WIB</span>
              </div>

              <div class="hero__ticket-divider"></div>

              <div class="hero__ticket-row">
                <span class="hero__ticket-label">Venue</span>
                <span class="hero__ticket-value">Gedung Tri Bhakti</span>
                <span class="hero__ticket-meta">Magelang · Capacity 500+</span>
              </div>

              <div class="hero__ticket-divider"></div>

              <div class="hero__ticket-row hero__ticket-row--countdown">
                <span class="hero__ticket-label">Closing In</span>
                <div class="countdown" id="hero-countdown"></div>
              </div>
            </div>

            <div class="hero__ticket-foot">
              <span>10 Startup Terkurasi</span>
              <span>·</span>
              <span>25+ Venture Capital</span>
              <span>·</span>
              <span>Rp 100M+ Capital Pool</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
};
