// INIT SIDEBAR //
function initSidebar() {
  var ui_Sidebar = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('ReimburseMe').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  return SpreadsheetApp.getUi().showSidebar(ui_Sidebar);
}

// INIT MENUBAR //
function initMenubar() {
  var ui_Menubar = SpreadsheetApp.getUi();
  ui_Menubar.createMenu('ReimburseMe')
    .addSubMenu(ui_Menubar.createMenu('View')
      .addItem('Show Sidebar', 'showSidebar')
      .addItem('Hide Sidebar', 'hideSidebar'))
    .addSubMenu(ui_Menubar.createMenu('Clear')
      .addItem('Monthly Shared Expenses', 'clearSharedExpenses')
      .addItem('Claims to be Reimbursed', 'clearClaimBalances')
      .addItem('Reimbursement Claim Log', 'clearLog'))
    .addSubMenu(ui_Menubar.createMenu('Backup')
      .addItem('Monthly Shared Expenses', 'backupSharedExpenses')
      .addItem('Claims to be Reimbursed', 'backupClaimBalances')
      .addItem('Reimbursement Claim Log', 'backupLog')
      .addItem('All', 'backupAll'))
    .addItem('Credits', 'showCredits')
    .addSeparator()
    .addItem('Help', 'helpMe')
    .addToUi();
  return;
}

// INIT APP //
function initApp(e) {
  initSidebar();
  initMenubar();
  return;
}

// ON OPEN //
function onOpen(e) {
  return initApp(e);
}

// ON INSTALL //
function onInstall(e) {
  return initApp(e);
}

// SHOW SIDEBAR //
function showSidebar() {
  var ui_Sidebar = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('ReimburseMe').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  return SpreadsheetApp.getUi().showSidebar(ui_Sidebar);
}

// HIDE SIDEBAR //
function hideSidebar() {
  // TODO: fix
  //  return google.script.host.close();
  return showAlert("I can't!", "Error: Functionality not currently available.");
}

// SHOW CREDITS //
function showCredits() {
  return showAlert("Brought to you by...", "ReimburseMe © Dylan Secreast 2016.\n\nContact: dsecreast@gmail.com");
}

// HELP ME //
function helpMe() {
  // TODO: fix
  return showAlert("I need an Adult!", "Lul you're fucked. This shit is so broken ATM.");
}

// SHOW ALERT //
function showAlert(title, prompt) {
  var ui = SpreadsheetApp.getUi();
  ui.alert(title, prompt, ui.ButtonSet.OK)
}

// UPDATE CELL //
function updateCell(target, value) {
  var sheet = SpreadsheetApp.getActiveSheet();
  return sheet.getRange(target).setValue(value);
}

// CLEAR SHARED EXPENSES //
function clearSharedExpenses() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange('comcastTotal').setValue(0);
  sheet.getRange('ewebTotal').setValue(0);
  return;
}

// CLEAR CLAIM BALANCES //
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

// CLEAR LOG //
function clearLog() {
  var sheet = SpreadsheetApp.getActiveSheet();
  return sheet.getRange('claimLog').clearContent();
}

// CLEAR SIDEBAR //
function clearSidebar() {
  // TODO: fix
//  document.getElementById("select_covered").value = "Select";
//  document.getElementById("owe_McKenna").value = '';
//  document.getElementById("owe_Dylan").value = '';
//  document.getElementById("owe_Jason").value = '';
//  document.getElementById("comments").value = '';
  return;
}

// GET CURRENT TIME //
function getCurrentTime() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd < 10){
    dd = '0' + dd;
  }
  if(mm < 10){
    mm = '0' + mm;
  }
  return mm + '/' + dd + '/' + yyyy;
}

// GET FIRST EMPTY ROW //
function getFirstEmptyRow() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var offSet = 36;
  var maxOffSet = 54;

  var column = sheet.getRange('coveredBy');
  var values = column.getValues(); // get all log data in one call

  var ct = 0;
  while ( values[ct] && values[ct][0] != "" ) { // While next cell isn't empty...
    if ((ct + offSet) >= maxOffSet) {           // If no room in log
      showAlert("Whoa!", "OMG the Reimbursement Claim Log is full!\n\nHere, I'll clear it for you."); // TODO: auto-backup before clearing
      clearLog();                               // clear log
      return offSet;                            // and insert in first log cell
    } else {
      ct++;                                     // else, try next cell
    }
  }

  return (ct + offSet);
}


// INIT BACKUP //
function initBackup() {
  var doesFolderExist = false;
  if (DriveApp.getFoldersByName("ReimburseMe").hasNext()) {
    doesFolderExist = true;
  }
  if (!doesFolderExist) {
    return DriveApp.createFolder("ReimburseMe");
  }
  return;
}

// BACKUP SHARED EXPENSES //
function backupSharedExpenses() { // TODO: fix
  initBackup();
  // TODO: fix
  return showAlert("Success!", "Successfully backed up \"Monthly Shared Expenses\" to your Google Drive/ReimburseMe/ folder.");
}

// BACKUP CLAIM BALANCES //
function backupClaimBalances() {
  // TODO: fix
  initBackup();
  return showAlert("I can't!", "Error: Functionality not currently available.");
}

// BACKUP LOG //
function backupLog() {
  // TODO: fix
  initBackup();
  return showAlert("I can't!", "Error: Functionality not currently available.");
}

// BACKUP ALL //
function backupAll() {
  // TODO: fix
  initBackup();
  return showAlert("I can't!", "Error: Functionality not currently available.");
}

// GET CLAIM LOG COUNT //
function getClaimLogCount() {
  return (getFirstEmptyRow() - 36);
}

// DELETE All PROTECTED RANGES //
function deleteAllProtectedRanges() {  // Will delete ALL protected ranges, regardless of existing permissions
  var sheet = SpreadsheetApp.getActiveSheet();
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  for (var j = 0, jLen = protections.length; j < jLen; j++) {
    protections[j].remove();
  }
  return;
}

// GET NEW EXPENSE DATA //
function getNewExpenseData(covered, owe_McKenna, owe_Dylan, owe_Jason, comments) {
  var sheet = SpreadsheetApp.getActiveSheet();
  if (covered == "Select") {
    showAlert("Oops!", "Error claiming new expense: Please select \"Who covered expense?\".\n\nNo information has been saved.");
    return clearSidebar();
  } else {
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

    // Verify valid user input data & set new "Claims to be Reimbursed" individual totals
    if (covered === "McKenna") {
      if (owe_McKenna != parseFloat(0)) {
        showAlert("Wut?!", "Why would McKenna pay themselves back...?\n\nTry again.");
        return clearSidebar();
      } else {
        alertMsg += "Dylan Owes: $" + owe_Dylan + "\nJason Owes: $" + owe_Jason + "\n\nClaim Total: $" + claimTotal;
        if (owe_Dylan > 0) {
          sheet.getRange('dylan2mckenna').setValue(dylan2mckenna += owe_Dylan);
        }
        if (owe_Jason >0) {
          sheet.getRange('jason2mckenna').setValue(jason2mckenna += owe_Jason);
        }
      }
    } else if (covered === "Dylan") {
      if (owe_Dylan != parseFloat(0)) {
        showAlert("Wut?!", "Why would Dylan pay themselves back...?\n\nTry again.");
        return clearSidebar();
      } else {
        alertMsg += "McKenna Owes: $" + owe_McKenna + "\nJason Owes: $" + owe_Jason + "\n\nClaim Total: $" + claimTotal;
        if (owe_McKenna > 0) {
          sheet.getRange('mckenna2dylan').setValue(mckenna2dylan += owe_McKenna);
        }
        if (owe_Jason >0) {
          sheet.getRange('jason2dylan').setValue(jason2dylan += owe_Jason);
        }
      }
    } else if (covered === "Jason") {
      if (owe_Jason != parseFloat(0)) {
        showAlert("Wut?!", "Why would Jason pay themselves back...?\n\nTry again.");
        return clearSidebar();
      } else {
        alertMsg += "McKenna Owes: $" + owe_McKenna + "\nDylan Owes: $" + owe_Dylan + "\n\nClaim Total: $" + claimTotal;
        if (owe_McKenna > 0) {
          sheet.getRange('mckenna2jason').setValue(mckenna2jason += owe_McKenna);
        }
        if (owe_Dylan >0) {
          sheet.getRange('dylan2jason').setValue(dylan2jason += owe_Dylan);
        }
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
    clearSidebar();
    return showAlert("Success!", alertMsg);
  }
  return;
}  // end getNewExpenseData()
