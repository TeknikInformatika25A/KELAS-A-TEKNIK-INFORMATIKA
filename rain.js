/* Efek hujan sampai garis footer - Kelas A Teknik Informatika */
(() => {
  // --- buat canvas & style otomatis ---
  const style = document.createElement('style');
  style.textContent = `
    body { position: relative; }
    #rain {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      pointer-events: none; /* tombol & link tetap bisa diklik */
      z-index: 0;           /* naikkan jadi 5 kalau mau hujan di depan konten */
    }
  `;
  document.head.appendChild(style);

  const canvas = document.createElement('canvas');
  canvas.id = 'rain';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const footer = document.querySelector('footer, .footer, #footer');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let drops = [];

  // warna hujan menyesuaikan tema gelap/terang
  function rainColor() {
    const bg = getComputedStyle(document.body).backgroundColor.match(/\d+/g) || [0, 0, 0];
    const isDark = (+bg[0] + +bg[1] + +bg[2]) / 3 < 128;
    return isDark ? 'rgba(174,194,224,0.5)' : 'rgba(70,100,160,0.45)';
  }

  // tinggi canvas = posisi atas footer (garis batas)
  function resize() {
    const w = document.documentElement.clientWidth;
    const h = footer
      ? Math.round(footer.getBoundingClientRect().top + window.scrollY)
      : document.documentElement.scrollHeight;

    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    canvas.style.height = h + 'px';

    const count = Math.min(250, Math.floor(w / 6)); // kepadatan hujan
    drops = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: 10 + Math.random() * 15,
      speed: 4 + Math.random() * 6
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = rainColor();
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    for (const d of drops) {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 2, d.y + d.len);
      ctx.stroke();

      d.y += d.speed;
      d.x -= 0.5;

      // sampai garis footer -> balik ke atas
      if (d.y > canvas.height) {
        d.y = -d.len;
        d.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('load', () => {
    resize();
    if (!reduceMotion) animate();
  });
  window.addEventListener('resize', resize);
  new ResizeObserver(resize).observe(document.body); // konten berubah -> tinggi ikut
})();
