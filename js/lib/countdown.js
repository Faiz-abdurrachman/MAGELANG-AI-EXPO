window.SorceryCountdown = {
  start(targetDate, container) {
    if (!container) return;

    const fmt = (n) => String(n).padStart(2, "0");

    const update = () => {
      const distance = targetDate.getTime() - Date.now();

      if (distance < 0) {
        container.innerHTML = '<div class="countdown__item"><div class="countdown__num">EVENT LIVE</div><div class="countdown__label">Sorcery MTI 2026</div></div>';
        return;
      }

      const days  = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins  = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs  = Math.floor((distance % (1000 * 60)) / 1000);

      container.innerHTML = `
        <div class="countdown__item">
          <div class="countdown__num">${days}</div>
          <div class="countdown__label">Hari</div>
        </div>
        <div class="countdown__item">
          <div class="countdown__num">${fmt(hours)}</div>
          <div class="countdown__label">Jam</div>
        </div>
        <div class="countdown__item">
          <div class="countdown__num">${fmt(mins)}</div>
          <div class="countdown__label">Menit</div>
        </div>
        <div class="countdown__item">
          <div class="countdown__num">${fmt(secs)}</div>
          <div class="countdown__label">Detik</div>
        </div>
      `;
    };

    update();
    setInterval(update, 1000);
  }
};
