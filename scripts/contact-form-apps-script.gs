/**
 * Promogranade — Contact Form handler (Google Apps Script Web App)
 *
 * What it does on every submission from components/home/ContactForm.tsx:
 *   1. Appends a row (timestamp, name, email, phone, message) to a sheet
 *      called "Contact Submissions" in this Apps Script's bound spreadsheet.
 *   2. Emails hello@promogranade.com with the submission, reply-to set to
 *      the submitter so you can hit "Reply" directly.
 *
 * ─── Setup (one-time) ──────────────────────────────────────────────
 * 1. Go to sheets.google.com and create a new, blank spreadsheet — name it
 *    whatever you like (e.g. "Promogranade — Leads"). This is where
 *    submissions will land.
 * 2. In that spreadsheet: Extensions → Apps Script.
 * 3. Delete any boilerplate code in the editor and paste this entire file.
 * 4. Click Deploy → New deployment.
 *      - Click the gear icon next to "Select type" → choose "Web app".
 *      - Description: "Contact form handler" (anything you like).
 *      - Execute as: Me.
 *      - Who has access: Anyone.
 *    Click Deploy. Google will ask you to authorize the script — approve it
 *    (click "Advanced" → "Go to [project name] (unsafe)" if Google shows an
 *    unverified-app warning; this is expected for your own private script).
 * 5. Copy the "Web app URL" it gives you (ends in /exec).
 * 6. Paste that URL as FORM_ENDPOINT in components/home/ContactForm.tsx.
 *
 * If you ever edit this script after deploying, use Deploy → Manage
 * deployments → ✏️ → New version, otherwise the live URL keeps running the
 * old code.
 * ────────────────────────────────────────────────────────────────────
 */

var SHEET_NAME = "Contact Submissions";
var NOTIFY_EMAIL = "hello@promogranade.com";

function doPost(e) {
  try {
    var data = (e && e.parameter) || {};
    var name = data.Name || data.name || "";
    var email = data.Email || data.email || "";
    var phone = data.Phone || data.phone || "Not provided";
    var message = data.Message || data.message || "";
    var timestamp = new Date();

    appendToSheet(timestamp, name, email, phone, message);
    sendNotificationEmail(name, email, phone, message);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function appendToSheet(timestamp, name, email, phone, message) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Message"]);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([timestamp, name, email, phone, message]);
}

function sendNotificationEmail(name, email, phone, message) {
  var subject = "New project enquiry — " + (name || "Unknown");
  var body =
    "New contact form submission from promogranade.com\n\n" +
    "Name: " + name + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n\n" +
    "Message:\n" + message;

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: subject,
    body: body,
  });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
