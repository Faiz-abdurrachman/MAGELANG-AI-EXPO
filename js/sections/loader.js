window.SorceryApp = window.SorceryApp || {};

window.SorceryApp.loaderInit = function() {
  const loader = document.getElementById('cinematic-loader');
  if (!loader) return;

  if (typeof gsap === 'undefined') {
    loader.style.display = 'none';
    return;
  }

  if (sessionStorage.getItem('introPlayed') === 'true') {
    loader.style.display = 'none';
    return;
  }

  document.body.style.overflow = 'hidden';

  // --- Dynamic Particles ---
  const particlesContainer = document.getElementById('loader-particles');
  if (particlesContainer) {
    const particleCount = window.innerWidth < 768 ? 15 : 30; // Scale down for mobile
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'loader__particle';
      
      // Randomize properties
      const size = Math.random() * 3 + 1; // 1px to 4px
      const x = Math.random() * 100; // vw
      const y = Math.random() * 100; // vh
      const opacity = Math.random() * 0.5 + 0.1;
      
      gsap.set(p, {
        width: size,
        height: size,
        left: `${x}vw`,
        top: `${y}vh`,
        opacity: 0 // Start hidden
      });
      
      particlesContainer.appendChild(p);
      
      // Animate particle floating
      gsap.to(p, {
        y: `-=${Math.random() * 30 + 10}vh`,
        x: `+=${(Math.random() - 0.5) * 10}vw`,
        opacity: opacity, // Fade up to random opacity
        duration: Math.random() * 4 + 3, // 3s to 7s
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2 // Stagger starts
      });
    }
  }

  // --- Rotating Text Lines ---
  const lines = [
    "Initializing ecosystem...",
    "Connecting innovators...",
    "Preparing showcase environment...",
    "Calibrating AI experience..."
  ];
  const textEl = document.getElementById('loader-text');
  
  const textTl = gsap.timeline({ paused: true });
  lines.forEach((line, index) => {
    // Only add out-animation if it's not the last line
    if (index > 0) {
      textTl.to(textEl, { y: -10, opacity: 0, duration: 0.3, ease: 'power2.in' })
            .set(textEl, { innerText: line, y: 10 })
            .to(textEl, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    } else {
      // First line just fades in via main timeline, but we set it here to be safe
      textTl.set(textEl, { innerText: line });
    }
  });

  // --- Main Timeline ---
  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = 'none';
      document.body.style.overflow = '';
      sessionStorage.setItem('introPlayed', 'true');
      
      // Hero Continuity Animation
      if (document.querySelector('.nav')) {
        gsap.fromTo('.nav', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' });
      }
      if (document.querySelector('.hero__content')) {
        gsap.fromTo('.hero__content > *', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' });
      }
      if (document.querySelector('.hero__ticket')) {
        gsap.fromTo('.hero__ticket', { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }, "-=1");
      }
    }
  });

  // Setup initial states
  gsap.set('.loader__brand', { opacity: 0, y: 15 });
  gsap.set('.loader__text', { opacity: 0 });
  gsap.set('.loader__progress-bar', { scaleX: 0 });
  gsap.set('.loader__bg', { opacity: 0, scale: 0.9 });
  gsap.set('.loader__glow', { opacity: 0, scale: 0.8 });
  gsap.set('.loader__content', { filter: 'blur(0px)' });

  // 1. Atmosphere & Brand
  tl.to('.loader__bg', { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' })
    .to('.loader__glow', { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }, "<")
    .to('.loader__brand', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=1.2")
    .to('.loader__text', { opacity: 1, duration: 0.8 }, "-=0.6")
    
  // 2. Start progress & sync text rotation
    .add(textTl.play(), "-=0.2")
    .to('.loader__progress-bar', { scaleX: 1, duration: 2.8, ease: 'power3.inOut' }, "<")
    
  // 3. Cinematic Dissolve ("Melt" transition)
    .to('.loader__content', { opacity: 0, y: -20, scale: 1.05, filter: 'blur(10px)', duration: 0.8, ease: 'power2.in' })
    .to('.loader__particles', { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, "<")
    .to('.loader__bg, .loader__glow', { opacity: 0, scale: 1.1, duration: 1, ease: 'power2.inOut' }, "-=0.4")
    .to(loader, { opacity: 0, duration: 0.4 });
};
