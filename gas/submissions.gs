/* ============================================
   Magelang AI Expo 2026 — Phase 1 Backend
   Google Apps Script: Form Submission Handler
   ============================================

   DEPLOY:  Deploy as Web App (Execute as: Me, Access: Anyone)
   SHEET:   Create a Google Sheet, paste its ID below
   EMAIL:   MailApp.sendEmail() requires "Send email" permission on first run
   */

const CONFIG = {
  SPREADSHEET_ID: 'PASTE_YOUR_SPREADSHEET_ID_HERE',
  SHEET_NAME: 'Submissions',
  ORGANIZER_EMAILS: ['Contact@data-sorcerers.com'],
  EVENT_NAME: 'Magelang AI Expo 2026',
  EVENT_DATE: '4 Juni 2026',
  EVENT_VENUE: 'Lokal Folk Cafe, Magelang',
  ID_PREFIX: 'MAE',
  ID_YEAR: '2026',
  MAX_PAYLOAD_KB: 32,
  DUPLICATE_WINDOW_HOURS: 24
};

/*  Column layout — Submission ID is column 1 (index 0)
    Index: 0              1            2                 3              4           5                 6               7                    8                 9       10              */
const COLUMNS = [
  'Submission ID',
  'Waktu Submit',
  'Nama Produk/Tim',
  'Nama Founder',
  'Email',
  'WhatsApp',
  'Kategori Industri',
  'Tahap Produk',
  'Progress / Use Case',
  'Link Demo / Deck',
  'Status',
  'Catatan Admin'
];

const COL = {
  SID: 0, TIMESTAMP: 1, STARTUP: 2, FOUNDER: 3, EMAIL: 4,
  PHONE: 5, CATEGORY: 6, STAGE: 7, TRACTION: 8, DECK: 9,
  STATUS: 10, NOTES: 11
};

const REQUIRED = ['startup', 'founder', 'email', 'phone', 'category', 'stage', 'traction', 'deck'];

/* ============================================
   ENTRY POINTS
   ============================================ */

function doPost(e) {
  try {
    var payload = parsePayload(e);
    validatePayload(payload);
    checkDuplicate(payload.email);
    var submissionId = generateSubmissionId();
    saveToSheet(payload, submissionId);
    sendFounderEmail(payload, submissionId);
    sendOrganizerEmail(payload, submissionId);
    return jsonOk({ success: true, submissionId: submissionId, message: 'Pendaftaran berhasil dikirim.' });
  } catch (err) {
    if (err.isPublic) {
      return jsonError(err.message, err.code || 400);
    }
    console.error('doPost error:', err);
    return jsonError('Terjadi kesalahan server. Silakan coba lagi.', 500);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'magelang-ai-expo-submissions' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ============================================
   PARSE + SANITIZE
   ============================================ */

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw publicError('Request body kosong.', 400);
  }

  var sizeKB = (e.postData.contents.length / 1024);
  if (sizeKB > CONFIG.MAX_PAYLOAD_KB) {
    throw publicError('Payload terlalu besar.', 413);
  }

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (_) {
    throw publicError('Format JSON tidak valid.', 400);
  }

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw publicError('Data harus berupa objek.', 400);
  }

  var sanitized = {};
  var fields = ['startup', 'founder', 'email', 'phone', 'category', 'stage', 'traction', 'deck'];
  for (var i = 0; i < fields.length; i++) {
    var key = fields[i];
    var val = data[key];
    sanitized[key] = (typeof val === 'string') ? val.trim() : '';
  }

  return sanitized;
}

/* ============================================
   VALIDATION
   ============================================ */

function validatePayload(p) {
  var errors = [];

  for (var i = 0; i < REQUIRED.length; i++) {
    if (!p[REQUIRED[i]]) {
      errors.push(REQUIRED[i] + ' wajib diisi.');
    }
  }

  if (p.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
    errors.push('Format email tidak valid.');
  }

  if (p.deck && !/^https?:\/\/.+\..+/.test(p.deck)) {
    errors.push('Link demo/deck tidak valid.');
  }

  if (p.founder && p.founder.length > 200) {
    errors.push('Nama founder terlalu panjang.');
  }

  if (p.startup && p.startup.length > 200) {
    errors.push('Nama produk terlalu panjang.');
  }

  if (p.traction && p.traction.length > 2000) {
    errors.push('Deskripsi terlalu panjang (maks 2000 karakter).');
  }

  if (errors.length > 0) {
    throw publicError(errors.join(' '), 422);
  }
}

/* ============================================
   DUPLICATE CHECK
   ============================================ */

function checkDuplicate(email) {
  if (!email) return;

  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return;

  var cutoff = new Date(Date.now() - CONFIG.DUPLICATE_WINDOW_HOURS * 60 * 60 * 1000);
  var emailCol = COL.EMAIL;

  for (var i = data.length - 1; i >= 1; i--) {
    var row = data[i];
    if (row[emailCol] && String(row[emailCol]).toLowerCase() === email.toLowerCase()) {
      var rowTime = row[COL.TIMESTAMP];
      if (rowTime instanceof Date && rowTime >= cutoff) {
        throw publicError('Email ini sudah mengajukan pendaftaran dalam ' + CONFIG.DUPLICATE_WINDOW_HOURS + ' jam terakhir. Tim kami akan menghubungi Anda.', 409);
      }
    }
  }
}

/* ============================================
   SUBMISSION ID GENERATION
   ============================================ */

function generateSubmissionId() {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  var nextNum = 1;

  if (sheet && sheet.getLastRow() > 1) {
    var lastRow = sheet.getRange(sheet.getLastRow(), COL.SID + 1, 1, 1).getValue();
    if (lastRow && typeof lastRow === 'string') {
      var match = lastRow.match(/(\d+)$/);
      if (match) {
        nextNum = parseInt(match[1], 10) + 1;
      }
    }
  }

  var padded = String(nextNum).padStart(3, '0');
  return CONFIG.ID_PREFIX + '-' + CONFIG.ID_YEAR + '-' + padded;
}

/* ============================================
   SAVE TO SHEET
   ============================================ */

function saveToSheet(p, submissionId) {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold').setBackground('#0c4a6e').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  var now = new Date();
  sheet.appendRow([
    submissionId,
    now,
    p.startup,
    p.founder,
    p.email,
    p.phone,
    p.category,
    p.stage,
    p.traction,
    p.deck,
    'Baru',
    ''
  ]);

  SpreadsheetApp.flush();
  autoResize(sheet);
}

function autoResize(sheet) {
  try {
    for (var i = 1; i <= COLUMNS.length; i++) {
      sheet.autoResizeColumn(i);
    }
  } catch (_) {}
}

/* ============================================
   EMAIL — FOUNDER CONFIRMATION
   ============================================ */

function sendFounderEmail(p, submissionId) {
  var subject = 'Pendaftaran Magelang AI Expo 2026 Diterima — ' + submissionId;
  var body = founderEmailHtml(p, submissionId);
  try {
    MailApp.sendEmail({
      to: p.email,
      subject: subject,
      htmlBody: body,
      name: CONFIG.EVENT_NAME
    });
  } catch (err) {
    console.error('Founder email failed:', err);
  }
}

function founderEmailHtml(p, submissionId) {
  return '<!DOCTYPE html><html><head><meta charset="utf-8"></head>' +
    '<body style="margin:0;padding:0;background:#020617;font-family:system-ui,-apple-system,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:2rem 0;">' +
    '<tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">' +

    '<tr><td style="background:linear-gradient(135deg,#0c4a6e,#0ea5e9);padding:2rem 2.5rem;">' +
    '<h1 style="margin:0;color:#fff;font-size:1.5rem;font-weight:800;letter-spacing:-0.02em;">' + escHtml(CONFIG.EVENT_NAME) + '</h1>' +
    '<p style="margin:0.5rem 0 0;color:rgba(255,255,255,0.8);font-size:0.875rem;">Pendaftaran Diterima</p>' +
    '</td></tr>' +

    '<tr><td style="padding:2rem 2.5rem;">' +
    '<p style="margin:0 0 1rem;color:#e2e8f0;font-size:1rem;line-height:1.6;">Halo <strong style="color:#fff;">' + escHtml(p.founder) + '</strong>,</p>' +
    '<p style="margin:0 0 1rem;color:#cbd5e1;font-size:0.9375rem;line-height:1.65;">Terima kasih telah mendaftarkan <strong style="color:#e2e8f0;">' + escHtml(p.startup) + '</strong> untuk ' + escHtml(CONFIG.EVENT_NAME) + '. Kami telah menerima pendaftaran Anda.</p>' +

    '<table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(14,165,233,0.06);border:1px solid rgba(14,165,233,0.15);border-radius:12px;margin:1.5rem 0;">' +
    '<tr><td style="padding:1.25rem 1.5rem;">' +
    '<p style="margin:0 0 0.5rem;color:#38bdf8;font-size:0.75rem;font-weight:700;letter-spacing:0.1em;">DETAIL PENDAFTARAN</p>' +
    '<p style="margin:0 0 0.25rem;color:#cbd5e1;font-size:0.875rem;"><strong style="color:#e2e8f0;">Submission ID:</strong> ' + escHtml(submissionId) + '</p>' +
    '<p style="margin:0 0 0.25rem;color:#cbd5e1;font-size:0.875rem;"><strong style="color:#e2e8f0;">Produk:</strong> ' + escHtml(p.startup) + '</p>' +
    '<p style="margin:0 0 0.25rem;color:#cbd5e1;font-size:0.875rem;"><strong style="color:#e2e8f0;">Kategori:</strong> ' + escHtml(p.category) + '</p>' +
    '<p style="margin:0 0 0.25rem;color:#cbd5e1;font-size:0.875rem;"><strong style="color:#e2e8f0;">Tahap:</strong> ' + escHtml(p.stage) + '</p>' +
    '<p style="margin:0;color:#cbd5e1;font-size:0.875rem;"><strong style="color:#e2e8f0;">Event:</strong> ' + escHtml(CONFIG.EVENT_DATE) + ' — ' + escHtml(CONFIG.EVENT_VENUE) + '</p>' +
    '</td></tr></table>' +

    '<p style="margin:1.5rem 0 0.5rem;color:#cbd5e1;font-size:0.9375rem;line-height:1.65;"><strong style="color:#e2e8f0;">Langkah Selanjutnya</strong></p>' +
    '<p style="margin:0 0 0.5rem;color:#cbd5e1;font-size:0.875rem;line-height:1.65;">Tim kurasi akan meninjau pendaftaran Anda berdasarkan kejelasan problem, kesiapan demo, dan relevansi dengan kebutuhan audiens bisnis. Proses review membutuhkan waktu hingga 7 hari kerja.</p>' +
    '<p style="margin:0 0 0.75rem;color:#cbd5e1;font-size:0.875rem;line-height:1.65;">Jika terpilih, tim kami akan menghubungi Anda untuk briefing sebelum acara. Mohon cek folder spam jika tidak menerima email dari kami.</p>' +
    '<p style="margin:0;padding:0.625rem 1rem;background:rgba(14,165,233,0.08);border:1px solid rgba(14,165,233,0.12);border-radius:8px;color:#94a3b8;font-size:0.8125rem;line-height:1.5;">Simpan <strong style="color:#cbd5e1;">' + escHtml(submissionId) + '</strong> sebagai referensi untuk komunikasi dengan tim acara.</p>' +
    '</td></tr>' +

    '<tr><td style="padding:1.5rem 2.5rem;border-top:1px solid rgba(255,255,255,0.06);">' +
    '<p style="margin:0;color:#64748b;font-size:0.75rem;line-height:1.5;">Email ini dikirim otomatis oleh sistem pendaftaran ' + escHtml(CONFIG.EVENT_NAME) + '. Pendaftaran tidak menjamin partisipasi — tim kurasi akan menghubungi Anda jika terpilih.</p>' +
    '</td></tr>' +

    '</table></td></tr></table></body></html>';
}

/* ============================================
   EMAIL — ORGANIZER NOTIFICATION
   ============================================ */

function sendOrganizerEmail(p, submissionId) {
  var subject = '[Baru] ' + submissionId + ' — ' + p.startup;
  var body = organizerEmailHtml(p, submissionId);
  for (var i = 0; i < CONFIG.ORGANIZER_EMAILS.length; i++) {
    try {
      MailApp.sendEmail({
        to: CONFIG.ORGANIZER_EMAILS[i],
        subject: subject,
        htmlBody: body,
        name: CONFIG.EVENT_NAME + ' — Notifikasi'
      });
    } catch (err) {
      console.error('Organizer email failed for ' + CONFIG.ORGANIZER_EMAILS[i] + ':', err);
    }
  }
}

function organizerEmailHtml(p, submissionId) {
  return '<!DOCTYPE html><html><head><meta charset="utf-8"></head>' +
    '<body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="padding:1.5rem 0;">' +
    '<tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">' +

    '<tr><td style="background:#0f172a;padding:1.25rem 1.5rem;">' +
    '<p style="margin:0;color:#0ea5e9;font-size:0.6875rem;font-weight:700;letter-spacing:0.1em;">PENDAFTARAN BARU</p>' +
    '<h1 style="margin:0.25rem 0 0;color:#fff;font-size:1.25rem;font-weight:800;">' + escHtml(p.startup) + '</h1>' +
    '</td></tr>' +

    '<tr><td style="padding:1.5rem;">' +

    '<div style="margin-bottom:1rem;padding:0.75rem 1rem;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;font-size:1rem;font-weight:700;color:#0369a1;letter-spacing:0.02em;">' + escHtml(submissionId) + '</div>' +

    '<table width="100%" cellpadding="0" cellspacing="0" style="font-size:0.875rem;">' +
    '<tr><td style="padding:0.375rem 0;color:#64748b;width:140px;">Founder</td><td style="padding:0.375rem 0;color:#0f172a;font-weight:600;">' + escHtml(p.founder) + '</td></tr>' +
    '<tr><td style="padding:0.375rem 0;color:#64748b;">Email</td><td style="padding:0.375rem 0;"><a href="mailto:' + escAttr(p.email) + '" style="color:#0ea5e9;">' + escHtml(p.email) + '</a></td></tr>' +
    '<tr><td style="padding:0.375rem 0;color:#64748b;">WhatsApp</td><td style="padding:0.375rem 0;color:#0f172a;">' + escHtml(p.phone) + '</td></tr>' +
    '<tr><td style="padding:0.375rem 0;color:#64748b;">Kategori</td><td style="padding:0.375rem 0;color:#0f172a;">' + escHtml(p.category) + '</td></tr>' +
    '<tr><td style="padding:0.375rem 0;color:#64748b;">Tahap Produk</td><td style="padding:0.375rem 0;color:#0f172a;">' + escHtml(p.stage) + '</td></tr>' +
    '<tr><td style="padding:0.375rem 0;color:#64748b;">Demo / Deck</td><td style="padding:0.375rem 0;"><a href="' + escAttr(p.deck) + '" style="color:#0ea5e9;">Lihat Link</a></td></tr>' +
    '</table>' +

    '<div style="margin-top:1rem;padding:1rem;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">' +
    '<p style="margin:0 0 0.25rem;color:#64748b;font-size:0.75rem;font-weight:600;">PROGRESS / USE CASE</p>' +
    '<p style="margin:0;color:#334155;font-size:0.875rem;line-height:1.6;white-space:pre-wrap;">' + escHtml(p.traction) + '</p>' +
    '</div>' +

    '<a href="https://docs.google.com/spreadsheets/d/' + CONFIG.SPREADSHEET_ID + '" style="display:inline-block;margin-top:1.25rem;padding:0.625rem 1.25rem;background:#0ea5e9;color:#fff;border-radius:8px;text-decoration:none;font-size:0.875rem;font-weight:600;">Buka Spreadsheet</a>' +
    '</td></tr>' +

    '</table></td></tr></table></body></html>';
}

/* ============================================
   HELPERS
   ============================================ */

function jsonOk(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonError(message, code) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, error: message, code: code }))
    .setMimeType(ContentService.MimeType.JSON);
}

function publicError(message, code) {
  var err = new Error(message);
  err.isPublic = true;
  err.code = code || 400;
  return err;
}

function escHtml(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function escAttr(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ============================================
   SHEET SETUP (run once from script editor)
   ============================================ */

function setupSheet() {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold').setBackground('#0c4a6e').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  var statusCol = COL.STATUS + 1;
  var validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Baru', 'Ditinjau', 'Dihubungi', 'Diterima', 'Ditolak', 'Briefing', 'Expo Day'], true)
    .build();
  sheet.getRange(2, statusCol, 1000, 1).setDataValidation(validation);

  SpreadsheetApp.flush();
  Logger.log('Sheet "' + CONFIG.SHEET_NAME + '" is ready.');
}

/* ============================================
   RESUBMIT HOOK (admin calls this manually)
   Resends confirmation email for a given row
   ============================================ */

function resendFounderEmail(rowNum) {
  var ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  var row = sheet.getRange(rowNum, 1, 1, COLUMNS.length).getValues()[0];

  var p = {
    startup: row[COL.STARTUP],
    founder: row[COL.FOUNDER],
    email: row[COL.EMAIL],
    phone: row[COL.PHONE],
    category: row[COL.CATEGORY],
    stage: row[COL.STAGE],
    traction: row[COL.TRACTION],
    deck: row[COL.DECK]
  };

  var submissionId = row[COL.SID];
  sendFounderEmail(p, submissionId);
  Logger.log('Resent confirmation to ' + p.email + ' (' + submissionId + ')');
}
