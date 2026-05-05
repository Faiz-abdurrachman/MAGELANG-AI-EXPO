window.SorceryApp = window.SorceryApp || {};
window.SorceryApp.map = function () {
  return `
    <section class="section map" id="location">
      <div class="container">
        <div class="map__grid">
          <div class="map__content reveal">
            <span class="eyebrow">The Venue</span>
            <h2 class="section-title">Gedung Tri Bhakti,<br>Kota Magelang.</h2>
            <p class="section-subtitle">Terletak strategis di Magelang, venue ini menyediakan ruang yang luas dan fasilitas premium untuk mendukung skala acara yang lebih besar dan nyaman.</p>
            
            <div class="map__info">
              <div class="map__info-item">
                <strong>Alamat</strong>
                <p>Jl. Pahlawan No.100, Potrobangsan, Kec. Magelang Utara, Kota Magelang, Jawa Tengah 56116</p>
              </div>
              <div class="map__info-item">
                <strong>Aksesibilitas</strong>
                <p>Mudah dijangkau dari pusat kota Magelang. Area parkir sangat luas untuk seluruh tamu undangan dan VIP.</p>
              </div>
            </div>

            <a href="https://maps.app.goo.gl/uX3L5GAtBvX2XGat9" target="_blank" class="btn btn--outline">
              Buka di Google Maps ↗
            </a>
          </div>

          <div class="map__frame-wrapper reveal">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.334114755122!2d110.22020277588975!3d-7.461466673551065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8f60f69c5e25%3A0x6d11598f80456c24!2sGedung%20Tri%20Bhakti!5e0!3m2!1sid!2sid!4v1715000000000!5m2!1sid!2sid" 
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
