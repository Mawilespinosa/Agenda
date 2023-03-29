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
function insertarContacto(nombre,apellido,correo,telefono) {
  HOJA.appendRow([nombre,apellido,correo,telefono])
}
function eliminarContacto(numFila)
{
  HOJA.deleteRow(numFila);
}

function modificarContacto(numFila,datos){
  let celdas = HOJA.getRange('A' + numFila +':D' + numFila);
  celdas.setValues([[datos.nombre,datos.apellido,datos.correo,datos.telefono]]);
}

function importarContactos() {
  let url ='https://randomuser.me/api/?results=5&inc=name,email,phone';
  let respuesta = UrlFetchApp.fetch(url).getContentText();
  let datos = JSON.parse(respuesta);
  datos.results.forEach(contacto => insertarContactoExterno(contacto));
  
}

function insertarContactoExterno(datos){
  HOJA.appendRow([datos.name.first,datos.name.last,datos.email,datos.phone])
}




