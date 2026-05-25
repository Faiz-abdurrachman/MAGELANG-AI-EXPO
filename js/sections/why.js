window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.why = function () {
  const cards = window.SorceryData.pillars
    .map(
      (p) => `
        <article class="why__card reveal reveal--rotate">
          <div class="why__shine" data-speed="0.08"></div>
          <div class="why__num" aria-hidden="true">${p.number}</div>
          <div class="why__body">
            <h3 class="why__title">${p.title}</h3>
            <p class="why__desc">${p.desc}</p>
          </div>
          <div class="why__cue" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </div>
        </article>
      `
    )
    .join("");

  return `
    <section class="section why" id="about">
      <div class="container">
        <div class="why__head reveal">
          <span class="eyebrow">Mengapa Magelang AI Expo Berbeda</span>
          <h2 class="section-title">Bukan Janji Investasi,<br>Tapi Ruang Bertemu yang Nyata.</h2>
          <p class="section-subtitle">Setiap sesi dirancang agar founder AI bisa menjelaskan produknya dengan jelas, bertemu calon pengguna, dan membuka percakapan bisnis yang realistis.</p>
        </div>
        <div class="why__grid reveal-stagger">${cards}</div>
      </div>
    </section>
  `;
};
