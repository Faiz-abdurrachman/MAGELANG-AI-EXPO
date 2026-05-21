window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.agenda = function () {
  const items = window.SorceryData.agenda
    .map(
      (a, i) => `
        <div class="agenda__item reveal">
          <div class="agenda__marker">
            <span class="agenda__marker-line"></span>
            <span class="agenda__marker-dot"></span>
          </div>
          <div class="agenda__content-box">
            <div class="agenda__top">
              <span class="agenda__time">${a.time}</span>
              <span class="agenda__tag">${a.tag}</span>
            </div>
            <h3 class="agenda__title">${a.title}</h3>
            <p class="agenda__desc">${a.desc}</p>
          </div>
          <div class="agenda__index" aria-hidden="true">0${i + 1}</div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section agenda" id="agenda">
      <div class="container">
        <div class="agenda__head reveal">
          <span class="eyebrow">The Sequence</span>
          <h2 class="section-title">Enam Jam,<br>Masa Depan Inovasi.</h2>
          <p class="section-subtitle">Disusun untuk memudahkan demo, feedback, networking, dan percakapan bisnis yang realistis dalam satu hari.</p>
        </div>
        <div class="agenda__list">${items}</div>
      </div>
    </section>
  `;
};
