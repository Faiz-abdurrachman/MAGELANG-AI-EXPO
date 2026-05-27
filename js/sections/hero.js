window.SorceryApp = window.SorceryApp || {};

window.SorceryApp.hero = function () {
  return `
    <section class="hero" id="top">
      <div class="hero__sticky">
        <canvas class="hero__canvas" id="hero-canvas"></canvas>
        <div class="hero__video-overlay"></div>
        <div class="hero__canvas-vignette" aria-hidden="true"></div>
        <div class="container hero__inner">
          <div class="hero__grid">
            <div class="hero__content">
              <h1 class="hero__headline reveal">
                Koneksi Nyata,<br>
                Bukan Sekadar<br>
                <span class="hero__headline-accent">Seremoni<em>.</em></span>
              </h1>
              <div class="hero__badge reveal">
                <span>Magelang AI Expo 4 Juni 2026</span>
              </div>
              <p class="hero__sub reveal">
                Panggung untuk produk AI yang nyata: demo langsung, validasi dari pelaku bisnis, dan ruang bertemu orang-orang yang bisa membuka peluang kolaborasi.
              </p>
              <div class="hero__actions reveal">
                <a href="#register" class="btn btn-holographic btn--lg">Daftarkan Produk Anda</a>
                <a href="#investors" class="hero__link-arrow">
                  Lihat Tamu & Partner
                </a>
              </div>
            </div>
            <aside class="hero__ticket reveal" aria-label="Detail acara">
              <div class="hero__ticket-head">
                <span class="hero__ticket-tag">Event Brief</span>
                <span class="hero__ticket-id">#MAE-2026</span>
              </div>
              <div class="hero__ticket-body">
                <div class="hero__ticket-row">
                  <span class="hero__ticket-label">Tanggal</span>
                  <span class="hero__ticket-value">4 Juni 2026</span>
                  <span class="hero__ticket-meta">Kamis · 09:00 — 17:00 WIB</span>
                </div>
                <div class="hero__ticket-divider"></div>
                <div class="hero__ticket-row">
                  <span class="hero__ticket-label">Venue</span>
                  <span class="hero__ticket-value">Lokal Folk Cafe</span>
                  <span class="hero__ticket-meta">Magelang · Intimate Venue</span>
                </div>
                <div class="hero__ticket-divider"></div>
                <div class="hero__ticket-row hero__ticket-row--countdown">
                  <span class="hero__ticket-label">Closing In</span>
                  <div class="countdown" id="hero-countdown"></div>
                </div>
              </div>
              <div class="hero__ticket-foot">
                <span>10 Produk / Tim Terkurasi</span>
                <span>·</span>
                <span>25+ Business Guests</span>
                <span>·</span>
                <span>Demo · Feedback · Matching</span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  `;
};

window.SorceryApp.heroInit = function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');

  const isMobile = window.innerWidth < 1024;

  /* =============================================
     MOBILE: Static cinematic background — no scroll animation
     ============================================= */
  if (isMobile) {
    const img = new Image();
    img.src = 'assets/sequence/frame_0001.webp';
    img.onload = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const imgRatio = img.width / img.height;
      const canvasRatio = w / h;
      let dw, dh, dx, dy;
      if (imgRatio > canvasRatio) {
        dh = h; dw = h * imgRatio; dx = (w - dw) / 2; dy = 0;
      } else {
        dw = w; dh = w / imgRatio; dx = 0; dy = (h - dh) / 2;
      }
      context.drawImage(img, dx, dy, dw, dh);
    };

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!img.complete) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;
        let dw, dh, dx, dy;
        if (imgRatio > canvasRatio) {
          dh = h; dw = h * imgRatio; dx = (w - dw) / 2; dy = 0;
        } else {
          dw = w; dh = w / imgRatio; dx = 0; dy = (h - dh) / 2;
        }
        context.drawImage(img, dx, dy, dw, dh);
      }, 200);
    });
    return;
  }

  /* =============================================
     DESKTOP: Full cinematic scroll-driven frame sequence
     ============================================= */
  const frameCount = 192;
  const frameStep = 1;

  const currentFrame = index => (
    `assets/sequence/frame_${(index + 1).toString().padStart(4, '0')}.webp`
  );

  const images = [];
  let loadedCount = 0;

  const state = {
    frameIndex: 0,
    width: 0,
    height: 0
  };

  function preloadRange(start, end) {
    for (let i = start; i < end && i < frameCount; i += frameStep) {
      if (images[i] && images[i].complete) continue;
      if (!images[i]) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => { loadedCount++; };
        images[i] = img;
      }
    }
  }

  preloadRange(0, Math.min(24, frameCount));

  if (images[0]) {
    images[0].onload = () => {
      resizeCanvas();
      updateImage(0);
    };
  }

  let batchIndex = 24;
  function loadNextBatch() {
    if (batchIndex >= frameCount) return;
    const batchEnd = Math.min(batchIndex + 24, frameCount);
    preloadRange(batchIndex, batchEnd);
    batchIndex = batchEnd;
    if (batchIndex < frameCount) {
      setTimeout(loadNextBatch, 100);
    }
  }
  setTimeout(loadNextBatch, 500);

  let resizeTimer;
  function resizeCanvas() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = state.width * dpr;
    canvas.height = state.height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    updateImage(state.frameIndex, true);
  }

  function updateImage(index, force) {
    if (state.frameIndex === index && !force) return;
    state.frameIndex = index;
    const img = images[index];
    if (!img || !img.complete) {
      for (let offset = frameStep; offset < 10 * frameStep; offset += frameStep) {
        const prev = images[index - offset];
        if (prev && prev.complete) { state.frameIndex = index - offset; drawFrame(prev); return; }
      }
      return;
    }
    drawFrame(img);
  }

  function drawFrame(img) {
    const imgRatio = img.width / img.height;
    const canvasRatio = state.width / state.height;
    let drawWidth, drawHeight, x, y;
    if (imgRatio > canvasRatio) {
      drawHeight = state.height;
      drawWidth = state.height * imgRatio;
      x = (state.width - drawWidth) / 2;
      y = 0;
    } else {
      drawWidth = state.width;
      drawHeight = state.width / imgRatio;
      x = 0;
      y = (state.height - drawHeight) / 2;
    }
    context.clearRect(0, 0, state.width, state.height);
    context.drawImage(img, x, y, drawWidth, drawHeight);
  }

  const heroSection = document.querySelector('.hero');
  let ticking = false;

  function onScroll() {
    const rect = heroSection.getBoundingClientRect();
    const sectionTop = rect.top;
    const scrollDistance = rect.height - window.innerHeight;
    if (sectionTop > 0) { updateImage(0); return; }
    let progress = Math.abs(sectionTop) / scrollDistance;
    progress = Math.max(0, Math.min(1, progress));
    const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));

    preloadRange(Math.max(0, frameIndex - 3 * frameStep), Math.min(frameCount, frameIndex + 10 * frameStep));

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateImage(frameIndex);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 150);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
};
