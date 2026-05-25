window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.investors = function () {
  const cards = window.SorceryData.investors
    .map(
      (inv, i) => `
        <div class="investors__profile reveal reveal--rotate">
          <div class="profile__inner">
            <!-- Background Watermark -->
            <div class="profile__watermark">Magelang AI Expo</div>
            
            <!-- Corner Brackets -->
            <span class="bracket bracket--tl"></span>
            <span class="bracket bracket--tr"></span>
            <span class="bracket bracket--bl"></span>
            <span class="bracket bracket--br"></span>

            <div class="profile__layout">
              <div class="profile__side">
                <!-- Abstract Geometric Avatar -->
                <div class="profile__avatar">
                  <div class="avatar__geom avatar__geom--1"></div>
                  <div class="avatar__geom avatar__geom--2"></div>
                  <div class="avatar__glow"></div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div class="profile__id">Ref-0${i+1}</div>
              </div>

              <div class="profile__main">
                <header class="profile__header">
                  <div class="profile__tag-group">
                    <span class="profile__tag">Verified Guest</span>
                    <span class="profile__clearance">Level 2</span>
                  </div>
                  <h3 class="profile__name">${inv.title}</h3>
                  <p class="profile__thesis">${inv.thesis}</p>
                </header>

                <div class="profile__data">
                  <div class="data__row">
                    <span class="data__key">Potensi Kolaborasi</span>
                    <span class="data__val">${inv.ticket}</span>
                  </div>
                  <div class="data__row">
                    <span class="data__key">Keahlian Utama</span>
                    <span class="data__val">${inv.portfolio}</span>
                  </div>
                </div>
              </div>
            </div>

            <footer class="profile__footer">
              <div class="profile__barcode">
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
              </div>
              <div class="profile__seal">Showcase Event</div>
            </footer>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section investors" id="investors">
      <div class="container">
        <div class="investors__head reveal">
          <span class="eyebrow">Strategic Guests</span>
          <h2 class="section-title">Orang yang Punya<br>Akses, Jaringan, dan Kebutuhan.</h2>
          <p class="section-subtitle">Bertemu pelaku bisnis, eksekutif, partner strategis, dan jaringan senior yang bisa memberi feedback, akses, atau peluang kerja sama.</p>
        </div>
        <div class="investors__grid reveal-stagger">${cards}</div>
        <div class="investors__security-note reveal">
          <div class="security-note__line"></div>
          <p>Realistic Room: No funding promise, only relevant access and conversation</p>
          <div class="security-note__line"></div>
        </div>
      </div>
    </section>
  `;
};
