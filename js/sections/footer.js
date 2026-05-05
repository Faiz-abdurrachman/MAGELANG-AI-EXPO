window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.footer = function () {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            <h3>${window.SorceryIcons.logo} Sorcery MTI</h3>
            <small>Meet The Investor 2026</small>
            <p>Matchmaking summit eksklusif yang mempertemukan inovasi regional terbaik dengan pemodal nasional. Diselenggarakan di Jogja-Magelang, 30 Agustus 2026.</p>
          </div>

          <div class="footer__col">
            <h4>Acara</h4>
            <ul>
              <li><a href="#about">Tentang</a></li>
              <li><a href="#format">Format Venue</a></li>
              <li><a href="#agenda">Agenda</a></li>
              <li><a href="#investors">Investor</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4>Daftar</h4>
            <ul>
              <li><a href="#register">Form Pendaftaran</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="mailto:press@sorcery.id">Press Inquiry</a></li>
              <li><a href="mailto:partnership@sorcery.id">Partnership</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4>Kontak</h4>
            <ul>
              <li><a href="mailto:partnership@sorcery.id">partnership@sorcery.id</a></li>
              <li>Lokalfolk Cafe</li>
              <li>Yogyakarta, Indonesia</li>
              <li><a href="#">Instagram · LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div class="footer__crest">${window.SorceryIcons.crest}</div>

        <div class="footer__bottom">
          <div>© 2026 Sorcery Indonesia. All rights reserved.</div>
          <div>Connecting Regional Innovation to National Capital.</div>
        </div>
      </div>
    </footer>
  `;
};
