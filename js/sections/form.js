window.SorceryApp = window.SorceryApp || {};

window.SorceryApp.form = function () {
  return `
    <section class="section form" id="register">
      <div class="container">
        <div class="form__layout">
          <div class="form__intro reveal">
            <span class="eyebrow">Apply Now</span>
            <h2>Ambil Kesempatan Anda di Sorcery MTI 2026.</h2>
            <p>Kami menyeleksi ketat 10 startup yang siap dipertemukan dengan pemodal. Pengisian form butuh sekitar 4 menit—pastikan link pitch deck dapat diakses publik.</p>
            <div class="form__intro-meta">
              <div><span>Deadline</span><span>30 Agustus 2026</span></div>
              <div><span>Biaya Partisipasi</span><span>Rp 0 (Gratis)</span></div>
              <div><span>Pengumuman Shortlist</span><span>H-14 Event</span></div>
              <div><span>Slot Tersedia</span><span>10 Startup</span></div>
            </div>
          </div>

          <form class="form__box reveal" id="apply-form" novalidate>
            <div class="form__field">
              <label class="form__label" for="f-startup">Nama Startup</label>
              <input class="form__input" type="text" id="f-startup" name="startup" autocomplete="organization">
              <span class="form__error" data-error="startup"></span>
            </div>

            <div class="form__field">
              <label class="form__label" for="f-founder">Nama Founder / CEO</label>
              <input class="form__input" type="text" id="f-founder" name="founder" autocomplete="name">
              <span class="form__error" data-error="founder"></span>
            </div>

            <div class="form__row">
              <div class="form__field">
                <label class="form__label" for="f-email">Email Bisnis</label>
                <input class="form__input" type="email" id="f-email" name="email" autocomplete="email">
                <span class="form__error" data-error="email"></span>
              </div>
              <div class="form__field">
                <label class="form__label" for="f-phone">No. WhatsApp</label>
                <input class="form__input" type="tel" id="f-phone" name="phone" autocomplete="tel" placeholder="+62...">
                <span class="form__error" data-error="phone"></span>
              </div>
            </div>

            <div class="form__row">
              <div class="form__field">
                <label class="form__label" for="f-category">Kategori Industri</label>
                <select class="form__select" id="f-category" name="category">
                  <option value="">Pilih kategori...</option>
                  <option>AI / Machine Learning</option>
                  <option>SaaS B2B</option>
                  <option>Fintech</option>
                  <option>AgriTech</option>
                  <option>HealthTech</option>
                  <option>EdTech</option>
                  <option>Marketplace</option>
                  <option>Logistics</option>
                  <option>ClimateTech</option>
                  <option>DeepTech</option>
                  <option>Lainnya</option>
                </select>
                <span class="form__error" data-error="category"></span>
              </div>
              <div class="form__field">
                <label class="form__label" for="f-stage">Funding Stage</label>
                <select class="form__select" id="f-stage" name="stage">
                  <option value="">Pilih stage...</option>
                  <option>Bootstrapped</option>
                  <option>Pre-Seed</option>
                  <option>Seed</option>
                  <option>Bridge</option>
                  <option>Series A</option>
                </select>
                <span class="form__error" data-error="stage"></span>
              </div>
            </div>

            <div class="form__field">
              <label class="form__label" for="f-traction">Traction Metrics Singkat</label>
              <textarea class="form__textarea" id="f-traction" name="traction" rows="3" placeholder="Contoh: MRR Rp 50jt, 1.200 paying users, MoM growth 15%"></textarea>
              <span class="form__error" data-error="traction"></span>
            </div>

            <div class="form__field">
              <label class="form__label" for="f-deck">Link Pitch Deck</label>
              <input class="form__input" type="url" id="f-deck" name="deck" placeholder="https://...">
              <span class="form__hint">Pastikan link Google Drive / Notion / DocSend dapat diakses publik—atau cantumkan password di kolom traction di atas.</span>
              <span class="form__error" data-error="deck"></span>
            </div>

            <button type="submit" class="btn btn--solid btn--lg form__submit">Kirim Aplikasi Pitching</button>
          </form>
        </div>
      </div>
    </section>
  `;
};

window.SorceryApp.formInit = function () {
  const form = document.getElementById("apply-form");
  if (!form) return;

  const showError = (name, msg) => {
    const el = form.querySelector(`[data-error="${name}"]`);
    if (el) el.textContent = msg || "";
  };

  const fields = ["startup", "founder", "email", "phone", "category", "stage", "traction", "deck"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fields.forEach((f) => showError(f, ""));

    const data = new FormData(form);
    let valid = true;

    if (!String(data.get("startup") || "").trim()) { showError("startup", "Nama startup wajib diisi."); valid = false; }
    if (!String(data.get("founder") || "").trim()) { showError("founder", "Nama founder wajib diisi."); valid = false; }

    const email = String(data.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("email", "Format email tidak valid."); valid = false; }

    if (!String(data.get("phone") || "").trim()) { showError("phone", "Nomor WhatsApp wajib diisi."); valid = false; }
    if (!data.get("category")) { showError("category", "Pilih kategori industri."); valid = false; }
    if (!data.get("stage"))    { showError("stage",    "Pilih funding stage.");    valid = false; }

    if (!String(data.get("traction") || "").trim()) { showError("traction", "Cantumkan minimal satu metrik traksi."); valid = false; }

    const deck = String(data.get("deck") || "").trim();
    if (!/^https?:\/\/.+\..+/.test(deck)) { showError("deck", "Cantumkan link valid (https://...)."); valid = false; }

    if (!valid) {
      const firstErr = form.querySelector(".form__error:not(:empty)");
      if (firstErr) {
        const top = firstErr.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: "smooth" });
      }
      return;
    }

    /* Success state — replace form contents */
    form.innerHTML = `
      <div class="form__success">
        <h3>Aplikasi Terkirim ✓</h3>
        <p>Terima kasih, <strong>${escape(String(data.get("founder")))}</strong>. Tim kurasi akan menghubungi melalui <strong>${escape(email)}</strong> dalam 7 hari kerja. Mohon cek folder spam Anda.</p>
      </div>
    `;
  });

  function escape(s) {
    return s.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
  }
};
