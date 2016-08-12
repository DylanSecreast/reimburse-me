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


function getClaimBalance(who2who) {
  var sheet = SpreadsheetApp.getActiveSheet();
  return parseFloat(sheet.getRange(who2who).getValue());
}


// GET NEW EXPENSE DATA [WORKS/TODO] //
function getNewExpenseData(covered, owe_McKenna, owe_Dylan, owe_Jason, comments) {
  var sheet = SpreadsheetApp.getActiveSheet();
  if (covered == "Select") {
    return showAlert("Oops!", "Error claiming new expense: Please select \"Who covered expense?\".\n\nNo information has been saved.");
  }
  else {
    // Final success message dynamically concatenated
    var alertMsg = "Successfully claimed new expense, please see summary below.\n\n";

    // If left blank, make $0
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
    alertMsg += "Claim Total: $" + claimTotal + "\n";

    // Get existing "Claims to be Reimbursed" individual totals
    var mckenna2dylan = getClaimBalance("mckenna2dylan");
    var mckenna2jason = getClaimBalance("mckenna2jason");
    var dylan2mckenna = getClaimBalance("dylan2mckenna");
    var dylan2jason = getClaimBalance("dylan2jason");
    var jason2mckenna = getClaimBalance("jason2mckenna");
    var jason2dylan = getClaimBalance("jason2dylan");
    var difference;

    // Calculate & update new Monthly Shared Expenses individual totals on spreadsheet
    if (covered === "McKenna") {  // If McKenna covered new expense claim
      alertMsg += "Covered By: McKenna\n\n";
      if (owe_McKenna != 0) {
        return showAlert("Invalid Operation", "McKenna cannot owe what they already covered.\n\nPlease try again.");
      }
      if (owe_Dylan > 0) {  // If Dylan owes on McKenna's new expense claim
        alertMsg += "Dylan to reimburse McKenna: $" + owe_Dylan + "\n";
        alertMsg += "Dylan's existing debt to McKenna: $" + dylan2mckenna + "\n";
        alertMsg += "McKenna's existing debt to Dylan: $" + mckenna2dylan + "\n\n";
        if (mckenna2dylan < (dylan2mckenna + owe_Dylan)) {           // If Dylan owes more to McKenna than vice versa
          difference = ((dylan2mckenna + owe_Dylan) - mckenna2dylan); // Calculate difference
          updateCell("mckenna2dylan", 0);                                 // Clear mckenna2dylan debt
          updateCell("dylan2mckenna", difference);                        // Set dylan2mckenna debt to difference
        }
        else if (mckenna2dylan === (dylan2mckenna + owe_Dylan)) {         // If Dylans debt = McKenna's debt
          updateCell("mckenna2dylan", 0)                                  // Clear mckenna2dylan debt
          updateCell("dylan2mckenna", 0);                                 // Clear dylan2mckenna debt
        }
        else if (mckenna2dylan > (dylan2mckenna + owe_Dylan)) {           // If McKenna owes more to Dylan than vice versa
          difference = (mckenna2dylan - (dylan2mckenna + owe_Dylan)); // Calculate difference
          updateCell("dylan2mckenna", 0);                                 // Clear dylan2mckenna debt
          updateCell("mckenna2dylan", difference)                         // Set mckenna2dylan debt to difference
        }
        else if (dylan2mckenna === 0) {                                        // If this is Dylan's first claim to owe
          updateCell("dylan2mckenna", owe_Dylan);                           // Initialize w/ owed amount
        }
        alertMsg += "McKenna's updated debt to Dylan: $" + getClaimBalance("mckenna2dylan") + "\n";
        alertMsg += "Dylan's updated debt to McKenna: $" + getClaimBalance("dylan2mckenna") + "\n";
      }
      if (owe_Jason > 0) {  // If Jason owes on McKenna's new expense claim
        alertMsg += "Jason to reimburse McKenna: $" + owe_Jason + "\n";
        alertMsg += "Jason's existing debt to Jason: $" + jason2mckenna + "\n";
        alertMsg += "McKenna's existing debt to Jason: $" + mckenna2jason + "\n\n";
        if (mckenna2jason < (jason2mckenna + owe_Jason)) {            // If Jason owes more to McKenna than vice versa
          difference = ((jason2mckenna + owe_Jason) - mckenna2jason);  // Calculate difference
          updateCell("mckenna2jason", 0);                                  // Clear mckenna2jason debt
          updateCell("jason2mckenna", difference);                         // Set jason2mckenna debt to difference
        }
        else if (mckenna2jason === (jason2mckenna + owe_Jason)) {          // If Jason's debt = McKenna's debt
          updateCell("mckenna2jason", 0);                                  // Clear mckenna2jason debt
          updateCell("jason2mckenna", 0);                                  // Clear jason2mckenna debt
        }
        else if (mckenna2jason > (jason2mckenna + owe_Jason)) {            // If McKenna owes more to Jason than vice versa
          difference = (mckenna2jason - (jason2mckenna + owe_Jason));  // Calculate difference
          updateCell("jason2mckenna", 0);                                  // Clear jason2mckenna debt
          updateCell("mckenna2jason", difference);                         // Set mckenna2jason debt to difference
        }
        else if (jason2mckenna === 0) {
          updateCell("jason2mckenna", owe_Jason);
        }
        alertMsg += "McKenna's updated debt to Jason: $" + getClaimBalance("mckenna2jason") + "\n";
        alertMsg += "Jason's updated debt to McKenna: $" + getClaimBalance("jason2mckenna") + "\n";
      }
    }

    else if (covered === "Dylan") {  // If Dylan covered new expense claim
      alertMsg += "Covered By: Dylan\n\n";
      if (owe_Dylan != 0) {
        return showAlert("Invalid Operation", "Dylan cannot owe what they already covered.\n\nPlease try again.");
      }
      if (owe_McKenna > 0) {  // If McKenna owes on Dylan's new expense claim
        alertMsg += "McKenna to reimburse Dylan: $" + owe_McKenna + "\n";
        alertMsg += "McKenna's existing debt to Dylan: $" + dylan2mckenna + "\n";
        alertMsg += "Dylans's existing debt to McKenna: $" + mckenna2dylan + "\n\n";
        if (dylan2mckenna < (mckenna2dylan + owe_McKenna)) {
          difference = ((mckenna2dylan + owe_McKenna) - dylan2mckenna);
          updateCell("dylan2mckenna", 0);
          updateCell("mckenna2dylan", difference);
        }
        else if (dylan2mckenna === (mckenna2dylan + owe_McKenna)) {
          updateCell("dylan2mckenna", 0);
          updateCell("mckenna2dylan", 0);
        }
        else if (dylan2mckenna > (mckenna2dylan + owe_McKenna)) {
          difference = (mckenna2dylan - (mckenna2dylan + owe_McKenna));
          updateCell("mckenna2dylan", 0);
          updateCell("dylan2mckenna", difference);
        }
        else if (mckenna2dylan === 0) {
          updateCell("mckenna2dylan", owe_McKenna);
        }
        alertMsg += "McKenna's updated debt to Dylan: $" + getClaimBalance("mckenna2dylan") + "\n";
        alertMsg += "Dylan's updated debt to McKenna: $" + getClaimBalance("dylan2mckenna") + "\n";
      }
      if (owe_Jason > 0) {  // If Jason owes on Dylan's new expense claim
        alertMsg += "Jason to reimburse Dylan: $" + owe_Jason + "\n";
        alertMsg += "Jason's existing debt to Dylan: $" + jason2dylan + "\n";
        alertMsg += "Dylan's existing debt to Jason: $" + dylan2jason + "\n\n";
        if (dylan2jason < (jason2dylan + owe_Jason)) {
          difference = ((jason2dylan + owe_Jason) - dylan2jason);
          updateCell("dylan2jason", 0);
          updateCell("jason2dylan", difference);
        }
        else if (dylan2jason === (jason2dylan + owe_Jason)) {
          updateCell("dylan2jason", 0);
          updateCell("jason2dylan", 0);
        }
        else if (dylan2jason > (jason2dylan + owe_Jason)) {
          difference = (dylan2jason - (jason2dylan + owe_Jason));
          updateCell("jason2dylan", 0);
          updateCell("dylan2jason", difference);
        }
        else if (jason2dylan === 0) {
          updateCell("jason2dylan", owe_Jason);
        }
        alertMsg += "Jason's updated debt to Dylan: $" + getClaimBalance("jason2dylan") + "\n";
        alertMsg += "Dylan's updated debt to Jason: $" + getClaimBalance("dylan2jason") + "\n";
      }
    }

    else if (covered === "Jason") {  // If Jason covered new expense claim
      alertMsg += "Covered By: Jason\n\n";
      if (owe_Jason != 0) {
        return showAlert("Invalid Operation", "Jason cannot owe what they already covered.\n\nPlease try again.");
      }
      if (owe_McKenna > 0) {  // If McKenna owes on Jason's new expense claim
        if (jason2mckenna < (mckenna2jason + owe_McKenna)) {
          difference = ((mckenna2jason + owe_Mckenna) - jason2mckenna);
          updateCell("jason2mckenna", 0);
          updateCell("mckenna2jason", difference);
        }
        else if (jason2mckenna === (mckenna2jason + owe_Mckenna)) {
          updateCell("jason2mckenna", 0);
          updateCell("mckenna2jason", 0);
        }
        else if (jason2mckenna > (mckenna2jason + owe_Mckenna)) {
          difference = (mckenna2jason - (mckenna2jason + owe_Mckenna));
          updateCell("mckenna2jason", 0);
          updateCell("jason2mckenna", difference);
        }
        else if (mckenna2jason === 0) {
          updateCell("mckenna2jason", owe_McKenna);
        }
      }
      if (owe_Dylan > 0) {  // If Dylan owes on Jason's new expense claim
        if (jason2dylan < (dylan2jason + owe_Dylan)) {
          difference = ((dylan2jason + owe_Dylan) - jason2dylan);
          updateCell("jason2dylan", 0);
          updateCell("dylan2jason", difference);
        }
        else if (jason2dylan === (dylan2jason + owe_Dylan)) {
          updateCell("jason2dylan", 0);
          updateCell("dylan2jason", 0);
        }
        else if (jason2dylan > (dylan2jason + owe_Dylan)) {
          difference = (dylan2jason - (dylan2jason + owe_Dylan));
          updateCell("dylan2jason", 0);
          updateCell("jason2dylan", difference);
        }
        else if (dylan2jason === 0) {
          updateCell("dylan2jason", owe_Dylan);
        }
      }
    }

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
    alertMsg += "\nThe \"Claims to be Reimbursed\" and \"Reimbursement Claim Log\" have been udpated with the reflected information above.";
    return showAlert("Success!", alertMsg);
  }
  return;
}  // end getNewExpenseData()
