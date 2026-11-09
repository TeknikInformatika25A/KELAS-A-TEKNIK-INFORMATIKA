/* ============ DATA YANG BISA DIEDIT ============ */

// Urutan mengikuti daftar hadir. "foto" dan "peran" boleh dikosongkan.
const ANGGOTA = [
  { nama: "Randhan Hidayat" },
  { nama: "Muhammad Nur Faaiz" },
  { nama: "Aditya Maulana Firdaus" },
  { nama: "Fabian Taufiqurrahman", peran: "Ketua Kelas", foto: "foto-anggota/fabian-taufiqurrahman.jpg", besar: "foto-anggota/fabian-taufiqurrahman-besar.jpg" },
  { nama: "Hasbullah Ali Kumaeni" },
  { nama: "Alwan Fauzan Sawal" },
  { nama: "Mohamad Zidni Ilma" },
  { nama: "Aditya Haikal Fasha" },
  { nama: "Muhamad Husni" },
  { nama: "Ilham Maulana" },
  { nama: "Elvan Ghilman Aminudien", peran: "Wakil Ketua", foto: "foto-anggota/elvan-ghilman-aminudien.jpg", besar: "foto-anggota/elvan-ghilman-aminudien-besar.jpg" },
  { nama: "Muhammad Fawwaz Khairullah", foto: "foto-anggota/muhammad-fawwaz-khairullah.jpg", besar: "foto-anggota/muhammad-fawwaz-khairullah-besar.jpg" },
  { nama: "Syahril Maulana Fikri" },
  { nama: "Muhammad Faza Aufa Alwan" },
  { nama: "Adriandra", foto: "foto-anggota/adriandra.jpg", besar: "foto-anggota/adriandra-besar.jpg" },
  { nama: "Muhamad Frian Erliana", peran: "Pembuat halaman", foto: "foto-anggota/muhamad-frian-erliana.jpg", besar: "foto-anggota/muhamad-frian-erliana-besar.jpg" },
  { nama: "Rezki Ahmad Fauzi", foto: "foto-anggota/rezki-ahmad-fauzi.jpg", besar: "foto-anggota/rezki-ahmad-fauzi-besar.jpg" },
  { nama: "Muhamad Igna Rizki" },
  { nama: "Faizal Indra Nugraha" },
  { nama: "Rizkan Anwar Fauzi", peran: "Ketua Angkatan" },
  { nama: "Reva Salwa Adhya", peran: "Sekretaris" },
  { nama: "Nazwa Allia Kusmana" },
  { nama: "Sri Agnia", peran: "Bendahara" },
  { nama: "Devina Putri Nur Aliah" },
  { nama: "Dea Anandia Salsabila" },
  { nama: "Nazmiatul Fitri" },
  { nama: "Arsy Agung" },
  { nama: "Raka Brawijaya" },
  { nama: "Aceng Ziran" }
];

// Foto galeri: [nama file, deskripsi].
const FOTO_GALERI = [
  ["foto-kelas-1.jpg", "Mahasiswa Kelas A berfoto bersama dengan kemeja hitam di tangga depan gedung"],
  ["foto-kelas-2.jpg", "Kelas A berfoto bersama pada malam hari di taman dengan lampu gantung"],
  ["foto-kelas-3.jpg", "Mahasiswa Kelas A berfoto bersama di depan air terjun"],
  ["foto-kelas-4.jpg", "Kelas A berseragam hijau dan hitam duduk di lapangan rumput"],
  ["foto-kelas-5.jpg", "Kelas A berkumpul berpakaian hitam di sebuah kafe pada malam hari"],
  ["foto-kelas-6.jpg", "Kelas A berkemeja putih dan celana hitam di depan gedung kampus hijau"]
];

/* ============ TEMA ============ */
(function () {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("kelasA-tema"); } catch (e) {}
  root.setAttribute("data-theme", saved || "dark");
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeBtn");
    if (!btn) return;
    const paint = () => btn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
    paint();
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("kelasA-tema", next); } catch (e) {}
      paint();
    });
  });
})();

/* ============ LATAR GELOMBANG (Beranda) ============ */
document.addEventListener("DOMContentLoaded", () => {
  const cv = document.getElementById("gelombang");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const root = document.documentElement;
  const diam = window.matchMedia("(prefers-reduced-motion: reduce)");
  let W = 0, H = 0, warna = [], raf = 0;

  const rgb = hex => {
    let h = hex.trim().replace("#", "");
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const ambilWarna = () => {
    const s = getComputedStyle(root);
    const a = rgb(s.getPropertyValue("--accent"));
    const b = rgb(s.getPropertyValue("--accent2"));
    const gelap = root.getAttribute("data-theme") !== "light";
    warna = gelap
      ? [[a, .55], [b, .40], [a, .35]]
      : [[a, .45], [b, .35], [a, .30]];
  };
  const ukur = () => {
    const r = cv.getBoundingClientRect();
    const d = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = Math.round(W * d);
    cv.height = Math.round(H * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
  };
  const gambar = t => {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1.5;
    warna.forEach(([c, alpha], k) => {
      ctx.strokeStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + alpha + ")";
      ctx.beginPath();
      for (let x = 0; x <= W; x += 4) {
        const y = H * 0.62
          + Math.sin(x * 0.011 + t * 0.9 + k * 1.6) * (16 + k * 9)
          + Math.sin(x * 0.028 - t * 0.6) * 5;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
  };
  const putar = ts => { gambar(ts / 1000); raf = requestAnimationFrame(putar); };
  const mulai = () => {
    cancelAnimationFrame(raf);
    if (diam.matches) gambar(0); else raf = requestAnimationFrame(putar);
  };

  new MutationObserver(() => { ambilWarna(); if (diam.matches) gambar(0); })
    .observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  new ResizeObserver(() => { ukur(); if (diam.matches) gambar(0); }).observe(cv.parentElement);
  diam.addEventListener("change", mulai);

  ambilWarna();
  ukur();
  mulai();
});

/* ============ LATAR JARINGAN (semua halaman) ============ */
document.addEventListener("DOMContentLoaded", () => {
  const cv = document.createElement("canvas");
  cv.className = "net-bg";
  cv.setAttribute("aria-hidden", "true");
  document.body.prepend(cv);
  const ctx = cv.getContext("2d");
  const root = document.documentElement;
  const diam = window.matchMedia("(prefers-reduced-motion: reduce)");
  let W = 0, H = 0, titik = [], warna = null, raf = 0, last = 0;

  const rgb = hex => {
    let h = hex.trim().replace("#", "");
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const rgba = (c, al) => "rgba(" + c.join(",") + "," + al + ")";
  const acak = (a, b) => a + Math.random() * (b - a);
  const baru = () => ({ x: acak(0, W), y: acak(0, H), vx: acak(-8, 8), vy: acak(-8, 8) });

  const ambilWarna = () => {
    const s = getComputedStyle(root);
    warna = {
      a: rgb(s.getPropertyValue("--accent")),
      b: rgb(s.getPropertyValue("--accent2")),
      gelap: root.getAttribute("data-theme") !== "light"
    };
  };
  const atur = () => {
    const r = cv.getBoundingClientRect();
    const w = r.width || window.innerWidth, h = r.height || window.innerHeight;
    const d = Math.min(window.devicePixelRatio || 1, 2);
    if (W && H) titik.forEach(p => { p.x *= w / W; p.y *= h / H; });
    W = w; H = h;
    cv.width = Math.round(W * d);
    cv.height = Math.round(H * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    const target = Math.max(14, Math.round(W / 26));
    while (titik.length < target) titik.push(baru());
    titik.length = Math.min(titik.length, target);
  };
  const gambar = dt => {
    ctx.clearRect(0, 0, W, H);
    if (dt) titik.forEach(p => {
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    const { a, b, gelap } = warna;
    ctx.lineWidth = 1;
    for (let i = 0; i < titik.length; i++) {
      for (let j = i + 1; j < titik.length; j++) {
        const d = Math.hypot(titik[i].x - titik[j].x, titik[i].y - titik[j].y);
        if (d < 120) {
          ctx.strokeStyle = rgba(a, (1 - d / 120) * (gelap ? .24 : .20));
          ctx.beginPath();
          ctx.moveTo(titik[i].x, titik[i].y);
          ctx.lineTo(titik[j].x, titik[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = rgba(b, gelap ? .5 : .45);
    titik.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 6.283); ctx.fill(); });
  };
  const putar = ts => {
    const dt = Math.min((ts - last) / 1000, .05);
    last = ts;
    gambar(dt);
    raf = requestAnimationFrame(putar);
  };
  const mulai = () => {
    cancelAnimationFrame(raf);
    if (diam.matches) gambar(0); else raf = requestAnimationFrame(putar);
  };

  window.addEventListener("resize", () => { atur(); if (diam.matches) gambar(0); });
  new MutationObserver(() => { ambilWarna(); if (diam.matches) gambar(0); })
    .observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  diam.addEventListener("change", mulai);

  ambilWarna();
  atur();
  mulai();
});

/* ============ GALERI ============ */
document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("galeri");
  if (!box) return;
  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img");
  if (!FOTO_GALERI.length) {
    box.outerHTML = '<div class="empty">Belum ada foto.</div>';
    return;
  }
  FOTO_GALERI.forEach(([f, alt]) => {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    img.src = f; img.alt = alt; img.loading = "lazy";
    fig.appendChild(img);
    fig.addEventListener("click", () => { lbImg.src = f; lbImg.alt = alt; lb.classList.add("show"); });
    box.appendChild(fig);
  });
  lb.addEventListener("click", () => lb.classList.remove("show"));
  document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("show"); });
});

/* ============ ANGGOTA ============ */
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("daftarAnggota");
  if (!list) return;
  const cari = document.getElementById("cari");
  const form = document.getElementById("formTambah");
  const nama = document.getElementById("namaBaru");
  const jumlah = document.getElementById("jumlah");
  const lb = document.getElementById("lightbox");
  const lbImg = lb ? lb.querySelector("img") : null;

  let tambahan = [];
  try { tambahan = JSON.parse(localStorage.getItem("kelasA-anggota-v2") || "[]"); } catch (e) {}
  if (!Array.isArray(tambahan)) tambahan = [];
  tambahan = tambahan.map(t => typeof t === "string" ? { nama: t } : t).filter(t => t && t.nama)
    .filter(t => !ANGGOTA.some(a => a.nama.toLowerCase() === t.nama.toLowerCase()));

  const semua = () => [...ANGGOTA, ...tambahan];
  const render = () => {
    const kata = (cari.value || "").toLowerCase().trim();
    const data = semua().filter(a => a.nama.toLowerCase().includes(kata));
    list.innerHTML = "";
    if (!data.length) {
      const li = document.createElement("li");
      li.textContent = "Tidak ada anggota yang cocok dengan pencarian ini.";
      li.style.color = "var(--muted)";
      list.appendChild(li);
    }
    data.forEach(a => {
      const li = document.createElement("li");
      const av = document.createElement("span");
      av.className = "avatar";
      if (a.foto) {
        const im = document.createElement("img");
        im.src = a.foto; im.alt = "Foto " + a.nama; im.loading = "lazy";
        av.appendChild(im);
        if (a.besar && lb) {
          av.style.cursor = "zoom-in";
          av.addEventListener("click", () => { lbImg.src = a.besar; lbImg.alt = "Foto " + a.nama; lb.classList.add("show"); });
        }
      } else {
        av.textContent = a.nama.trim().charAt(0).toUpperCase();
      }
      const tx = document.createElement("span");
      tx.className = "info";
      const n = document.createElement("span");
      n.textContent = a.nama;
      tx.appendChild(n);
      if (a.peran) {
        const p = document.createElement("small");
        p.className = "peran"; p.textContent = a.peran;
        tx.appendChild(p);
      }
      li.append(av, tx);
      if (tambahan.includes(a)) {
        const x = document.createElement("button");
        x.type = "button";
        x.className = "hapus";
        x.textContent = "Hapus";
        x.setAttribute("aria-label", "Hapus " + a.nama);
        x.addEventListener("click", () => {
          tambahan = tambahan.filter(t => t !== a);
          try { localStorage.setItem("kelasA-anggota-v2", JSON.stringify(tambahan)); } catch (e) {}
          render();
        });
        li.appendChild(x);
      }
      list.appendChild(li);
    });
    jumlah.textContent = kata ? data.length + " dari " + semua().length + " anggota" : semua().length + " anggota";
  };
  if (lb) {
    lb.addEventListener("click", () => lb.classList.remove("show"));
    document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("show"); });
  }
  cari.addEventListener("input", render);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = nama.value.trim();
    if (!v) return;
    if (semua().some(a => a.nama.toLowerCase() === v.toLowerCase())) { nama.value = ""; return; }
    tambahan.push({ nama: v });
    try { localStorage.setItem("kelasA-anggota-v2", JSON.stringify(tambahan)); } catch (e) {}
    nama.value = "";
    render();
  });
  render();
});
