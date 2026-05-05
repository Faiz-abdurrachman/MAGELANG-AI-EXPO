window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.process = function () {
  const cards = window.SorceryData.process
    .map(
      (p) => `
        <div class="process__card-wrapper reveal">
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
          <h2 class="section-title">Bagaimana Kami<br>Memilih 10 Startup.</h2>
          <p class="section-subtitle">Empat tahap kurasi yang transparan. Tidak ada nepotisme—hanya metrik bisnis dan kesiapan pitch yang menentukan.</p>
        </div>
        <div class="process__grid">${cards}</div>
      </div>
    </section>
  `;
};
