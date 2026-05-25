window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.stats = function () {
  const items = window.SorceryData.stats
    .map(
      (s, i) => `
        <div class="stats__item-wrapper reveal">
          <div class="stats__item">
            <div class="stats__front">
              <div class="stats__num" data-count="${s.value.replace(/[^0-9]/g, '') || '0'}">${s.value.match(/^\d+/) ? '0' : s.value}</div>
              <div class="stats__label">${s.label}</div>
              <div class="stats__hint">Klik untuk detail →</div>
            </div>
            <div class="stats__back">
              <p class="stats__desc">${s.desc}</p>
              <div class="stats__back-label">${s.label}</div>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section stats">
      <div class="container">
        <div class="stats__grid reveal-stagger">${items}</div>
      </div>
    </section>
  `;
};
