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

    /* Active nav link based on visible section */
    const sections = document.querySelectorAll("section[id]");
    const links    = document.querySelectorAll(".nav__menu a");
    if (sections.length && links.length) {
      const navIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            links.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      }, { threshold: 0.4 });
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
      });
    });
  }
};
