window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.map = function () {
  return `
    <section class="section map" id="location">
      <div class="container">
        <div class="map__grid">
          <div class="map__content reveal">
            <span class="eyebrow">The Venue</span>
            <h2 class="section-title">Lokal Folk Cafe,<br>Magelang.</h2>
            <p class="section-subtitle">Berlokasi di Lokal Folk Cafe Magelang, venue ini dipilih untuk suasana yang lebih hangat, santai, dan cocok untuk demo produk serta networking yang natural.</p>
            
            <div class="map__info">
              <div class="map__info-item">
                <strong>Alamat</strong>
                <p>Lokal Folk Cafe, Magelang</p>
              </div>
              <div class="map__info-item">
                <strong>Aksesibilitas</strong>
                <p>Mudah dijangkau di area Magelang dengan suasana cafe yang nyaman untuk ngobrol, demo produk, dan pertemuan informal.</p>
              </div>
            </div>

            <a href="https://maps.app.goo.gl/VBFcNCqUjxprmiv16" target="_blank" rel="noopener noreferrer" class="btn btn--white-blue">
              Cari di Google Maps ↗
            </a>
          </div>

          <div class="map__frame-wrapper reveal">
            <iframe
              src="https://www.google.com/maps?q=Lokal%20Folk%20Cafe%20Magelang&output=embed"
              width="100%"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  `;
};
