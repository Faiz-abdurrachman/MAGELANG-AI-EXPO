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

  /* Init interactions after DOM mounted — each isolated so one failure cannot block others */
  try {
    if (window.SorceryScroll && typeof window.SorceryScroll.init === 'function') {
      window.SorceryScroll.init();
    }
  } catch (e) { console.error("Scroll init:", e); }

  try {
    if (typeof A.navInit === 'function') A.navInit();
  } catch (e) { console.error("Nav init:", e); }

  try {
    if (typeof A.faqInit === 'function') A.faqInit();
  } catch (e) { console.error("FAQ init:", e); }

  try {
    if (typeof A.formatInit === 'function') A.formatInit();
  } catch (e) { console.error("Format init:", e); }

  try {
    if (typeof A.formInit === 'function') A.formInit();
  } catch (e) { console.error("Form init:", e); }

  try {
    if (typeof A.heroInit === 'function') A.heroInit();
  } catch (e) { console.error("Hero init:", e); }

  try {
    const deadline = D.event.deadline;
    if (window.SorceryCountdown && typeof window.SorceryCountdown.start === 'function') {
      window.SorceryCountdown.start(deadline, document.getElementById("hero-countdown"));
      window.SorceryCountdown.start(deadline, document.getElementById("cta-countdown"));
    }
  } catch (e) { console.error("Countdown init:", e); }

  try {
    if (typeof A.loaderInit === 'function') A.loaderInit();
  } catch (e) { console.error("Loader init:", e); }
});
