# CONTEXT5 — Master Context Documentation

Dokumen ini adalah pemetaan menyeluruh terhadap codebase saat ini (HTML/CSS/JS statis) untuk menjelaskan konteks bisnis, alur produk, arsitektur teknis, UX, dan risiko engineering.

Ruang lingkup analisis:
- Semua file di root project: `index.html`, seluruh folder `js/`, `css/`, dan `assets/`.
- Perspektif user + developer.
- Hanya berdasarkan source code yang ada, tanpa asumsi di luar code.

Tanggal analisis konteks: 19 Mei 2026.

---

# 1. Apa Sebenarnya Web Ini?

## 1.1 Definisi produk
Web ini adalah **landing page event** untuk **Magelang AI Expo 2026**, bukan aplikasi SaaS operasional, bukan marketplace, dan bukan platform transaksi.

Fungsi utamanya:
- Mengomunikasikan positioning event.
- Membangun trust dan ekspektasi realistis.
- Mengarahkan calon peserta untuk mendaftar showcase produk AI.
- Mengkurasi narasi: “bukan janji pendanaan, tapi akses dan koneksi relevan.”

## 1.2 Web/aplikasi ini tentang apa
Berdasarkan copy, data, dan struktur section, ini adalah laman promosi dan registrasi untuk event 1 hari yang mempertemukan:
- Builder/founder produk AI.
- Pelaku bisnis/pengambil keputusan.
- Partner strategis/pemilik modal/mentor.

Produk AI yang disasar bukan ide mentah, tetapi minimal bisa didemokan.

## 1.3 Tujuan utama web dibuat
Tujuan product-level web ini:
- Menarik pendaftar berkualitas untuk slot showcase terbatas.
- Menjelaskan format event sehingga calon peserta paham apa yang didapat.
- Mencegah mismatch ekspektasi (terutama isu “funding promise”).
- Menggerakkan user ke CTA utama: submit form pendaftaran.

Tujuan komunikasi:
- Menunjukkan event ini curated, bukan acara komunitas umum tanpa outcome.
- Menekankan value pragmatic: demo, feedback, networking, business matching.

## 1.4 Masalah yang ingin diselesaikan
Masalah yang ditarget dari sisi ekosistem:
- Founder AI daerah sering sulit mendapat exposure ke pihak bisnis relevan.
- Banyak event terlalu ceremonial, rendah tindak lanjut bisnis.
- Ekspektasi funding sering tidak realistis.

Solusi yang ditawarkan web (melalui framing konten):
- Ruang pertemuan terkurasi.
- Format venue yang mendukung demo + diskusi.
- Agenda yang mengarahkan interaksi ke validasi dan matching.

## 1.5 Kenapa web ini dibuat (hipotesis paling kuat dari code)
Dari keseluruhan copy dan alur section, web ini dibuat untuk:
- Menjadi mesin akuisisi pendaftar event.
- Menjadi one-page “sales narrative” untuk meyakinkan founder dan tamu bisnis.
- Menjadi artefak positioning brand/event (visual premium + narasi realistis).

## 1.6 Value proposition inti
Value proposition eksplisit yang berulang di banyak section:
- Produk AI dapat dilihat orang yang tepat.
- Networking relevan, bukan random.
- Ada panggung demo + peluang percakapan lanjutan.
- Tidak menjanjikan pendanaan instan.

## 1.7 Target user
Primary user:
- Founder/tim produk AI yang ingin showcase.

Secondary user:
- Pengusaha senior, corporate decision maker, mentor, pemilik modal lokal (sebagai strategic guests).

Tertiary audience:
- Komunitas teknologi, kampus, pihak pemerintah/ekosistem lokal.

## 1.8 Kebutuhan user yang dipenuhi
Founder membutuhkan:
- Validasi “apakah produk saya cocok untuk audiens bisnis?”
- Akses ke jaringan yang sulit dicapai sendiri.
- Kesempatan demo dan feedback.

Web ini memenuhi dengan:
- Penjelasan format event, agenda, profil tamu, benefit, dan proses seleksi.
- Form aplikasi yang meminta data inti untuk kurasi.

## 1.9 Flow penggunaan utama user (high-level)
1. Masuk ke hero, paham positioning dan tanggal.
2. Lihat bukti sosial dan diferensiasi event.
3. Pahami format venue + agenda interaksi.
4. Lihat tipe tamu yang akan hadir.
5. Evaluasi value yang didapat dan proses seleksi.
6. Cek lokasi event.
7. Isi form pendaftaran.
8. Baca FAQ bila masih ada keraguan.
9. Didorong kembali ke CTA final.

## 1.10 Core business logic (di level aplikasi)
Karena ini landing page statis, business logic intinya ada di:
- **Content orchestration**: semua narasi event disusun dari objek data terpusat (`window.SorceryData`).
- **Conversion logic**: section ordering + CTA berulang + form validation client-side.
- **Expectation management logic**: copy yang konsisten soal “no funding promise”.

## 1.11 Cara sistem bekerja keseluruhan
- `index.html` memuat CSS + script berurutan.
- `js/data.js` menjadi source konten.
- `js/sections/*.js` merender HTML tiap section dari data.
- `js/main.js` menyatukan seluruh section ke `#app`.
- Setelah render, init interaksi (scroll reveal, nav, FAQ, form).
- Countdown berjalan di hero dan CTA.
- Tidak ada request submit ke backend: form hanya validasi + success state di client.

---

# 2. Executive Understanding

## 2.1 Gambaran besar untuk developer baru
Project ini adalah **single-page static website** dengan arsitektur modular manual:
- Tidak ada framework (React/Vue/etc).
- Tidak ada bundler.
- Tidak ada backend.
- Tidak ada database persistence.

UI dibangun dari string template JS yang diinjeksi ke DOM.

## 2.2 Cara berpikir sistem ini
Pola desain sistem:
- Data dulu (`SorceryData`).
- Renderer section mengubah data jadi HTML string.
- Bootstrap menyusun urutan halaman.
- Initializer memasang event listener + observer.

Artinya, halaman diperlakukan seperti “render pipeline” sederhana.

## 2.3 Alur kerja inti
1. Browser load `index.html`.
2. Browser load data + utilitas + section renderers.
3. `js/main.js` generate seluruh isi `#app`.
4. Interaksi dipasang:
- Scroll animation.
- Navbar mobile + active section.
- FAQ accordion.
- Form validation.
- Countdown timer.

## 2.4 Interaksi antar fitur
- Navbar anchor tergantung ID section.
- Countdown tergantung `event.deadline` dari data.
- Section konten tergantung array/obj di `SorceryData`.
- Reveal animation tergantung class `.reveal` di seluruh komponen.
- CTA mengarah ke form (`#register`) sebagai konversi utama.

## 2.5 Hubungan frontend, backend, database
- Frontend: ada (100%).
- Backend: tidak ada.
- Database: tidak ada.

Konsekuensi:
- Tidak ada persistence pendaftaran.
- Tidak ada autentikasi.
- Tidak ada API internal untuk operasi bisnis.

## 2.6 Data mengalir bagaimana
- Sumber data runtime: `window.SorceryData` (hardcoded JS object).
- Data di-loop di masing-masing section renderer.
- Output berupa HTML string.
- DOM di-replace sekali saat bootstrap (`app.innerHTML = ...`).

## 2.7 User journey dari awal sampai akhir
Journey conversion yang dirancang:
- Awareness: Hero + Stats + Trusted + Why.
- Consideration: Format + Agenda + Investors + Value + Process.
- Intent: Map + Form.
- Objection handling: FAQ.
- Final push: CTA + Footer contact.

---

# 3. Feature & Business Logic Breakdown

## 3.1 Navigation (Desktop + Mobile)
Tujuan:
- Memudahkan lompat ke section penting.
- Menjaga orientasi user via active link.

Kapan dipakai user:
- Saat eksplorasi informasi non-linear.

Cara kerja internal:
- Item nav berasal dari `SorceryData.nav`.
- Active state diupdate oleh IntersectionObserver.
- Mobile menu pakai burger toggle + lock body scroll.
- Ada visual indicator glow yang bergerak mengikuti hover/active link.

File terlibat:
- `js/sections/nav.js`
- `js/lib/scroll.js`
- `css/navbar.css`

Dependency:
- Section harus punya `id` valid agar anchor bekerja.

Edge case:
- Jika `href` mengarah ke ID yang tidak ada, smooth scroll di-skip.
- Indicator disembunyikan di viewport mobile.

## 3.2 Hero + Event Brief + Countdown
Tujuan:
- Menyampaikan hook utama dan konteks event dalam 1 layar.

Kapan dipakai user:
- First impression saat landing.

Cara kerja internal:
- Hero berisi headline, CTA, link ke section tamu.
- Countdown di-inject lewat utilitas timer.
- Deadline sumber tunggal: `SorceryData.event.deadline`.

File terlibat:
- `js/sections/hero.js`
- `js/lib/countdown.js`
- `css/hero.css`
- `js/data.js`

Logic penting:
- Jika countdown lewat deadline, tampilan berubah jadi `EVENT LIVE`.

Edge case:
- `setInterval` tetap jalan setelah event lewat (minor perf leak).

## 3.3 Stats Flip Cards
Tujuan:
- Menyajikan metrik event + elaborasi ringkas.

Kapan dipakai user:
- Setelah hero, untuk quick credibility + expectation framing.

Cara kerja internal:
- 4 kartu dari `SorceryData.stats`.
- Desktop: hover flip.
- Mobile: tap to flip (toggle satu kartu, reset kartu lain).

File:
- `js/sections/stats.js`
- `js/lib/scroll.js`
- `css/stats.css`

Dependency:
- Class `.stats__item-wrapper` dipakai untuk event click di mobile.

Edge case:
- Di desktop user touch device tanpa hover bisa beda perilaku browser.

## 3.4 Trusted Marquee
Tujuan:
- Social proof visual bahwa event melibatkan pihak strategis.

Kapan dipakai user:
- Fase early trust-building.

Cara kerja:
- `vcLogos` di-loop, diduplikasi 2x untuk marquee infinite.

File:
- `js/sections/trusted.js`
- `css/trusted.css`

Edge case:
- Karena berupa teks generic, trust bisa terasa simbolik bila tidak ada logo nyata.

## 3.5 Why / Pillars
Tujuan:
- Menjelaskan diferensiasi utama event.

Kapan dipakai user:
- Saat user menilai apakah event ini “beda” dari event lain.

Cara kerja:
- `pillars` data -> kartu visual 3D.
- Reveal animation + hover reveal deskripsi.
- Mobile: deskripsi selalu tampil.

File:
- `js/sections/why.js`
- `css/pillars.css`

Edge case:
- Ada kesalahan syntax CSS di akhir file yang berpotensi mengganggu parsing parsial.

## 3.6 Format Venue (3 Zona)
Tujuan:
- Mengurangi abstraksi event jadi layout ruang konkret.

Kapan dipakai user:
- Saat membayangkan cara interaksi di hari acara.

Cara kerja:
- `zones` data -> 3 kartu slide reveal.
- Hover mengecilkan top panel dan menampilkan detail deskripsi.

File:
- `js/sections/format.js`
- `css/format.css`

Dependency:
- Interaksi berbasis hover sangat dominan, mobile diberi fallback layout.

## 3.7 Agenda Timeline
Tujuan:
- Menunjukkan alur event per jam agar ekspektasi realistis.

Kapan dipakai user:
- Saat user mempertimbangkan komitmen waktu dan aktivitas.

Cara kerja:
- `agenda` data -> timeline item.
- Hover desktop menyalakan glow + marker.
- Mobile auto highlight item via observer tengah viewport.

File:
- `js/sections/agenda.js`
- `js/lib/scroll.js`
- `css/agenda.css`

Edge case:
- Penggunaan `var(--gray-600)` pada deskripsi agenda memakai token yang tidak didefinisikan.

## 3.8 Strategic Guests / Investors
Tujuan:
- Memperjelas tipe orang yang akan ditemui founder.

Kapan dipakai user:
- Fase keputusan: “apakah audiens event sesuai kebutuhan saya?”.

Cara kerja:
- `investors` data -> kartu profil pseudo-security.
- Menekankan narasi akses, bukan janji investasi.

File:
- `js/sections/investors.js`
- `css/investors.css`

Edge case:
- Beberapa CSS color token (`gray-400`, `gray-800`, `gray-200`) tidak terdefinisi.

## 3.9 Value (What You Get)
Tujuan:
- Menyebut outcome konkret dari partisipasi.

Kapan dipakai user:
- Saat menimbang ROI ikut event.

Cara kerja:
- `values` data -> kartu icon + deskripsi.
- Icon SVG diambil dari `SorceryIcons` berdasarkan key `icon`.

File:
- `js/sections/value.js`
- `js/lib/icons.js`
- `css/value.css`

Dependency:
- Jika key icon tak ada, fallback string kosong.

## 3.10 Selection Process
Tujuan:
- Menjelaskan proses kurasi agar transparan.

Kapan dipakai user:
- Sebelum isi form, untuk paham mekanisme seleksi.

Cara kerja:
- `process` data -> 4 kartu step.

File:
- `js/sections/process.js`
- `css/process.css`

## 3.11 Venue Map
Tujuan:
- Menurunkan friksi logistik (lokasi dan akses).

Kapan dipakai user:
- Fase akhir keputusan hadir.

Cara kerja:
- Teks venue + link Google Maps + embed iframe maps.

File:
- `js/sections/map.js`
- `css/map.css`

Dependency eksternal:
- `maps.app.goo.gl`
- `google.com/maps?...&output=embed`

## 3.12 Form Pendaftaran (Conversion Core)
Tujuan:
- Menangkap data calon peserta showcase.

Kapan dipakai user:
- Saat user memutuskan apply.

Cara kerja internal:
- Form field manual (nama tim, founder, email, WA, kategori, stage, use case, link deck).
- Validasi client-side regex + required checks.
- Jika gagal: error inline + auto-scroll ke error pertama.
- Jika lolos: form di-replace success message.

File:
- `js/sections/form.js`
- `css/form.css`

Logic penting:
- Sanitasi output success message pakai `escape()` lokal.
- Tidak ada POST request ke server.

Edge case kritikal:
- Data pendaftaran **tidak tersimpan** ke mana pun.
- Success state bisa memberi persepsi sudah terkirim padahal tidak ada persistence.

## 3.13 FAQ Accordion
Tujuan:
- Menutup objection akhir sebelum submit.

Kapan dipakai user:
- Saat masih ragu terkait syarat, biaya, funding, kesiapan.

Cara kerja:
- Data FAQ dari array.
- Satu item terbuka dalam satu waktu (close others).
- Transisi via `max-height`.

File:
- `js/sections/faq.js`
- `css/faq.css`

Edge case:
- A11y belum lengkap: tidak ada `aria-expanded`, `aria-controls`, keyboard semantics lanjutan.

## 3.14 Final CTA + Footer
Tujuan:
- Mendorong aksi terakhir dan menyediakan kanal kontak.

Kapan dipakai user:
- Di bagian bawah setelah konsumsi semua informasi.

Cara kerja:
- CTA ulang countdown dan tombol ke form.
- Footer berisi navigasi sekunder + email kontak.

File:
- `js/sections/cta.js`, `css/cta.css`
- `js/sections/footer.js`, `css/footer.css`

---

# 4. Full Architecture Analysis

## 4.1 Struktur arsitektur sistem
Arsitektur adalah **client-side rendering statis berbasis global objects**:

- `window.SorceryData`: source konten.
- `window.SorceryIcons`: aset SVG inline.
- `window.SorceryApp.*`: renderer & initializer section.
- `window.SorceryScroll` dan `window.SorceryCountdown`: utilitas interaksi.
- `main.js`: orchestrator bootstrap.

## 4.2 Flow frontend ↔ backend ↔ database
Flow aktual:
- Frontend -> tidak ada backend internal.
- Frontend -> resource eksternal (Google Fonts, Google Maps iframe/link).

Kesimpulan:
- Flow aplikasi berjalan sepenuhnya di browser.
- Tidak ada state sinkronisasi server.

## 4.3 Authentication flow
Tidak ada authentication flow.
- Tidak ada login/logout.
- Tidak ada session/token/cookie auth.
- Tidak ada role-based access control.

## 4.4 State flow
Jenis state:
- Stateless content: data event hardcoded.
- Ephemeral UI state:
- class `is-open`, `is-active`, `is-hovered`, `is-visible`.
- flag global `window.isNavClicking`.
- Form validation errors sementara.

State tidak persisten antar refresh.

## 4.5 API flow
API internal: tidak ada.

“Pseudo API” internal terjadi sebagai pemanggilan fungsi global:
- `SorceryApp.sectionName()` untuk render markup.
- `SorceryApp.formInit()/faqInit()/navInit()` untuk behavior.
- `SorceryCountdown.start(deadline, node)`.

## 4.6 Event/data lifecycle
Lifecycle:
1. Script load sequence ditentukan oleh urutan `<script>` di `index.html`.
2. `main.js` compose HTML final.
3. DOM listeners dan observer terpasang.
4. User interaction memodifikasi class/style inline.
5. Form submit memodifikasi subtree DOM (replace form content).

## 4.7 Service integration
Integrasi eksternal yang ada:
- Google Fonts (typography).
- Google Maps embed iframe.
- Deep link maps.app.goo.gl.
- Mailto links untuk partnership/press.

Tidak ada integrasi CRM, analytics, payment, email API, atau webhook.

## 4.8 Sequence inti bootstrap
```text
index.html loaded
  -> data.js (window.SorceryData)
  -> icons.js / countdown.js / scroll.js
  -> section renderers
  -> main.js
      -> app.innerHTML = gabungan semua section
      -> init scroll/nav/faq/form
      -> start 2 countdown timers
```

---

# 5. Folder & File Explanation

## 5.1 Root
| Path | Fungsi |
|---|---|
| `index.html` | Entry point, memuat semua CSS/JS, menyediakan `#app` untuk injection. |
| `context5.md` | Dokumen konteks ini. |

## 5.2 Folder `js/`
| Path | Fungsi |
|---|---|
| `js/data.js` | Source data konten event (event, nav, stats, agenda, dll). |
| `js/main.js` | Composer halaman + inisialisasi behavior utama. |

### `js/lib/`
| Path | Fungsi |
|---|---|
| `js/lib/icons.js` | Kumpulan SVG inline (logo, crest, icon value). |
| `js/lib/countdown.js` | Utility countdown berbasis interval 1 detik. |
| `js/lib/scroll.js` | Observer reveal, agenda mobile glow, stats tap, nav active, smooth scroll. |

### `js/sections/`
| Path | Fungsi |
|---|---|
| `js/sections/nav.js` | Render navbar + logic menu mobile + indicator nav. |
| `js/sections/hero.js` | Render hero + event brief + placeholder countdown. |
| `js/sections/stats.js` | Render stats flip cards. |
| `js/sections/trusted.js` | Render trusted marquee logos/text. |
| `js/sections/why.js` | Render section diferensiasi (pillars). |
| `js/sections/format.js` | Render 3 zona format venue. |
| `js/sections/agenda.js` | Render timeline agenda. |
| `js/sections/investors.js` | Render profile strategic guests. |
| `js/sections/value.js` | Render value proposition cards. |
| `js/sections/process.js` | Render langkah seleksi. |
| `js/sections/map.js` | Render venue detail + embed maps. |
| `js/sections/form.js` | Render form + validasi + success state client-side. |
| `js/sections/faq.js` | Render FAQ + accordion behavior. |
| `js/sections/cta.js` | Render CTA final + placeholder countdown. |
| `js/sections/footer.js` | Render footer dan informasi kontak. |

## 5.3 Folder `css/`
| Path | Fungsi |
|---|---|
| `css/reset.css` | CSS reset dasar browser. |
| `css/tokens.css` | Design tokens (color, typography, spacing, motion). |
| `css/base.css` | Styling global body/container/section/title/subtitle. |
| `css/components.css` | Komponen umum (button, reveal, countdown, divider). |
| `css/navbar.css` | Style navbar desktop/mobile + indicator glow. |
| `css/hero.css` | Layout hero editorial + ticket panel. |
| `css/stats.css` | Flip card interaktif stats. |
| `css/trusted.css` | Marquee trusted text/logo pseudo. |
| `css/pillars.css` | Kartu 3D “why”. |
| `css/format.css` | Kartu 3D slide “format venue”. |
| `css/agenda.css` | Timeline agenda + glow interactions. |
| `css/investors.css` | Kartu profil tamu strategis dengan visual security style. |
| `css/value.css` | Kartu value proposition tilt 3D. |
| `css/process.css` | Kartu step proses seleksi. |
| `css/map.css` | Layout section lokasi + map frame. |
| `css/form.css` | Form dark theme + state error/success. |
| `css/faq.css` | Accordion FAQ. |
| `css/cta.css` | Banner CTA final. |
| `css/footer.css` | Footer layout dan typography. |

## 5.4 Folder `assets/`
| Path | Fungsi |
|---|---|
| `assets/referensi/1.jpg` s.d. `4.jpg` | Aset gambar referensi. Saat ini tidak direferensikan oleh HTML/JS/CSS. |

---

# 6. UI/UX & User Flow

## 6.1 Flow user lengkap (dari masuk sampai akhir)
1. User masuk halaman dan langsung melihat hero positioning + countdown.
2. User melihat indikator kredibilitas (`stats`, `trusted`).
3. User memahami “kenapa event ini berbeda” (`why`).
4. User belajar format venue dan agenda aktivitas.
5. User melihat siapa audiens strategis yang mungkin ditemui.
6. User melihat benefit konkret (`value`) dan proses seleksi (`process`).
7. User cek venue (`map`).
8. User isi pendaftaran (`form`).
9. User verifikasi pertanyaan akhir (`faq`).
10. User mendapatkan dorongan terakhir melalui `cta` dan kanal kontak di `footer`.

## 6.2 Navigasi
- Primary navigation fixed di atas.
- Anchor-based navigation antar section.
- Mobile full-screen overlay menu.
- Active link sinkron dengan section yang terlihat.

## 6.3 Loading/error handling
Loading:
- Tidak ada skeleton/loading state khusus.
- Halaman bergantung pada JS untuk merender konten utama.

Error handling:
- Form punya error message inline per field.
- Tidak ada error handling jaringan karena tidak ada request submit.

## 6.4 Responsive behavior
Breakpoint utama ditemukan di CSS:
- ~1100/1024/920/820/720/640/560/540/480 px.

Pattern responsif:
- Multi-column -> single column di mobile.
- Hover-heavy interactions diberi fallback partial untuk touch.
- Mobile nav menggunakan overlay.

## 6.5 UX pattern utama
- Narrative funnel (awareness -> trust -> intent -> convert).
- Repeated CTA (hero + nav + final cta + footer link).
- Progressive disclosure via cards/accordion/timeline.
- Visual premium untuk menaikkan perceived value event.

## 6.6 Conditional rendering / conditional behavior
Conditional behavior berbasis JS:
- Countdown menampilkan `EVENT LIVE` jika waktu lewat.
- Stats mobile click-only flip (`window.innerWidth <= 920`).
- Agenda mobile auto glow via observer.
- FAQ hanya 1 item terbuka.
- Form success mengganti seluruh isi form.

---

# 7. Database & API Documentation

## 7.1 Status aktual
- Database internal: **tidak ada**.
- API backend internal: **tidak ada**.
- Authentication: **tidak ada**.

## 7.2 “Schema” data lokal (`window.SorceryData`)
Ini bukan DB table, tapi kontrak data in-memory untuk render UI.

### `event`
| Field | Tipe | Contoh |
|---|---|---|
| `name` | string | `Magelang AI Expo` |
| `edition` | string | `2026` |
| `location` | string | `Magelang` |
| `venue` | string | `Lokal Folk Cafe, Magelang` |
| `date` | string | `4 Juni 2026` |
| `deadline` | Date | `2026-06-04T09:00:00+07:00` |
| `tagline` | string | tagline event |

### Koleksi utama lain
| Key | Bentuk data | Dipakai oleh |
|---|---|---|
| `nav` | array `{label, href}` | navbar |
| `stats` | array `{value,label,desc}` | stats cards |
| `vcLogos` | array string | trusted marquee |
| `pillars` | array `{number,title,desc}` | why |
| `zones` | array `{name,role,desc}` | format |
| `agenda` | array `{time,title,desc,tag}` | agenda |
| `investors` | array `{title,thesis,ticket,portfolio}` | investors |
| `values` | array `{icon,title,desc}` | value |
| `process` | array `{step,title,desc}` | process |
| `faq` | array `{q,a}` | faq |

## 7.3 Endpoint API internal
Tidak ada endpoint HTTP internal (`/api/*` tidak tersedia).

## 7.4 Integrasi API/service eksternal
| Service | Penggunaan | Auth |
|---|---|---|
| Google Fonts | Memuat font Plus Jakarta Sans | Tidak perlu |
| Google Maps Embed | Menampilkan iframe lokasi | Tidak perlu |
| maps.app.goo.gl | Link buka maps eksternal | Tidak perlu |
| `mailto:` | Kontak partnership/press | Bergantung mail client user |

## 7.5 Request/response flow form (aktual)
- Request network submit: tidak ada.
- Response server: tidak ada.
- Response UX: success state lokal via replace HTML form.

## 7.6 Implikasi backend logic
Karena backend tidak ada:
- Tidak ada pipeline review pendaftar otomatis.
- Tidak ada penyimpanan lead.
- Tidak ada deduplikasi email.
- Tidak ada audit trail pendaftaran.

---

# 8. Code Quality & Audit

## 8.1 Temuan utama (severity tinggi)
1. **Form tidak mengirim data ke backend**.
- Dampak: konversi terlihat berhasil di UI tetapi data hilang.
- Lokasi: `js/sections/form.js` (submit handler hanya memodifikasi DOM).

2. **Inkonistensi fakta jadwal event**.
- Data deadline: 4 Juni 2026.
- Di hero tertulis `Jumat`, padahal 4 Juni 2026 adalah `Kamis`.
- Dampak: trust/copy accuracy turun.
- Lokasi: `js/sections/hero.js` (baris meta tanggal).

## 8.2 Temuan sedang
1. **Syntax error / garbage token di akhir CSS pillars**.
- Ada blok ekstra di akhir file (`{ padding-top: 5rem; } }`).
- Dampak: parsing error di tail file, maintainability buruk.
- Lokasi: `css/pillars.css` bagian akhir.

2. **Pemakaian CSS variable yang tidak didefinisikan**.
- `--gray-600`, `--gray-400`, `--gray-800`, `--gray-200` dipakai tapi tidak ada di `tokens.css`.
- Dampak: style fallback tidak deterministik.
- Lokasi: `css/agenda.css`, `css/hero.css`, `css/investors.css` vs definisi `css/tokens.css`.

3. **Konten utama fully JS-injected**.
- Dampak: SEO, crawlability, no-JS experience, dan perceived load bisa terdampak.
- Lokasi: `index.html` + `js/main.js`.

## 8.3 Temuan rendah
1. `setInterval` countdown tidak dihentikan saat event lewat.
2. Ada aset image referensi yang belum digunakan.
3. Struktur global namespace rawan collision jika skala project membesar.
4. Aksesibilitas belum lengkap pada accordion/nav state.

## 8.4 Technical debt
- Tidak ada build pipeline (lint/test/minify/typecheck).
- Tidak ada typed contract untuk data object.
- Hardcoded content multilingual campuran (Indonesia/Inggris) di beberapa titik.
- Banyak logic interaksi tergantung viewport check manual.

## 8.5 Redundant logic / maintainability risk
- `scroll-behavior: smooth` di CSS + smooth scroll via JS (duplikasi intent).
- Nav state dikelola oleh click handler + intersection observer + mutation observer, cukup kompleks untuk skala kecil.

## 8.6 Scalability problem
Jika event/halaman bertambah kompleks:
- String template manual sulit di-maintain.
- Global object + script order dependency rentan regressi.
- Reuse komponen lintas halaman rendah.

---

# 9. Security & Performance Analysis

## 9.1 Security
### Positif
- Link external maps memakai `rel="noopener noreferrer"`.
- Success message form melakukan escaping untuk input yang ditampilkan ulang.

### Risiko
1. **Tidak ada backend validation** karena tidak ada submit backend.
2. **Tidak ada CSP header/meta** sehingga proteksi XSS berbasis policy belum ada.
3. **Jika nanti data jadi dinamis**, banyak renderer menulis HTML langsung dari data, berisiko XSS bila data tidak disanitasi.
4. **Tidak ada anti-spam/rate limiting** karena tidak ada endpoint, tapi ini akan jadi kebutuhan saat backend ditambahkan.

## 9.2 Performance
### Positif
- Tidak ada framework runtime berat.
- Asset gambar hampir tidak dipakai pada halaman utama.
- Google Maps iframe menggunakan `loading="lazy"`.

### Risiko/bottleneck
1. Halaman bergantung pada banyak file CSS/JS terpisah tanpa bundling.
2. `innerHTML` besar sekali sekali render; cukup aman untuk skala ini, tapi maintainability menurun seiring kompleksitas.
3. Banyak efek visual (blur, shadow, 3D transforms) berpotensi berat di device low-end.
4. Countdown rewrite DOM tiap detik untuk 2 container.

## 9.3 Rekomendasi improvement prioritas
Prioritas 1 (wajib untuk fungsi bisnis):
- Implement backend submit form (`POST /applications`) + storage.

Prioritas 2 (stabilitas & kualitas):
- Fix syntax error `css/pillars.css`.
- Lengkapi token warna yang hilang atau ganti ke token existing.
- Sinkronkan data tanggal-hari event.

Prioritas 3 (product maturity):
- Tambah analytics conversion funnel.
- Tambah accessibility semantics accordion/nav.
- Pertimbangkan SSR/static pre-render untuk SEO.

---

# 10. Developer/AI Notes

## 10.1 Hal wajib dipahami sebelum develop/refactor
1. Ini project statis yang sangat bergantung urutan load script.
2. `window.SorceryData` adalah source of truth konten.
3. Hampir semua section adalah pure string template.
4. Konversi utama saat ini hanya ilusi UX tanpa persistence data.

## 10.2 Aturan aman saat mengubah fitur
- Jika mengubah struktur data di `data.js`, cek semua section yang consume key tersebut.
- Jika mengubah ID section, update nav href dan anchor terkait.
- Jika menambah icon key di values, pastikan icon ada di `icons.js`.
- Jika mengubah behavior form, pertahankan escape output untuk mencegah injection.

## 10.3 Checklist cepat debugging
- Halaman kosong: cek apakah `#app` ada dan `main.js` termuat.
- Interaksi tidak jalan: cek urutan `<script>` di `index.html`.
- Style aneh: cek CSS variable yang undefined dan syntax error CSS.
- Nav active tidak sinkron: cek `section[id]` dan `nav href` mapping.

## 10.4 Saran arah refactor
- Fase 1: cleanup bug (date mismatch, CSS issues, token consistency).
- Fase 2: backend form + storage + admin review pipeline.
- Fase 3: modularisasi ke component framework atau minimal build step + linting.
- Fase 4: telemetry + A/B copy testing untuk conversion.

---

# 11. Final Conclusion

## 11.1 Web ini sebenarnya apa
Ini adalah **landing page konversi untuk event Magelang AI Expo 2026** yang fokus mempertemukan produk AI dengan pihak bisnis/partner relevan dalam format showcase terkurasi.

## 11.2 Cara kerja inti sistem
Sistem bekerja sepenuhnya di client-side:
- Data statis -> renderer section -> inject ke DOM -> interaksi UI.

Tidak ada backend, tidak ada database, tidak ada auth.

## 11.3 Bagian terpenting project
Bagian terpenting secara bisnis:
- Narasi funnel konten (hero -> trust -> value -> form).
- Form pendaftaran sebagai conversion point.

Bagian terpenting secara teknis:
- `js/data.js` sebagai pusat konten.
- `js/main.js` sebagai orchestration utama.
- `js/sections/form.js` sebagai logic konversi (walau masih client-only).

## 11.4 Masalah terbesar project
Masalah terbesar saat ini adalah **gap antara janji bisnis dan implementasi teknis**:
- Web mendorong user mendaftar, tetapi pendaftaran tidak dikirim/tersimpan.

## 11.5 Improvement paling impactful
Perbaikan paling berdampak:
1. Bangun backend submission + persistence + notifikasi.
2. Bereskan akurasi konten event dan bug CSS/token.
3. Tambah observability conversion untuk mengukur efektivitas funnel.

---

## Lampiran: Bukti poin audit (referensi file)
- Orkestrasi render: `js/main.js`.
- Data source: `js/data.js`.
- Form submit client-only: `js/sections/form.js`.
- Countdown logic: `js/lib/countdown.js`.
- Scroll/interaksi global: `js/lib/scroll.js`.
- Nav behavior: `js/sections/nav.js`.
- Ketidaksesuaian hari event: `js/sections/hero.js` vs tanggal 4 Juni 2026.
- Syntax issue `why` css: `css/pillars.css` bagian akhir.
- Token warna baseline: `css/tokens.css`.
