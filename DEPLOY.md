# Phase 1 Deployment Guide — Google Apps Script + Google Sheets

This guide walks you through deploying the Magelang AI Expo 2026 submission backend.

---

## Step 1: Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it: **Magelang AI Expo 2026 — Submissions**
3. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
4. Keep this ID — you need it in Step 3

---

## Step 2: Create the Apps Script Project

1. Open your new spreadsheet
2. Click **Extensions → Apps Script**
3. Delete any default code in the script editor
4. Paste the entire contents of `gas/submissions.gs` into the editor
5. Save the project (Ctrl+S)

---

## Step 3: Configure the Script

In the script editor, find the `CONFIG` object at the top of the file and update:

```javascript
const CONFIG = {
  SPREADSHEET_ID: 'PASTE_YOUR_SPREADSHEET_ID_HERE',  // ← from Step 1
  ORGANIZER_EMAILS: ['partnership@sorcery.id'],       // ← add organizer emails
  // ... rest stays the same
};
```

**Important:** Add all organizer emails who should receive notifications.

---

## Step 4: Initialize the Sheet

1. In the Apps Script editor, select the function dropdown at the top
2. Choose **`setupSheet`** (not the default `doPost`)
3. Click the **▶ Run** button
4. On first run, Google will ask for permissions:
   - **Allow** access to your Google Sheets
   - **Allow** permission to send emails
5. After it runs, check your spreadsheet — you should see the header row with columns and a dropdown validation on the Status column

---

## Step 5: Deploy as Web App

1. In the Apps Script editor, click **Deploy → New deployment**
2. Click the gear icon next to "Select type" → choose **Web app**
3. Configure:
   - **Description:** `Magelang AI Expo Submissions`
   - **Execute as:** `Me` (your Google account)
   - **Who has access:** `Anyone` (required for cross-origin form submissions)
4. Click **Deploy**
5. Copy the **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/SCRIPT_ID/exec
   ```
6. Keep this URL — you need it in Step 6

**Important:** If you edit the script later, you must create a **new deployment** (not just save). The URL changes with each new deployment.

---

## Step 6: Connect the Frontend

1. Open `js/sections/form.js`
2. Find this line at the top:
   ```javascript
   window.SorceryApp.GAS_ENDPOINT = 'PASTE_YOUR_GAS_WEB_APP_URL_HERE';
   ```
3. Replace with your Web app URL from Step 5:
   ```javascript
   window.SorceryApp.GAS_ENDPOINT = 'https://script.google.com/macros/s/SCRIPT_ID/exec';
   ```
4. Save the file

---

## Step 7: Test the Integration

1. Run your local dev server: `npm run dev`
2. Open the site in your browser
3. Fill out the registration form with test data
4. Submit the form
5. Verify:
   - ✅ Form shows success message
   - ✅ New row appears in the Google Sheet
   - ✅ Confirmation email arrives in the test email inbox
   - ✅ Organizer notification email arrives
6. Test duplicate: submit again with the same email within 24 hours
   - ✅ Should show duplicate error on the email field

---

## Step 8: Deploy to Vercel

1. Commit your changes (with the GAS URL in form.js)
2. Push to your Git repository
3. Vercel will auto-deploy

The Vercel deployment is now **static only** — no serverless functions needed.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `405 Method Not Allowed` | Make sure you deployed as Web app with "Anyone" access |
| CORS error in browser console | Make sure `Content-Type` is `text/plain` (not `application/json`) in the fetch call |
| Email not received | Check spam folder. Verify MailApp permission was granted in Step 4. |
| Sheet not updating | Verify SPREADSHEET_ID is correct. Check Apps Script execution logs (Executions tab). |
| `UrlFetch` error | Not applicable — this script doesn't make outbound HTTP calls. |
| Redeploy needed after edit | Always create a New Deployment after editing the script. The /exec URL changes. |

---

## Admin Workflow

### Reviewing Applications

1. Open the Google Sheet
2. Filter by **Status = Baru** to see new submissions
3. Review each submission:
   - Check the demo/deck link
   - Evaluate product readiness
   - Read the progress/use case description
4. Update **Status** column using the dropdown:
   - `Baru` — New submission (default)
   - `Ditinjau` — Under review
   - `Dihubungi` — Founder has been contacted
   - `Diterima` — Accepted for showcase
   - `Ditolak` — Not selected
   - `Briefing` — Scheduled for pre-event briefing
   - `Expo Day` — Confirmed participant
5. Add notes in the **Catatan Admin** column

### Resending Confirmation Email

If a founder didn't receive the confirmation email:

1. Open the Apps Script editor
2. Select the function **`resendFounderEmail`**
3. Run it with the row number as parameter (e.g., row 5 = `resendFounderEmail(5)`)
4. Check execution logs for confirmation

---

## Security Notes

- The GAS web app is publicly accessible (required for cross-origin form POST)
- Server-side validation runs on every submission
- Duplicate email submissions within 24 hours are blocked
- Payload size is limited to 32KB
- HTML is stripped from all input fields via `trim()` + HTML escaping in emails
- No sensitive data is stored beyond what the form collects
- The Google Sheet is private — only accessible to people you share it with
- MailApp sends emails from your Google account (not from a custom domain)
