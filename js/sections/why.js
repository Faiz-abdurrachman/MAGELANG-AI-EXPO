window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.why = function () {
  const cards = window.SorceryData.pillars
    .map(
      (p) => `
        <div class="why__card ios-glass--dark reveal">
          <div class="why__num">${p.number}</div>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
        </div>
      `
    )
    .join("");

  return `
    <section class="section why" id="about">
      <div class="container">
        <div class="why__head reveal">
          <span class="eyebrow">Mengapa Sorcery MTI Berbeda</span>
          <h2 class="section-title">Lebih dari Sekadar<br>Panggung Presentasi.</h2>
          <p class="section-subtitle">Setiap detail dirancang untuk satu tujuan—mempercepat percakapan substantif antara founder dengan modal, tanpa formalitas yang tidak perlu.</p>
        </div>
        <div class="why__grid">${cards}</div>
      </div>
    </section>
  `;
};
