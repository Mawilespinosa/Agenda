const HOJA = SpreadsheetApp.openById('18YVSU3POoSjmWfUIPBYArjTG2U5i1b0E1uB62uBpLho').getActiveSheet();
const CARPETA = DriveApp.getFolderById('1afQvMBn9Cxd2r-FFP3-TkR7Dg-RHnuCP');
const urlAccesoDrive = 'https://drive.google.com/uc?export=view&id=';

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
function insertarContacto(contacto,imagen) {
  if(imagen) contacto.imagen = guardarImagen(imagen);
  
  HOJA.appendRow([contacto.nombre, contacto.apellido, contacto.correo, contacto.tel,contacto.imagen]);
}
function eliminarContacto(numFila) {
  HOJA.deleteRow(numFila);
}

function modificarContacto(contacto,imagen) {
  if(imagen) contacto.imagen = guardarImagen(imagen);
  let celdas = HOJA.getRange('A' + contacto.fila + ':E' + contacto.fila);
  celdas.setValues([[contacto.nombre, contacto.apellido, contacto.correo, contacto.tel,contacto.img]]);
}

function guardarImagen(imagen){
  let blob = Utilities.newBlob(imagen.datos,imagen.tipo,imagen.nombre);
  let archivo = CARPETA.createFile(blob);
  return urlAccesoDrive+archivo.getId();
}

function importarContactos() {
  let url = 'https://randomuser.me/api/?results=5&inc=name,email,phone,picture';
  let respuesta = UrlFetchApp.fetch(url).getContentText();
  let datos = JSON.parse(respuesta);
  datos.results.forEach(contacto => insertarContactoExterno(contacto));

}

function insertarContactoExterno(datos) {
  HOJA.appendRow([datos.name.first, datos.name.last, datos.email, datos.phone, datos.picture.large])
}




