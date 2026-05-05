window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.investors = function () {
  const cards = window.SorceryData.investors
    .map(
      (inv) => `
        <div class="investors__card reveal">
          <div class="investors__title">${inv.title}</div>
          <div class="investors__thesis">${inv.thesis}</div>
          <div class="investors__meta">
            <div class="investors__meta-row">
              <span class="investors__meta-label">Ticket Size</span>
              <span class="investors__meta-value">${inv.ticket}</span>
            </div>
            <div class="investors__meta-row">
              <span class="investors__meta-label">Track Record</span>
              <span class="investors__meta-value">${inv.portfolio}</span>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <section class="section investors" id="investors">
      <div class="container">
        <div class="investors__head reveal">
          <span class="eyebrow">Investor Spotlight</span>
          <h2 class="section-title">Siapa yang Akan<br>Bertemu Anda?</h2>
          <p class="section-subtitle">Profil partner senior, managing director, dan angel syndicate yang dikonfirmasi hadir. Daftar lengkap—termasuk identitas spesifik—dirilis ke shortlisted founders pasca kurasi.</p>
        </div>
        <div class="investors__grid">${cards}</div>
        <p class="investors__note">* Identitas konkret dirilis bertahap setelah seleksi shortlist · NDA-protected sebelum hari acara.</p>
      </div>
    </section>
  `;
};
