// INIT SIDEBAR [WORKS/DONE] //
function initSidebar() {
  var ui_Sidebar = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('ReimburseMe').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  return SpreadsheetApp.getUi().showSidebar(ui_Sidebar);
}

// INIT MENUBAR [WORKS/DONE] //
function initMenubar() {
  var ui_Menubar = SpreadsheetApp.getUi();
  ui_Menubar.createMenu('ReimburseMe')
    .addSubMenu(ui_Menubar.createMenu('View')
    .addItem('Show Sidebar', 'showSidebar')
    .addItem('Hide Sidebar', 'hideSidebar'))
    .addSubMenu(ui_Menubar.createMenu('Clear')
    .addItem('Monthly Shared Expenses', 'clearSharedExpenses')
    .addItem('Claims to be Reimbursed', 'clearClaimBalances')
    .addItem('Reimbursement Claim Log', 'clearLog')
    .addItem('All', 'clearAll'))
    .addItem('Backup', 'backupAll')
    .addItem('Credits', 'showCredits')
    .addSeparator()
    .addItem('Help', 'helpMe')
    .addToUi();
  return;
}

// INIT APP [WORKS/DONE] //
function initApp(e) {
  initSidebar();
  initMenubar();
return;
}

// ON OPEN [WORKS/DONE] //
function onOpen(e) {
  return initApp(e);
}

// ON INSTALL [WORKS/DONE] //
function onInstall(e) {
  return initApp(e);
}

// SHOW SIDEBAR [WORKS/DONE] //
function showSidebar() {
  var ui_Sidebar = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('ReimburseMe').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  return SpreadsheetApp.getUi().showSidebar(ui_Sidebar);
}

// HIDE SIDEBAR [BROKEN/TODO] //
function hideSidebar() {
  // TODO: fix
  //  return google.script.host.close();
  return showAlert("I can't!", "Error: Functionality not currently available.");
}

// SHOW CREDITS [WORKS/DONE] //
function showCredits() {
  return showAlert("Brought to you by...", "ReimburseMe © Dylan Secreast 2016.\n\nContact: dsecreast@gmail.com");
}

// HELP ME [WORKS/TODO] //
function helpMe() {
  // TODO: fix
  return showAlert("I need an Adult!", "Lul you're fucked. This shit is so broken ATM.");
}

// SHOW ALERT [WORKS/DONE] //
function showAlert(title, prompt) {
  var ui = SpreadsheetApp.getUi();
  ui.alert(title, prompt, ui.ButtonSet.OK)
}

// UPDATE CELL [WORKS/DONE] //
function updateCell(target, value) {
  var sheet = SpreadsheetApp.getActiveSheet();
  return sheet.getRange(target).setValue(value);
}

// CLEAR SHARED EXPENSES [WORKS/DONE] //
function clearSharedExpenses() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange('comcastTotal').setValue(0);
  sheet.getRange('ewebTotal').setValue(0);
  return;
}

// CLEAR CLAIM BALANCES [WORKS/DONE] //
function clearClaimBalances() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange("mckenna2dylan").setValue(0);
  sheet.getRange("mckenna2jason").setValue(0);
  sheet.getRange("dylan2mckenna").setValue(0);
  sheet.getRange("dylan2jason").setValue(0);
  sheet.getRange("jason2mckenna").setValue(0);
  sheet.getRange("jason2dylan").setValue(0);
  return;
}

// CLEAR LOG [WORKS/DONE] //
function clearLog() {
  var sheet = SpreadsheetApp.getActiveSheet();
  return sheet.getRange('claimLog').clearContent();
}

// CLEAR SIDEBAR [BROKEN/NOT_USED] //
function clearSidebar() {
  // TODO: fix
  //  document.getElementById("select_covered").value = "Select";
  //  document.getElementById("owe_McKenna").value = '';
  //  document.getElementById("owe_Dylan").value = '';
  //  document.getElementById("owe_Jason").value = '';
  //  document.getElementById("comments").value = '';
  return showAlert("I can't!", "Unable to execute clearSidebar() - functionality currently unavailable.");
}

// CLEAR ALL [WORKS/DONE] //
function clearAll() {
  clearSharedExpenses();
  clearClaimBalances();
  clearLog();
  return;
}

// GET CURRENT TIME [WORKS/DONE] //
function getCurrentTime() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1; // January = 0
  var year = today.getFullYear();
  //  if(dd < 10){
  //    dd = '0' + dd;
  //  }
  //  if(mm < 10){
  //    mm = '0' + mm;
  //  }
  return month + '/' + day + '/' + year;
}

// GET FIRST EMPTY ROW [WORKS/DONE] //
function getFirstEmptyRow() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var offSet = 36;
  var maxOffSet = 54;
  var column = sheet.getRange('coveredBy');
  var values = column.getValues(); // get all log data in one call
  var ct = 0;
  while ( values[ct] && values[ct][0] != "" ) { // While next cell isn't empty...
    if ((ct + offSet) >= maxOffSet) {           // If no room in log
      // TODO: auto-backup before clearing
      clearLog();                               // clear log
      return offSet;                            // and insert in first log cell
    }
    else {
      ct++;                                     // else, try next cell
    }
  }
  return (ct + offSet);
}

// INIT BACKUP [WORKS/DONE] //
function initBackup() {
  var reimburseMeFolder;
  if (DriveApp.getFoldersByName("ReimburseMe").hasNext()) {               // If ReimburseMe root dir exists...
    reimburseMeFolder = DriveApp.getFoldersByName("ReimburseMe").next();  // Get it
  }
  else {                                                                // Else, it doesn't exist...
    reimburseMeFolder = DriveApp.createFolder("ReimburseMe");             // Create it
  }
  return reimburseMeFolder;
}

// CREATE FILE IN FOLDER [BROKEN/NOT_USED] //
function createFileInFolder(filename, payload) {
  var reimburseMeFolder = initBackup();  // Get ReimburseMe folder from Drive root
  //  return SpreadsheetApp.create(filename, payload, MimeType.GOOGLE_SHEETS);  // .createFile('My File.txt', 'Lorem ipsum', MimeType.PLAIN_TEXT);
  return showAlert("I can't!", "Error: Functionality not currently available.");
}

// BACKUP SHARED EXPENSES [BROKEN/NOT_USED] //
function backupSharedExpenses() { // TODO: fix
  var reimburseMeFolder = initBackup();  // Get ReimburseMe folder from Drive root
  // TODO: fix
  return showAlert("I can't!", "Error: Functionality not currently available.");
}

// BACKUP CLAIM BALANCES [BROKEN/NOT_USED] //
function backupClaimBalances() {
  var reimburseMeFolder = initBackup();  // Get ReimburseMe folder from Drive root
  // TODO: fix
  return showAlert("I can't!", "Error: Functionality not currently available.");
}

// BACKUP LOG [BROKEN/NOT_USED] //
function backupLog() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var reimburseMeFolder = initBackup();  // Get ReimburseMe folder from Drive root
  var payload = sheet.getRange('reimbursementClaimLog').getValues();
  //  createFileInFolder("Reimbursement Claim Log - Backup.gs", payload);  // TODO: fix, can't open via google drive
  //  return showAlert("Success!", "Successfully backed up \"Reimbursement Claim Log\". Please check your: GoogleDrive/ReimburseMe/Reimbursement Claim Log - Backup");
  return showAlert("I can't!", "Error: Functionality not currently available.");
}

// BACKUP ALL [WORKS/TODO] //
function backupAll() {
  initBackup();
  var spreadsheetFileName = "The Bailey #O167 Claims and Shared Expenses";
  var reimburseMeFolder = initBackup();  // Get ReimburseMe folder from Drive root
  var clone = DriveApp.getFilesByName(spreadsheetFileName).next();  // Get Google Drive copy of spreadsheet
  if (DriveApp.getFilesByName(spreadsheetFileName + '.pdf').hasNext()) {                // If a backup already exists...
    var existingBackup = DriveApp.getFilesByName(spreadsheetFileName + '.pdf').next();  // Get it
    DriveApp.removeFile(existingBackup);                                                // And delete it
  }
  DriveApp.createFile(clone);  // TODO: make doc save in ReimburseMe folder instead of root
  return showAlert("Success!", "Successfully backed up whole \"Shared Monthly Expenses\" spreadsheet. Please check your root Google Drive folder for: ~/ReimburseMe/ReimburseMe - Master Backup.pdf for a PDF document.");
}

// GET CLAIM LOG COUNT [WORKS/DONE] //
function getClaimLogCount() {
  return (getFirstEmptyRow() - 36);
}

// DELETE All PROTECTED RANGES [WORKS/DONE] //
function deleteAllProtectedRanges() {  // Will delete ALL protected ranges, regardless of existing permissions
  var sheet = SpreadsheetApp.getActiveSheet();
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  for (var j = 0, jLen = protections.length; j < jLen; j++) {
    protections[j].remove();
  }
  return;
}

// GET NEW EXPENSE DATA [WORKS/TODO] //
function getNewExpenseData(covered, owe_McKenna, owe_Dylan, owe_Jason, comments) {
  var sheet = SpreadsheetApp.getActiveSheet();
  if (covered == "Select") {
    return showAlert("Oops!", "Error claiming new expense: Please select \"Who covered expense?\".\n\nNo information has been saved.");
  }
  else {
    var alertMsg = "Successfully claimed new expense, please see summary below.\n\n\nCovered by: " + covered + "\n\n";
    // If left blank, make $0.00
    if (owe_McKenna === '') {
      owe_McKenna = 0;
    }
    if (owe_Dylan === '') {
      owe_Dylan = 0;
    }
    if (owe_Jason === '') {
      owe_Jason = 0;
    }

    // Sanitize $XX.XX user input
    owe_McKenna = parseFloat(owe_McKenna);
    owe_Dylan = parseFloat(owe_Dylan);
    owe_Jason = parseFloat(owe_Jason);

    // Calculate claim total
    var claimTotal = (owe_McKenna + owe_Dylan + owe_Jason);

    // Get existing "Claims to be Reimbursed" individual totals
    var mckenna2dylan = sheet.getRange("mckenna2dylan").getValue();
    var mckenna2jason = sheet.getRange("mckenna2jason").getValue();
    var dylan2mckenna = sheet.getRange("dylan2mckenna").getValue();
    var dylan2jason = sheet.getRange("dylan2jason").getValue();
    var jason2mckenna = sheet.getRange("jason2mckenna").getValue();
    var jason2dylan = sheet.getRange("jason2dylan").getValue();

    // Calculate new Monthly Shared Expenses individual totals
    if (covered === "McKenna") {  // If McKenna covered new expense claim
      if (owe_McKenna != 0) {
        return showAlert("Wut?!", "Why would McKenna pay themselves back...?\n\nTry again.");
      }
      if (owe_Dylan > 0) {  // If Dylan owes on new expense claim
        if (mckenna2dylan < (dylan2mckenna + owe_Dylan)) {                 // If Dylan owes more to McKenna than vice versa
          var difference = ((dylan2mckenna + owe_Dylan) - mckenna2dylan);  // Calculate difference
          sheet.getRange('mckenna2dylan').setValue(0);                     // Clear mckenna2dylan debt
          sheet.getRange('dylan2mckenna').setValue(difference);            // Set dylan2mckenna debt to difference
        }
        else if (mckenna2dylan === (dylan2mckenna + owe_Dylan)) {           // If Dylans debt = McKenna's debt
        sheet.getRange('mckenna2dylan').setValue(0);                      // Clear mckenna2dylan debt
        sheet.getRange('dylan2mckenna').setValue(0);                      // Clear dylan2mckenna debt
      }
      else if (mckenna2dylan > (dylan2mckenna + owe_Dylan)) {             // If McKenna owes more to Dylan than vice versa
        var difference = (mckenna2dylan - (dylan2mckenna + owe_Dylan));   // Calculate difference
        sheet.getRange('dylan2mckenna').setValue(0);                      // Clear dylan2mckenna debt
        sheet.getRange('mckenna2dylan').setValue(difference);             // Set mckenna2dylan debt to difference
      }
      }
      if (owe_Jason > 0) {  // If Jason owes on new expense claim
        if (mckenna2jason < (jason2mckenna + owe_Jason)) {                 // If Jason owes more to McKenna than vice versa
          var difference = ((jason2mckenna + owe_Jason) - mckenna2jason);  // Calculate difference
          sheet.getRange('mckenna2jason').setValue(0);                     // Clear mckenna2jason debt
          sheet.getRange('jason2mckenna').setValue(difference);            // Set jason2mckenna debt to difference
        }
        else if (mckenna2jason === (jason2mckenna + owe_Jason)) {          // If Jason's debt = McKenna's debt
        sheet.getRange('mckenna2jason').setValue(0);                      // Clear mckenna2jason debt
        sheet.getRange('jason2mckenna').setValue(0);                      // Clear jason2mckenna debt
        }
        else if (mckenna2jason > (jason2mckenna + owe_Jason)) {             // If McKenna owes more to Jason than vice versa
          var difference = (mckenna2jason - (jason2mckenna + owe_Jason));   // Calculate difference
          sheet.getRange('jason2mckenna').setValue(0);                      // Clear jason2mckenna debt
          sheet.getRange('mckenna2jason').setValue(difference);             // Set mckenna2jason debt to difference
        }
      }
    }
    else if (covered === "Dylan") {
      if (owe_Dylan != 0) {
        return showAlert("Wut?!", "Why would Dylan pay themselves back...?\n\nTry again.");
      }
    }
    else if (covered === "Jason") {
      if (owe_Jason != 0) {
        return showAlert("Wut?!", "Why would Jason pay themselves back...?\n\nTry again.");
      }
    }

    // Update "Claims to be Reimbursed" on spreadsheet
    // TODO: fix

    // Update "Reimbursement Claim Log" on spreadsheet
    var nextAvailRow = getFirstEmptyRow();
    var currentTime = getCurrentTime();           // Columns:
    updateCell('B' + nextAvailRow, currentTime);  // Submitted
    updateCell('C' + nextAvailRow, covered);      // Covered By
    updateCell('D' + nextAvailRow, owe_McKenna);  // McKenna Owe
    updateCell('E' + nextAvailRow, owe_Dylan);    // Dylan Owe
    updateCell('F' + nextAvailRow, owe_Jason);    // Jason Owe
    updateCell('G' + nextAvailRow, claimTotal);   // Total
    updateCell('H' + nextAvailRow, comments);     // Comments

    // Clean up and done!
    alertMsg += "\n\n\nThe \"Claims to be Reimbursed\" and \"Reimbursement Claim Log\" have been udpated with the reflected information.";
    return showAlert("Success!", alertMsg);
  }
  return;
}  // end getNewExpenseData()
