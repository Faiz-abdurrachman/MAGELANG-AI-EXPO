window.SorceryApp = window.SorceryApp || {};

window.SorceryApp.faq = function () {
  const items = window.SorceryData.faq
    .map(
      (f) => `
        <div class="faq__item" data-faq>
          <button class="faq__trigger" type="button">
            <span>${f.q}</span>
            <span class="faq__icon" aria-hidden="true"></span>
          </button>
          <div class="faq__panel">
            <div class="faq__panel-inner">${f.a}</div>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section faq" id="faq">
      <div class="container">
        <div class="faq__grid">
          <div class="faq__head reveal">
            <h2 class="section-title">Pertanyaan yang<br>Sering Diajukan</h2>
            <p class="section-subtitle">Jika pertanyaan Anda belum tercakup, hubungi tim kami di <a href="mailto:partnership@sorcery.id" class="text-red">partnership@sorcery.id</a> kami merespons dalam 24 jam kerja.</p>
          </div>
          <div class="faq__list reveal">${items}</div>
        </div>
      </div>
    </section>
  `;
};

window.SorceryApp.faqInit = function () {
  const items = document.querySelectorAll("[data-faq]");
  items.forEach((item) => {
    const trigger = item.querySelector(".faq__trigger");
    const panel   = item.querySelector(".faq__panel");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      /* Close all */
      items.forEach((other) => {
        other.classList.remove("is-open");
        const op = other.querySelector(".faq__panel");
        if (op) op.style.maxHeight = "0px";
      });

      if (!isOpen) {
        item.classList.add("is-open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
};
