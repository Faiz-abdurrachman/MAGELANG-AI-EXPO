window.SorceryApp = window.SorceryApp || {};

window.SorceryApp.loaderInit = function() {
  const loader = document.getElementById('cinematic-loader');
  if (!loader) return;

  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    loader.style.display = 'none';
    return;
  }

  // UX Rule: Only play once per session
  if (sessionStorage.getItem('introPlayed') === 'true') {
    loader.style.display = 'none';
    return;
  }

  // Lock scroll during intro
  document.body.style.overflow = 'hidden';

  // GSAP Timeline (Duration ~2.8s)
  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = 'none';
      document.body.style.overflow = '';
      sessionStorage.setItem('introPlayed', 'true');
      
      // Hero Continuity Animation
      // Ensure nav and hero elements are in DOM
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

  // 1. Initial fade-in of elements & atmosphere
  tl.to('.loader__bg', { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' })
    .to('.loader__glow', { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, "<")
    .to('.loader__brand', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=1")
    .to('.loader__text', { opacity: 1, duration: 0.6 }, "-=0.4")
    
  // 2. Loading progress
    .to('.loader__progress-bar', { scaleX: 1, duration: 1.5, ease: 'power4.inOut' }, "-=0.6")
    
  // 3. Text text update (Simulating network sync)
    .call(() => {
      const text = document.getElementById('loader-text');
      if (text) text.innerText = 'Syncing showcase environment...';
    }, null, "-=1.0")
    
  // 4. Cinematic Dissolve
    .to('.loader__content', { opacity: 0, y: -15, duration: 0.6, ease: 'power2.in' })
    .to('.loader__bg, .loader__glow', { opacity: 0, scale: 1.1, duration: 0.8, ease: 'power2.inOut' }, "-=0.2")
    .to(loader, { opacity: 0, duration: 0.3 });
};
