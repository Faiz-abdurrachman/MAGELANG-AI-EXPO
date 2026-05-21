window.SorceryApp = window.SorceryApp || {};

window.SorceryApp.hero = function () {
  return `
    <section class="hero" id="top">
      <!-- 
        Sticky Container: This holds the canvas and the content in place
        while the parent section scrolls past.
      -->
      <div class="hero__sticky">
        
        <!-- Canvas for Image Sequence -->
        <canvas class="hero__canvas" id="hero-canvas"></canvas>
        
        <!-- Overlay to ensure text readability -->
        <div class="hero__video-overlay"></div>

        <!-- Foreground Content -->
        <div class="container hero__inner">
          <div class="hero__grid">
            <div class="hero__content">
              <div class="hero__badge reveal">
                <span>Magelang AI Expo · 4 Juni 2026</span>
              </div>

              <h1 class="hero__headline reveal">
                Koneksi Nyata,<br>
                Bukan Sekadar <span class="hero__headline-accent">Seremoni<em>.</em></span>
              </h1>

              <p class="hero__sub reveal">
                Panggung untuk produk AI yang nyata: demo langsung, validasi dari pelaku bisnis, dan ruang bertemu orang-orang yang bisa membuka peluang kolaborasi.
              </p>

              <div class="hero__actions reveal">
                <a href="#register" class="btn btn-holographic btn--lg">Daftarkan Produk AI Anda →</a>
                <a href="#investors" class="hero__link-arrow">
                  Lihat Tamu & Partner
                  <span aria-hidden="true">↗</span>
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
  
  const frameCount = 192; // Total frames extracted
  const currentFrame = index => (
    `assets/sequence/frame_${(index + 1).toString().padStart(4, '0')}.webp`
  );

  // Array to hold the preloaded Image objects
  const images = [];
  let imagesLoaded = 0;
  
  // Object to keep track of drawing state to avoid redundant renders
  const state = {
    frameIndex: 0,
    width: 0,
    height: 0
  };

  // 1. Preload all images for buttery smooth playback
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    // Draw the very first frame as soon as it loads to prevent empty background
    if (i === 0) {
      img.onload = () => {
        resizeCanvas();
        updateImage(0);
      };
    }
    images.push(img);
  }

  // 2. Resize canvas correctly (cover aspect ratio)
  function resizeCanvas() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    
    // Scale for high DPI displays (Retina) to keep it crisp
    const dpr = window.devicePixelRatio || 1;
    canvas.width = state.width * dpr;
    canvas.height = state.height * dpr;
    context.scale(dpr, dpr);
    
    // Force a redraw on resize
    updateImage(state.frameIndex, true);
  }

  // 3. Draw image to canvas using "cover" sizing logic
  function updateImage(index, force = false) {
    if (state.frameIndex === index && !force) return;
    state.frameIndex = index;
    
    const img = images[index];
    if (!img || !img.complete) return; // Skip if not loaded yet
    
    // Calculate aspect ratio covering
    const imgRatio = img.width / img.height;
    const canvasRatio = state.width / state.height;
    let drawWidth, drawHeight, x, y;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      drawHeight = state.height;
      drawWidth = img.height * imgRatio;
      x = (state.width - drawWidth) / 2;
      y = 0;
    } else {
      // Canvas is wider than image
      drawWidth = state.width;
      drawHeight = state.width / imgRatio;
      x = 0;
      y = (state.height - drawHeight) / 2;
    }

    context.clearRect(0, 0, state.width, state.height);
    context.drawImage(img, x, y, drawWidth, drawHeight);
  }

  // 4. Scroll Logic
  const heroSection = document.querySelector('.hero');
  let ticking = false;

  function onScroll() {
    // Only calculate while within the hero section bounds
    const rect = heroSection.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    
    // Scroll progress from 0.0 to 1.0
    // Starts when section is at top of viewport, ends when sticky container hits bottom
    const scrollDistance = sectionHeight - window.innerHeight;
    
    // If section hasn't reached top yet or is already passed, handle bounds
    if (sectionTop > 0) {
      updateImage(0);
      return;
    }
    
    // Calculate progress (0 to 1)
    let progress = Math.abs(sectionTop) / scrollDistance;
    progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
    
    // Calculate which frame to show
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(progress * frameCount)
    );
    
    // Use requestAnimationFrame for smooth drawing
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateImage(frameIndex);
        ticking = false;
      });
      ticking = true;
    }
  }

  // Event Listeners
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', onScroll, { passive: true });
};