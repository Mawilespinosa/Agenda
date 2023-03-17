function doGet() {
  return HtmlService.createTemplateFromFile('web').evaluate();
}

function obtenerDatosHtml(nombre) {        
    return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

function obtenerContactos() {
    let hoja = SpreadsheetApp.openById('18YVSU3POoSjmWfUIPBYArjTG2U5i1b0E1uB62uBpLho').getActiveSheet();
    let datos = hoja.getDataRange().getValues();
    return datos
}