const HOJA = SpreadsheetApp.openById('18YVSU3POoSjmWfUIPBYArjTG2U5i1b0E1uB62uBpLho').getActiveSheet();

function doGet() {
  return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda de Contactos');
}

function obtenerDatosHtml(nombre) {        
    return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

function obtenerContactos() {    
    return HOJA.getDataRange().getValues();    
}

function doPost() {  
  return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda de Contactos');
}
function insertarContacto(nombre,correo) {
  HOJA.appendRow([nombre,correo])
}