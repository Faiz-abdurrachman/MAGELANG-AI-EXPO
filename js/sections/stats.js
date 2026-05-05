window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.stats = function () {
  const items = window.SorceryData.stats
    .map(
      (s, i) => `
        <div class="stats__item-wrapper reveal">
          <div class="stats__item ${i === 1 ? 'stats__item--red' : ''}">
            <div class="stats__front">
              <div class="stats__num">${s.value}</div>
              <div class="stats__label">${s.label}</div>
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
    <section class="stats">
      <div class="container">
        <div class="stats__grid">${items}</div>
      </div>
    </section>
  `;
};
