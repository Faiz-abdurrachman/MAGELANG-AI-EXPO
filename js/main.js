(function () {
  const app = document.getElementById("app");
  if (!app) return;

  const A = window.SorceryApp;
  const sealDivider = `<div class="section-divider">${window.SorceryIcons.seal}</div>`;

  app.innerHTML = `
    ${A.nav()}
    ${A.hero()}
    ${A.stats()}
    ${A.trusted()}
    ${A.why()}
    ${sealDivider}
    ${A.format()}
    ${A.agenda()}
    ${A.investors()}
    ${A.value()}
    ${A.process()}
    ${A.map()}
    ${A.form()}
    ${A.faq()}
    ${sealDivider}
    ${A.cta()}
    ${A.footer()}
  `;

  /* Init interactions after DOM mounted */
  window.SorceryScroll.init();
  A.navInit();
  A.faqInit();
  A.formInit();
  A.heroInit();

  /* Countdowns — hero + final CTA both tick to deadline */
  const deadline = window.SorceryData.event.deadline;
  window.SorceryCountdown.start(deadline, document.getElementById("hero-countdown"));
  window.SorceryCountdown.start(deadline, document.getElementById("cta-countdown"));
})();
