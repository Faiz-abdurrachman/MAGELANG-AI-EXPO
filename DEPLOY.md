# Phase 1 Deployment Guide — Google Apps Script + Google Sheets

Panduan lengkap deploy backend pendaftaran Magelang AI Expo 2026.

---

## Arsitektur Overview

```
[Frontend (Vercel Static)]        [Google Apps Script]        [Google Sheets]
        │                                │                           │
  Form POST ──text/plain──▶ doPost() ──▶ validatePayload()          │
        │                         │────▶ checkDuplicate()            │
        │                         │────▶ generateSubmissionId()      │
        │                         │────▶ saveToSheet() ──────────▶  Row append
        │                         │────▶ sendFounderEmail()         │
        │                         │────▶ sendOrganizerEmail()       │
        │                         └────▶ return JSON ◀────────────┘│
  Success UI ◀── JSON ──────────────────────────────────────────────┘
        │
  Shows Submission ID
  (MAE-2026-NNN)
```

- **Frontend**: Vanilla JS, zero dependencies, Vercel static deploy
- **Backend**: Google Apps Script Web App (single file `gas/submissions.gs`)
- **Database**: Google Sheet — 12 kolom termasuk Submission ID
- **Email**: MailApp — konfirmasi founder + notifikasi organizer
- **No CORS preflight**: Frontend mengirim `Content-Type: text/plain` (bukan `application/json`)

---

## Step 1: Buat Google Sheet

1. Buka [sheets.google.com](https://sheets.google.com) dan buat spreadsheet baru
2. Rename sheet: **Magelang AI Expo 2026 — Submissions**
3. Copy **Spreadsheet ID** dari URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
                                    ^^^^^^^^^^^^^^^^^^^^
                                    ini yang di-copy
   ```
4. Simpan ID ini — dibutuhkan di Step 3

> **Catatan:** Jangan buat header row manual. Script `setupSheet()` akan membuatnya otomatis di Step 4.

---

## Step 2: Buat Apps Script Project

1. Buka spreadsheet yang baru dibuat
2. Klik **Extensions → Apps Script**
3. Hapus semua kode default di editor
4. Paste seluruh isi file `gas/submissions.gs` ke editor
5. Save project (**Ctrl+S** atau **Cmd+S**)
6. Rename project: **Magelang AI Expo 2026 — Submissions**

---

## Step 3: Konfigurasi Script

Di editor Apps Script, cari object `CONFIG` di bagian atas file dan update:

```javascript
const CONFIG = {
  SPREADSHEET_ID: 'PASTE_YOUR_SPREADSHEET_ID_HERE',  // ← dari Step 1
  SHEET_NAME: 'Submissions',                           // ← biarkan default
  ORGANIZER_EMAILS: ['Contact@data-sorcerers.com'],        // ← tambah email organizer
  EVENT_NAME: 'Magelang AI Expo 2026',                 // ← biarkan default
  EVENT_DATE: '4 Juni 2026',                           // ← biarkan default
  EVENT_VENUE: 'Lokal Folk Cafe, Magelang',            // ← biarkan default
  ID_PREFIX: 'MAE',                                     // ← biarkan default
  ID_YEAR: '2026',                                      // ← biarkan default
  MAX_PAYLOAD_KB: 32,                                   // ← biarkan default
  DUPLICATE_WINDOW_HOURS: 24                            // ← biarkan default
};
```

**Yang harus diisi:**

| Field | Contoh | Wajib |
|-------|--------|:-----:|
| `SPREADSHEET_ID` | `1aBc...xYz` | ✅ |
| `ORGANIZER_EMAILS` | `['team@sorcery.id', 'admin@sorcery.id']` | ✅ |

**Yang tidak perlu diubah:**
- `ID_PREFIX`, `ID_YEAR` — mengontrol format Submission ID (`MAE-2026-NNN`)
- `DUPLICATE_WINDOW_HOURS` — proteksi duplikat email (24 jam default)
- `MAX_PAYLOAD_KB` — batas ukuran payload

---

## Step 4: Inisialisasi Sheet

1. Di editor Apps Script, klik dropdown fungsi di toolbar atas
2. Pilih **`setupSheet`** (bukan `doPost`)
3. Klik tombol **▶ Run**
4. **First run — Google akan meminta izin:**
   - Klik **Review permissions**
   - Pilih akun Google Anda
   - Klik **Advanced** → **Go to Magelang AI Expo 2026 — Submissions (unsafe)**
   - Klik **Allow**
   - Izin yang diminta:
     - ✅ **Edit your Google Sheets** — untuk menulis data pendaftaran
     - ✅ **Send email on your behalf** — untuk kirim email konfirmasi & notifikasi
5. Setelah selesai, cek spreadsheet Anda — harusnya ada:
   - **Header row** dengan 12 kolom:
     ```
     Submission ID | Waktu Submit | Nama Produk/Tim | Nama Founder | Email | WhatsApp | Kategori Industri | Tahap Produk | Progress / Use Case | Link Demo / Deck | Status | Catatan Admin
     ```
   - **Header styling** — bold, background biru, text putih
   - **Frozen row** — baris header terkunci saat scroll
   - **Status dropdown** — di kolom Status (baris 2–1001) dengan values:
     `Baru`, `Ditinjau`, `Dihubungi`, `Diterima`, `Ditolak`, `Briefing`, `Expo Day`

> **Troubleshooting Step 4:**
> - Jika muncul error "Script function not found" — pastikan dropdown sudah di-set ke `setupSheet` (bukan `doPost`)
> - Jika sheet sudah punya header dari run sebelumnya, `setupSheet` tidak akan overwrite (cek: `getLastRow() === 0`)

---

## Step 5: Deploy sebagai Web App

1. Di editor Apps Script, klik **Deploy → New deployment**
2. Klik ikon gear di samping "Select type" → pilih **Web app**
3. Isi konfigurasi:

   | Field | Value | Kenapa |
   |-------|-------|--------|
   | Description | `Magelang AI Expo Submissions v1` | Untuk tracking versi |
   | Execute as | **Me** (akun Google Anda) | Email terkirim dari akun Anda |
   | Who has access | **Anyone** | Wajib — form frontend kirim cross-origin POST |

4. Klik **Deploy**
5. Copy **Web app URL** — formatnya:
   ```
   https://script.google.com/macros/s/SCRIPT_ID/exec
   ```
6. Simpan URL ini — dibutuhkan di Step 6

> **PENTING:** Setiap kali edit script, Anda harus buat **New deployment** (bukan hanya Save). URL berubah di setiap deployment baru. Deployment lama tetap aktif sampai di-delete manual.

---

## Step 6: Hubungkan Frontend

1. Buka file `js/sections/form.js`
2. Cari baris ini di bagian atas:
   ```javascript
   window.SorceryApp.GAS_ENDPOINT = 'PASTE_YOUR_GAS_WEB_APP_URL_HERE';
   ```
3. Ganti dengan Web app URL dari Step 5:
   ```javascript
   window.SorceryApp.GAS_ENDPOINT = 'https://script.google.com/macros/s/SCRIPT_ID/exec';
   ```
4. Save file

> **Jangan commit placeholder value ke production.** Pastikan URL asli sudah diisi sebelum push ke Vercel.

---

## Step 7: Test Integrasi End-to-End

### 7a. Jalankan Dev Server

```bash
npm run dev
```

Buka `http://localhost:3000` di browser.

### 7b. Test Submission Normal

1. Scroll ke section "Daftar"
2. Isi form dengan data test:
   - Nama Produk/Tim: `Test Startup`
   - Nama Founder: `John Test`
   - Email: `your-test-email@gmail.com`
   - WhatsApp: `+6281234567890`
   - Kategori: (pilih salah satu)
   - Tahap: (pilih salah satu)
   - Progress: `Testing submission system`
   - Link Demo/Deck: `https://example.com`
3. Klik **Kirim Pendaftaran**
4. Verifikasi:

   | Check | Expected |
   |:-----:|----------|
   | ✅ | Form berubah ke success state |
   | ✅ | Success state menampilkan **Submission ID** (format `MAE-2026-001`) |
   | ✅ | Success state menampilkan pesan "Simpan ID ini untuk referensi" |
   | ✅ | Google Sheet bertambah 1 row baru |
   | ✅ | Kolom **Submission ID** berisi `MAE-2026-001` |
   | ✅ | Kolom **Status** berisi `Baru` |
   | ✅ | Email konfirmasi masuk ke inbox test email |
   | ✅ | Subject email founder: `Pendaftaran Magelang AI Expo 2026 Diterima — MAE-2026-001` |
   | ✅ | Email founder menampilkan Submission ID di detail pendaftaran |
   | ✅ | Email founder menampilkan pesan "Simpan MAE-2026-001 sebagai referensi" |
   | ✅ | Email notifikasi masuk ke organizer |
   | ✅ | Subject email organizer: `[Baru] MAE-2026-001 — Test Startup` |
   | ✅ | Email organizer menampilkan Submission ID sebagai highlighted chip di atas |

### 7c. Test Submission ID Sequential

1. Submit form kedua kali dengan email berbeda
2. Verifikasi:
   - ✅ Submission ID di frontend: `MAE-2026-002`
   - ✅ Sheet row baru: kolom Submission ID = `MAE-2026-002`
   - ✅ Email subjects include `MAE-2026-002`

### 7d. Test Duplikat Email

1. Submit form lagi dengan **email yang sama** seperti test pertama (dalam 24 jam)
2. Verifikasi:
   - ✅ Field email menampilkan error: "Email ini sudah mengajukan pendaftaran dalam 24 jam terakhir..."
   - ✅ Tidak ada row baru di Sheet
   - ✅ Tidak ada email terkirim

### 7e. Test Validasi Server-Side

1. Coba kirim payload kosong (bisa via browser DevTools Console):
   ```javascript
   fetch('YOUR_GAS_URL', {
     method: 'POST',
     headers: { 'Content-Type': 'text/plain' },
     body: JSON.stringify({})
   }).then(r => r.json()).then(console.log)
   ```
2. Verifikasi:
   - ✅ Response: `{ success: false, error: "startup wajib diisi. founder wajib diisi...", code: 422 }`

---

## Step 8: Deploy ke Vercel

1. Pastikan `GAS_ENDPOINT` di `form.js` sudah berisi URL asli (bukan placeholder)
2. Commit semua perubahan:
   ```bash
   git add .
   git commit -m "wire GAS endpoint + submission ID system"
   ```
3. Push ke repository:
   ```bash
   git push
   ```
4. Vercel akan auto-deploy

> **Deployment ini 100% static** — tidak ada serverless function, tidak ada API route. Semua data flow lewat GAS.

---

## Submission ID System

### Format

```
MAE-2026-001
MAE-2026-002
MAE-2026-003
...
MAE-2026-999
```

- **Prefix**: `MAE` (dari `CONFIG.ID_PREFIX`)
- **Year**: `2026` (dari `CONFIG.ID_YEAR`)
- **Number**: 3-digit, zero-padded, sequential

### Cara Kerja

1. `doPost()` memanggil `generateSubmissionId()`
2. Function membaca **Submission ID** di **row terakhir** Sheet
3. Extract angka dari suffix (e.g., `MAE-2026-003` → `3`)
4. Increment +1 → `4`
5. Zero-pad ke 3 digit → `004`
6. Return `MAE-2026-004`
7. Jika Sheet kosong (data row = 0), mulai dari `MAE-2026-001`

### Concurrency Safety

- GAS mengeksekusi script instance secara serial per deployment
- `SpreadsheetApp.flush()` dipanggil setelah `appendRow()` di `saveToSheet()`
- Untuk volume pendaftaran event (puluhan, bukan ribuan/detik), ini sudah cukup aman
- Jika dibutuhkan di masa depan, bisa ditambah `LockService.getScriptLock()` untuk proteksi ekstra

### Di Mana Submission ID Muncul

| Tempat | Contoh |
|--------|--------|
| Google Sheet — kolom pertama | `MAE-2026-001` |
| Frontend success state | `Submission ID: MAE-2026-001` |
| Email founder — subject | `Pendaftaran Magelang AI Expo 2026 Diterima — MAE-2026-001` |
| Email founder — body detail | `Submission ID: MAE-2026-001` |
| Email founder — referensi box | `Simpan MAE-2026-001 sebagai referensi...` |
| Email organizer — subject | `[Baru] MAE-2026-001 — Startup Name` |
| Email organizer — highlighted chip | `MAE-2026-001` (highlighted di atas detail) |

---

## Kolom Google Sheet

| # | Kolom | Index | Deskripsi |
|---|-------|:-----:|-----------|
| 1 | Submission ID | 0 | Auto-generated `MAE-2026-NNN` |
| 2 | Waktu Submit | 1 | Timestamp otomatis |
| 3 | Nama Produk/Tim | 2 | Nama startup/produk |
| 4 | Nama Founder | 3 | Nama founder/CEO |
| 5 | Email | 4 | Email bisnis (unique check) |
| 6 | WhatsApp | 5 | Nomor WhatsApp |
| 7 | Kategori Industri | 6 | Kategori industri startup |
| 8 | Tahap Produk | 7 | Tahap produk |
| 9 | Progress / Use Case | 8 | Deskripsi progress/traksi |
| 10 | Link Demo / Deck | 9 | Link demo atau pitch deck |
| 11 | Status | 10 | Dropdown: Baru → Expo Day |
| 12 | Catatan Admin | 11 | Catatan internal admin |

### Status Workflow

```
Baru → Ditinjau → Dihubungi → Diterima → Briefing → Expo Day
                  ↘ Ditolak
```

---

## Admin Workflow

### Review Pendaftaran Baru

1. Buka Google Sheet
2. Filter **Status = Baru**
3. Untuk setiap pendaftaran:
   - Catat **Submission ID** sebagai referensi utama
   - Cek link demo/deck
   - Evaluasi kesiapan produk
   - Baca deskripsi progress/use case
4. Update kolom **Status** via dropdown
5. Tambah catatan di kolom **Catatan Admin**

### Komunikasi dengan Founder

Selalu **referensi Submission ID** saat komunikasi dengan founder:
- Email: "Terkait pendaftaran Anda (MAE-2026-003)..."
- WhatsApp: "Halo, ini terkait MAE-2026-003..."
- Hal ini memudahkan pencarian di Sheet

### Kirim Ulang Email Konfirmasi

Jika founder tidak menerima email konfirmasi:

1. Buka Apps Script editor
2. Pilih fungsi **`resendFounderEmail`** dari dropdown
3. Klik di samping nama fungsi untuk input parameter
4. Masukkan **nomor row** (bukan Submission ID):
   - Row 2 = data pertama (row 1 = header)
   - Contoh: `resendFounderEmail(5)` → kirim ulang email untuk row 5
5. Klik **▶ Run**
6. Cek execution log untuk konfirmasi

> **Tips:** Untuk mencari row number dari Submission ID, gunakan Ctrl+F di Sheet dan cari `MAE-2026-003`, lalu lihat nomor row-nya.

### Update Setelah Re-Deploy Script

Jika script GAS di-edit dan di-re-deploy:

1. Buat **New deployment** (Deploy → New deployment)
2. Copy Web app URL yang baru
3. Update `GAS_ENDPOINT` di `js/sections/form.js`
4. Commit & push ke trigger Vercel re-deploy
5. **URL lama tetap aktif** sampai di-delete manual di Apps Script

---

## Troubleshooting

| Problem | Penyebab | Solusi |
|---------|----------|--------|
| `405 Method Not Allowed` | Deployment type bukan Web app, atau access bukan "Anyone" | Buat ulang deployment → pilih Web app → Who has access: Anyone |
| CORS error di browser console | `Content-Type: application/json` trigger preflight | Pastikan frontend kirim `Content-Type: text/plain` (sudah di-set di `form.js`) |
| Email tidak masuk | Belum grant permission / masuk spam | Re-run `setupSheet` → grant email permission. Cek folder spam. |
| Sheet tidak update | `SPREADSHEET_ID` salah | Cek URL Sheet vs CONFIG. Lihat Apps Script execution logs (tab Executions). |
| Submission ID tidak sequential | Race condition (sangat jarang di volume rendah) | `SpreadsheetApp.flush()` sudah dipanggil setelah append. Jika tetap terjadi, tambah `LockService`. |
| `UrlFetch` error | — | Script ini tidak membuat outbound HTTP calls. Jika muncul, cek apakah ada script lain di project. |
| Script error setelah edit | Deployment lama masih aktif dengan code lama | Selalu buat **New deployment** setelah edit. Jangan hanya Save. |
| Submission ID format salah | Ada data manual di Sheet yang mengacaukan parsing | Pastikan kolom Submission ID hanya berisi format `MAE-2026-NNN`. Jangan edit manual. |
| `resendFounderEmail` gagal | Row number salah (header = row 1) | Pastikan row number ≥ 2. Row 1 = header. |
| Frontend tetap show placeholder URL | `GAS_ENDPOINT` belum di-update | Edit `js/sections/form.js` baris 3. |
| Form submit tapi tidak ada response | GAS deployment URL expired / salah | Test URL langsung di browser: `https://script.google.com/macros/s/ID/exec` harus return `{"status":"ok",...}` |

---

## Security Notes

- GAS web app **publicly accessible** — wajib untuk cross-origin form POST
- **Server-side validation** berjalan di setiap submission
- **Duplicate protection**: email yang sama diblok 24 jam
- **Payload limit**: 32KB max
- **XSS protection**: semua input di-trim + HTML-escaped di email output
- **No sensitive data** disimpan selain yang dikirim form
- **Sheet private** — hanya accessible oleh orang yang di-share
- **Email sent from your Google account** — bukan custom domain
- **No authentication on GAS endpoint** — siapapun bisa POST. Proteksi ada di:
  - Server-side validation (wajib isi semua field)
  - Duplicate email check
  - Payload size limit
  - Rate limit natural dari GAS (quota per account)

---

## Checklist Pre-Launch

Sebelum go live, pastikan:

- [ ] `SPREADSHEET_ID` di `gas/submissions.gs` sudah diisi
- [ ] `GAS_ENDPOINT` di `js/sections/form.js` sudah diisi
- [ ] `setupSheet()` sudah dijalankan — header row + dropdown ada
- [ ] Test submission berhasil — data masuk Sheet, email terkirim
- [ ] Submission ID muncul di Sheet, frontend, dan kedua email
- [ ] Test duplikat email — error muncul, tidak ada double entry
- [ ] Organizer email masuk ke semua email di `ORGANIZER_EMAILS`
- [ ] Status dropdown berfungsi di Sheet
- [ ] Vercel deployment up to date
- [ ] Validasi nomor WhatsApp berfungsi (input sampah ditolak)
- [ ] Validasi URL HTTPS-only berfungsi (`http://` ditolak)
- [ ] Formula injection protection aktif (`= + - @` di-prefix apostrof)
- [ ] Enum validation kategori & tahap berfungsi (nilai arbitrer ditolak)
- [ ] Email dinormalisasi ke lowercase sebelum disimpan

---

## Update Deployment (Tanpa Ganti URL)

Ketika kamu edit code GAS dan perlu mengupdate yang sudah berjalan:

### Cara: Manage Deployments (URL tetap sama)

1. Di Apps Script editor, setelah selesai edit, **Save** (Ctrl+S)
2. Klik **Deploy → Manage deployments**
3. Klik **pencil icon** (✏️) di deployment yang aktif
4. Di kolom **Version**, pilih **New version** (bukan versi lama)
5. Opsional: update **Description** (misal: `v2 — validation audit`)
6. Klik **Deploy**
7. **URL tetap sama** — frontend nggak perlu di-update
8. Deployment lama otomatis diganti dengan versi baru

> **Kenapa pakai Manage Deployments, bukan New Deployment?**
> - New Deployment = URL baru → harus update `form.js` → git push → Vercel redeploy
> - Manage Deployments = URL tetap → cukup update versi di GAS, selesai

### Kapan Perlu New Deployment?

- **Hampir tidak pernah.** Gunakan Manage Deployments untuk semua update code.
- New Deployment hanya kalau kamu mau membuat endpoint terpisah (misal: staging vs production).

---

## Changelog — Validasi & Keamanan

### v2 — Backend Validation Audit

Perubahan yang diterapkan setelah audit keamanan:

| # | Perubahan | File | Risiko Regresi |
|---|-----------|------|:--------------:|
| 1 | Tambah `sanitiseForSheet()` — prefix `'` untuk value `= + - @` | `gas/submissions.gs` | Rendah — apostrof tidak muncul di cell |
| 2 | `saveToSheet()` — semua user value dibungkus `sanitiseForSheet()` | `gas/submissions.gs` | Rendah — data lama tidak terpengaruh |
| 3 | Validasi nomor WhatsApp — regex `^\+?[\d\s\-()]{6,30}$` + min 6 digit | `gas/submissions.gs` + `form.js` | Rendah — format WA Indonesia lolos |
| 4 | URL wajib HTTPS — regex hanya terima `https://`, TLD min 2 karakter | `gas/submissions.gs` + `form.js` | Rendah — hampir semua link demo pakai HTTPS |
| 5 | Enum validation kategori & tahap — nilai arbitrer ditolak | `gas/submissions.gs` | Rendah — frontend pakai `<select>` |
| 6 | Email dinormalisasi ke lowercase sebelum disimpan | `gas/submissions.gs` | Rendah — duplicate check sudah case-insensitive |
| 7 | Min-length nama founder & startup (min 2 karakter) | `gas/submissions.gs` | Rendah — nama 1 huruf tidak bermakna |
| 8 | Regex email diperketat — TLD min 2 karakter | `gas/submissions.gs` + `form.js` | Rendah — `.id`, `.com` dll semua lolos |

### Yang TIDAK Berubah

- Struktur Sheet (kolom, urutan) tetap sama
- Submission ID system tetap sama
- Email templates tetap sama
- Duplicate check logic tetap sama
- Frontend ↔ Backend contract tetap sama
- GAS Web App URL tetap sama

---

## Test Checklist — Validasi Audit

Setelah update deployment, jalankan test berikut:

### Nomor WhatsApp

| Input | Expected |
|-------|----------|
| `+6281234567890` | ✅ Lolos |
| `0812 3456 7890` | ✅ Lolos |
| `0812-345-6789` | ✅ Lolos |
| `(021) 123-4567` | ✅ Lolos |
| `halo bro` | ❌ Error: "Format nomor tidak valid" |
| `abc123` | ❌ Error |
| `1` | ❌ Error |
| `<script>alert(1)</script>` | ❌ Error |

### URL Demo/Deck

| Input | Expected |
|-------|----------|
| `https://example.com/demo` | ✅ Lolos |
| `https://drive.google.com/file/d/xxx` | ✅ Lolos |
| `http://example.com` | ❌ Error: gunakan https |
| `ftp://files.com` | ❌ Error |
| `https://x` | ❌ Error (TLD terlalu pendek) |
| `javascript://evil.com` | ❌ Error |

### Formula Injection

| Input (nama startup) | Di Sheet |
|----------------------|----------|
| `=HYPERLINK("x","y")` | Teks biasa `'=`HYPERLINK... — bukan formula |
| `+cmd|' /C calc'!A0` | Teks biasa `'+'` + cmd... |
| `-SUM(A1:A100)` | Teks biasa `'-'` SUM... |
| `@SUM(A1:A100)` | Teks biasa `'@'` SUM... |
| `Startup Biasa` | Teks biasa tanpa prefix |

### Email

| Input | Expected |
|-------|----------|
| `Test@Gmail.com` | Disimpan `test@gmail.com` |
| `test@domain` | ❌ Error (TLD terlalu pendek) |
| `test@domain.com` | ✅ Lolos |
| `test@startup.id` | ✅ Lolos |

### Kategori & Tahap (API direct)

| Input | Expected |
|-------|----------|
| `AI / Machine Learning` | ✅ Lolos |
| `hacked` | ❌ Error: "Kategori industri tidak valid" |
| `MVP berjalan` | ✅ Lolos |
| `random text` | ❌ Error: "Tahap produk tidak valid" |

### Submission Normal (End-to-End)

1. Isi form dengan data valid
2. Submit
3. Verifikasi:
   - ✅ Success state muncul + Submission ID
   - ✅ Row baru di Sheet, semua value bersih
   - ✅ Email konfirmasi masuk ke founder
   - ✅ Email notifikasi masuk ke organizer
