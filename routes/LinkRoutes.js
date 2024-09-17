const express = require('express') // Importando la librería
const app = express() // Inicializamos la variable de la librería
const LinksController = require('../controllers/linksControllers') // Importando el controlador
const controller = new LinksController(); // Creando un objeto de links

// Creamos nuestros servicios web
app.get('/link', controller.getLink) // Obtengo todos los links
app.post('/link', controller.createLink) // Creo un link
app.get('/link/:id', controller.getLinkById) // Consulto un link
app.put('/link/:id', controller.updateLink) // Actualizo un link
app.delete('/link/:id', controller.deleteLink) // Elimino un link

module.exports = app