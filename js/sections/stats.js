window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.stats = function () {
  const items = window.SorceryData.stats
    .map(
      (s) => `
        <div class="stats__item ios-glass reveal">
          <div class="stats__num">${s.value}</div>
          <div class="stats__label">${s.label}</div>
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
