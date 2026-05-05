window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.agenda = function () {
  const items = window.SorceryData.agenda
    .map(
      (a) => `
        <div class="agenda__item reveal">
          <div class="agenda__time">${a.time}</div>
          <div class="agenda__title">${a.title}</div>
          <p class="agenda__desc">${a.desc}</p>
          <span class="agenda__tag">${a.tag}</span>
        </div>
      `
    )
    .join("");

  return `
    <section class="section agenda" id="agenda">
      <div class="container">
        <div class="agenda__head reveal">
          <span class="eyebrow">Agenda · 30 Agustus 2026</span>
          <h2 class="section-title">Rundown<br>Sorcery MTI 2026.</h2>
          <p class="section-subtitle">Enam jam disusun rapat—dari welcoming AI Wayang Portrait hingga sesi tertutup Speed Dating, dimana deal sebenarnya dimulai.</p>
        </div>
        <div class="agenda__list">${items}</div>
      </div>
    </section>
  `;
};
