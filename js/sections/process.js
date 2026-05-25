window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.process = function () {
  const cards = window.SorceryData.process
    .map(
      (p) => `
        <div class="process__card-wrapper reveal reveal--scale">
          <div class="process__card holographic-card">
            <div class="process__step-badge">Step ${p.step}</div>
            <div class="process__card-content">
              <h3>${p.title}</h3>
              <p>${p.desc}</p>
            </div>
            <div class="process__card-glow"></div>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section process" id="process">
      <div class="container">
        <div class="process__head reveal">
          <span class="eyebrow">Selection Process</span>
          <h2 class="section-title">Bagaimana Kami<br>Memilih Produk AI.</h2>
          <p class="section-subtitle">Kurasi dibuat sederhana: produk harus jelas, bisa didemokan, dan relevan untuk audiens bisnis maupun pengguna nyata.</p>
        </div>
        <div class="process__grid reveal-stagger">${cards}</div>
      </div>
    </section>
  `;
};
