window.SorceryScroll = {
  init() {
    /* Reveal-on-scroll */
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach((el) => io.observe(el));
    }

    /* Mobile: Agenda Glow on Scroll (Auto-trigger in middle of screen) */
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
        rootMargin: "-40% 0px -40% 0px" /* Trigger when item is in the center 20% of the screen */
      });
      agendaItems.forEach((item) => agendaIO.observe(item));
    }

    /* Mobile: Stats Tap-to-Flip */
    const statsItems = document.querySelectorAll(".stats__item-wrapper");
    statsItems.forEach(item => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 920) {
          // Toggle this one, close others
          const wasHovered = item.classList.contains("is-hovered");
          statsItems.forEach(i => i.classList.remove("is-hovered"));
          if (!wasHovered) item.classList.add("is-hovered");
        }
      });
    });

    /* Active nav link based on visible section */
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

    /* Nav background on scroll */
    const nav = document.querySelector(".nav");
    if (nav) {
      const onScroll = () => {
        nav.classList.toggle("is-scrolled", window.scrollY > 20);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* Smooth scroll for anchor links + close mobile menu */
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
  }
};
