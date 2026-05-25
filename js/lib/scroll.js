window.SorceryScroll = {
  init() {
    /* =============================================
       1. SCROLL PROGRESS BAR
       ============================================= */
    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
      const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + "%";
      };
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
    }

    /* =============================================
       2. REVEAL-ON-SCROLL (multi-mode)
       ============================================= */
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
      reveals.forEach((el) => io.observe(el));
    }

    /* =============================================
       3. HERO WORD-BY-WORD ANIMATION
       ============================================= */
    const heroHeadline = document.querySelector(".hero__headline");
    if (heroHeadline) {
      // Wrap each word in a span.hero__word
      const html = heroHeadline.innerHTML;
      // Split text nodes into words, preserve <br> and existing tags
      const wrapped = html.replace(
        /(<[^>]+>)|(\S+)/g,
        (match, tag, word) => {
          if (tag) return tag;
          return `<span class="hero__word">${word}</span>`;
        }
      );
      heroHeadline.innerHTML = wrapped;

      const words = heroHeadline.querySelectorAll(".hero__word");
      const wordIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((w, i) => {
              setTimeout(() => w.classList.add("is-visible"), i * 100);
            });
            wordIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      wordIO.observe(heroHeadline);
    }

    /* =============================================
       4. HERO SCROLL HINT — hide on scroll
       ============================================= */
    const scrollHint = document.querySelector(".hero__scroll-hint");
    if (scrollHint) {
      const hideHint = () => {
        if (window.scrollY > 100) {
          scrollHint.classList.add("is-hidden");
        }
      };
      window.addEventListener("scroll", hideHint, { passive: true });
    }

    /* =============================================
       5. STATS COUNTER ANIMATION
       ============================================= */
    const counterElements = document.querySelectorAll("[data-count]");
    if (counterElements.length) {
      const counterIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            if (isNaN(target)) { counterIO.unobserve(el); return; }

            let start = 0;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutExpo
              const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const current = Math.round(ease * target);
              el.textContent = current;
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                el.textContent = target;
              }
            };
            requestAnimationFrame(animate);
            counterIO.unobserve(el);
          }
        });
      }, { threshold: 0.3 });
      counterElements.forEach((el) => counterIO.observe(el));
    }

    /* =============================================
       6. PARALLAX — elements with data-speed
       ============================================= */
    const parallaxEls = document.querySelectorAll("[data-speed]");
    if (parallaxEls.length) {
      let ticking = false;
      const updateParallax = () => {
        const scrollY = window.scrollY;
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.speed) || 0;
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;
          const viewCenter = window.innerHeight / 2;
          const offset = (elCenter - viewCenter) * speed;
          el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      };
      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });
    }

    /* =============================================
       7. AGENDA — Mobile Glow on Scroll
       ============================================= */
    const agendaItems = document.querySelectorAll(".agenda__item");
    if (agendaItems.length && window.innerWidth <= 920) {
      const agendaIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-hovered");
          } else {
            entry.target.classList.remove("is-hovered");
          }
        });
      }, {
        threshold: 0,
        rootMargin: "-40% 0px -40% 0px"
      });
      agendaItems.forEach((item) => agendaIO.observe(item));
    }

    /* =============================================
       8. STATS — Mobile Tap-to-Flip
       ============================================= */
    const statsItems = document.querySelectorAll(".stats__item-wrapper");
    statsItems.forEach(item => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 920) {
          const wasHovered = item.classList.contains("is-hovered");
          statsItems.forEach(i => i.classList.remove("is-hovered"));
          if (!wasHovered) item.classList.add("is-hovered");
        }
      });
    });

    /* =============================================
       9. ACTIVE NAV LINK based on visible section
       ============================================= */
    const sections = document.querySelectorAll("section[id]");
    const links    = document.querySelectorAll(".nav__link");
    if (sections.length && links.length) {
      const navIO = new IntersectionObserver((entries) => {
        if (window.isNavClicking) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            const targetLink = document.querySelector(`.nav__link[href="#${id}"]`);
            if (targetLink) {
              links.forEach((link) => link.classList.remove("is-active"));
              targetLink.classList.add("is-active");
            }
          }
        });
      }, {
        threshold: 0,
        rootMargin: "-25% 0px -70% 0px"
      });
      sections.forEach((s) => navIO.observe(s));
    }

    /* =============================================
       10. NAV BACKGROUND on scroll
       ============================================= */
    const nav = document.querySelector(".nav");
    if (nav) {
      const onScroll = () => {
        nav.classList.toggle("is-scrolled", window.scrollY > 20);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* =============================================
       11. SMOOTH SCROLL for anchor links
       ============================================= */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#" || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: "smooth" });
        document.querySelector(".nav__menu")?.classList.remove("is-open");
        document.getElementById("nav-toggle")?.classList.remove("is-active");
        document.body.style.overflow = '';
      });
    });

    /* =============================================
       12. SECTION TITLE REVEAL (clip-path)
       ============================================= */
    const sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach((title) => {
      title.classList.add("reveal--clip");
      const titleIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            titleIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      titleIO.observe(title);
    });

    /* =============================================
       13. 3D TILT EFFECT on value cards
       ============================================= */
    const tiltCards = document.querySelectorAll(".value__card, .why__card, .process__card");
    if (tiltCards.length && window.innerWidth > 768) {
      tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -8;
          const rotateY = ((x - centerX) / centerX) * 8;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

          // Move glow to cursor position
          const glow = card.querySelector(".value__card-glow, .process__card-glow");
          if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(14, 165, 233, 0.2) 0%, transparent 60%)`;
            glow.style.opacity = "1";
          }
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
          const glow = card.querySelector(".value__card-glow, .process__card-glow");
          if (glow) glow.style.opacity = "0";
        });
      });
    }

    /* =============================================
       14. AGENDA STAGGER ANIMATION
       ============================================= */
    const agendaList = document.querySelector(".agenda__list");
    if (agendaList) {
      const agendaCards = agendaList.querySelectorAll(".agenda__item");
      const agendaStaggerIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            agendaCards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("is-visible");
              }, i * 120);
            });
            agendaStaggerIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      agendaStaggerIO.observe(agendaList);
    }

    /* =============================================
       15. SECTION DIVIDER ANIMATION
       ============================================= */
    const dividers = document.querySelectorAll(".section-divider");
    if (dividers.length) {
      const divIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            divIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      dividers.forEach((d) => divIO.observe(d));
    }

    /* =============================================
       16. FORMAT CARD HOVER — glow follow mouse
       ============================================= */
    const formatCards = document.querySelectorAll(".format__card");
    if (formatCards.length && window.innerWidth > 768) {
      formatCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", x + "px");
          card.style.setProperty("--mouse-y", y + "px");
        });
      });
    }
  }
};
