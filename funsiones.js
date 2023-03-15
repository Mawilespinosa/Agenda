function doGet() {
  return HtmlService.createTemplateFromFile('web').evaluate();
}

function obtenerDatosHtml(nombre) {        
    return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}