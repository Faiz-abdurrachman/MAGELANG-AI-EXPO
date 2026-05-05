window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.process = function () {
  const cards = window.SorceryData.process
    .map(
      (p) => `
        <div class="process__card reveal">
          <div class="process__step">Step ${p.step}</div>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
        </div>
      `
    )
    .join("");

  return `
    <section class="section process">
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
