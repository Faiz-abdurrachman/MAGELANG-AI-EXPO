window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.investors = function () {
  const cards = window.SorceryData.investors
    .map(
      (inv, i) => `
        <div class="investors__dossier reveal">
          <div class="dossier__inner">
            <!-- Background Elements -->
            <div class="dossier__pattern"></div>
            
            <!-- Corner Brackets -->
            <span class="bracket bracket--tl"></span>
            <span class="bracket bracket--tr"></span>
            <span class="bracket bracket--bl"></span>
            <span class="bracket bracket--br"></span>

            <header class="dossier__header">
              <div class="dossier__status">
                <span class="status__dot"></span>
                <span class="status__text">DATA_NODE: SECURE</span>
              </div>
              <div class="dossier__id">MN-2026/0${i+1}</div>
            </header>

            <div class="dossier__body">
              <div class="dossier__type">AUTHORIZED INVESTOR</div>
              <h3 class="dossier__name">${inv.title}</h3>
              <p class="dossier__thesis">${inv.thesis}</p>
            </div>

            <div class="dossier__specs">
              <div class="spec__item">
                <label>ALLOCATION_RANGE</label>
                <div class="spec__value">${inv.ticket}</div>
              </div>
              <div class="spec__item">
                <label>HISTORICAL_NODES</label>
                <div class="spec__value">${inv.portfolio}</div>
              </div>
            </div>

            <footer class="dossier__footer">
              <div class="dossier__barcode">
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
              </div>
              <div class="dossier__auth">AUTH_VALID</div>
            </footer>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section investors" id="investors">
      <div class="investors__bg-grid"></div>
      <div class="container">
        <div class="investors__head reveal">
          <span class="eyebrow">Capital Network</span>
          <h2 class="section-title">The Investor Dossier.</h2>
          <p class="section-subtitle">Daftar pemegang keputusan dari jajaran Venture Capital nasional yang terkonfirmasi hadir.</p>
        </div>
        <div class="investors__grid">${cards}</div>
        <div class="investors__footer-banner reveal">
          <div class="banner__line"></div>
          <p>CONFIDENTIAL DATA · DETAILED IDENTITY RELEASED POST-CURATION STAGE</p>
        </div>
      </div>
    </section>
  `;
};
