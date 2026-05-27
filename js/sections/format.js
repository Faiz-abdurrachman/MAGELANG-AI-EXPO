window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.format = function () {
  const cards = window.SorceryData.zones
    .map(
      (z, i) => `
        <div class="format__card-wrapper reveal reveal--scale" data-format>
          <div class="format__card" role="button" tabindex="0" aria-expanded="false">
            <div class="format__slide format__slide--1">
              <div class="format__num">Zone 0${i + 1}</div>
              <div class="format__name">${z.name}</div>
              <div class="format__role">${z.role}</div>
              <span class="format__chevron" aria-hidden="true"></span>
            </div>
            <div class="format__slide format__slide--2">
              <div class="format__content">
                <p class="format__desc">${z.desc}</p>
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section format" id="format">
      <div class="container">
        <div class="format__head reveal">
          <h2 class="section-title">Tiga Zona, Satu Hari Penuh</h2>
          <p class="section-subtitle">Venue acara diatur menjadi tiga zona spesifik, masing-masing dirancang untuk format interaksi yang berbeda. Tamu dapat berpindah dari demo, booth, hingga lounge diskusi tanpa alur yang rumit.</p>
        </div>
        <div class="format__grid reveal-stagger">${cards}</div>
      </div>
    </section>
  `;
};

window.SorceryApp.formatInit = function () {
  const mq = window.matchMedia("(min-width: 1024px)");
  const items = document.querySelectorAll("[data-format]");
  let attached = false;

  function toggleCard(item) {
    const panel = item.querySelector(".format__slide--2");
    if (!panel) return;
    const card = item.querySelector(".format__card");
    const isOpen = item.classList.contains("is-open");

    if (isOpen) {
      panel.style.maxHeight = panel.scrollHeight + "px";
      requestAnimationFrame(() => {
        panel.style.maxHeight = "0px";
      });
      item.classList.remove("is-open");
      if (card) card.setAttribute("aria-expanded", "false");
    } else {
      item.classList.add("is-open");
      panel.style.maxHeight = panel.scrollHeight + "px";
      if (card) card.setAttribute("aria-expanded", "true");
    }
  }

  function attachAccordion() {
    if (attached) return;
    attached = true;

    items.forEach((item) => {
      const card = item.querySelector(".format__card");
      if (!card) return;

      card.addEventListener("click", () => toggleCard(item));

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleCard(item);
        }
      });
    });
  }

  function cleanupForDesktop() {
    attached = false;
    items.forEach((item) => {
      item.classList.remove("is-open");
      const panel = item.querySelector(".format__slide--2");
      if (panel) panel.style.maxHeight = "";
      const card = item.querySelector(".format__card");
      if (card) card.setAttribute("aria-expanded", "false");
    });
  }

  if (!mq.matches) {
    attachAccordion();
  }

  mq.addEventListener("change", (e) => {
    if (e.matches) {
      cleanupForDesktop();
    } else {
      attachAccordion();
    }
  });
};
