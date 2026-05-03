/**
 * Devyn & Jace — RSVP Google Apps Script
 *
 * SETUP INSTRUCTIONS:
 *  1. Open your Google Sheet
 *  2. Click Extensions → Apps Script
 *  3. Delete any existing code and paste this entire file
 *  4. Click Save (floppy disk icon)
 *  5. Click "Deploy" → "New deployment"
 *  6. Click the gear icon next to "Type" and select "Web app"
 *  7. Set "Execute as" → Me
 *  8. Set "Who has access" → Anyone
 *  9. Click Deploy → copy the Web app URL
 * 10. Paste that URL into RSVP.tsx where it says PASTE_YOUR_URL_HERE
 *
 * SHEET STRUCTURE:
 *  - Sheet named "Guests"  → Column A: guest names (row 1 = header "Name")
 *  - Sheet named "RSVPs"   → auto-created headers on first submission
 */

// Returns the guest list to the RSVP form dropdown
function doGet() {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName('Guests');

  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return ContentService
      .createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const names = sheet
    .getRange('A2:A' + lastRow)
    .getValues()
    .flat()
    .filter(name => name !== '');

  return ContentService
    .createTextOutput(JSON.stringify(names))
    .setMimeType(ContentService.MimeType.JSON);
}

// Receives RSVP form submissions and writes them to the RSVPs sheet
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    let sheet = ss.getSheetByName('RSVPs');

    // Create the sheet + headers if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet('RSVPs');
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Attending',
        'Number of Guests',
        'Meal Preference',
        'Dietary Restrictions',
        'Song Request',
        'Note',
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      data.name       || '',
      data.email      || '',
      data.attending  === 'yes' ? 'Attending' : 'Not Attending',
      data.guests     || '',
      data.meal       || '',
      data.dietary    || '',
      data.song       || '',
      data.note       || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
