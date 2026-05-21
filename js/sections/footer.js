window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.footer = function () {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            <h3>${window.SorceryIcons.logo} Magelang AI Expo</h3>
            <small>AI Expo 2026</small>
            <p>Expo produk AI yang mempertemukan builder, pelaku bisnis, calon pengguna, dan partner strategis di Magelang pada 4 Juni 2026.</p>
          </div>

          <div class="footer__col">
            <h4>Acara</h4>
            <ul>
              <li><a href="#about">Tentang</a></li>
              <li><a href="#format">Format Venue</a></li>
              <li><a href="#agenda">Agenda</a></li>
              <li><a href="#investors">Tamu</a></li>
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
              <li>Lokal Folk Cafe</li>
              <li>Magelang, Indonesia</li>
              <li><a href="#">Instagram · LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div class="footer__crest">${window.SorceryIcons.crest}</div>

        <div class="footer__bottom">
          <div>© 2026 Magelang AI Expo. All rights reserved.</div>
          <div>Showcasing Practical AI for Local Business.</div>
        </div>
      </div>
    </footer>
  `;
};
