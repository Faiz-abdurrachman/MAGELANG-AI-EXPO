window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.trusted = function () {
  const logos = window.SorceryData.vcLogos
    .map((name) => `<div class="trusted__logo">${name}</div>`)
    .join("");

  return `
    <section class="trusted">
      <div class="container">
        <div class="trusted__label">Dihadiri & dipercaya oleh top venture capital regional</div>
      </div>
      <div class="trusted__marquee">
        <div class="trusted__track">
          ${logos}${logos}
        </div>
      </div>
    </section>
  `;
};
