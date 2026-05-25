window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById("app");
  if (!app) return;

  const A = window.SorceryApp || {};
  const D = window.SorceryData;

  if (!D) {
    app.innerHTML = `<div style="color:white; padding:2rem; text-align:center;"><h1>Data Error</h1><p>window.SorceryData is not defined. Please check if js/data.js is loading correctly.</p></div>`;
    return;
  }

  try {
    app.innerHTML = `
      ${typeof A.nav === 'function' ? A.nav() : ''}
      ${typeof A.hero === 'function' ? A.hero() : ''}
      ${typeof A.stats === 'function' ? A.stats() : ''}
      ${typeof A.why === 'function' ? A.why() : ''}
      ${typeof A.format === 'function' ? A.format() : ''}
      ${typeof A.agenda === 'function' ? A.agenda() : ''}
      ${typeof A.investors === 'function' ? A.investors() : ''}
      ${typeof A.value === 'function' ? A.value() : ''}
      ${typeof A.process === 'function' ? A.process() : ''}
      ${typeof A.map === 'function' ? A.map() : ''}
      ${typeof A.form === 'function' ? A.form() : ''}
      ${typeof A.faq === 'function' ? A.faq() : ''}
      ${typeof A.cta === 'function' ? A.cta() : ''}
      ${typeof A.footer === 'function' ? A.footer() : ''}
    `;
  } catch (err) {
    console.error("Render error:", err);
    app.innerHTML = `<div style="color:white; padding:2rem; text-align:center;"><h1>Render Error</h1><p>${err.message}</p></div>`;
    return;
  }

  /* Init interactions after DOM mounted */
  try {
    if (window.SorceryScroll && typeof window.SorceryScroll.init === 'function') {
      window.SorceryScroll.init();
    }
    if (typeof A.navInit === 'function') A.navInit();
    if (typeof A.faqInit === 'function') A.faqInit();
    if (typeof A.formInit === 'function') A.formInit();
    if (typeof A.heroInit === 'function') A.heroInit();

    /* Countdowns */
    const deadline = D.event.deadline;
    if (window.SorceryCountdown && typeof window.SorceryCountdown.start === 'function') {
      window.SorceryCountdown.start(deadline, document.getElementById("hero-countdown"));
      window.SorceryCountdown.start(deadline, document.getElementById("cta-countdown"));
    }
  } catch (err) {
    console.error("Init error:", err);
  }
});
