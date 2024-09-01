const express = require('express') // Importa la librería
const app = express() // Inicializamos la variable de la librería
const UsuariosController = require('../controllers/UsuarioControllers') //Importa el controlador
const controller = new UsuariosController();

// creamos nuestros servicios web
app.get('/usuarios', controller.getUsuarios)
app.post('/usuarios', controller.createUsuario)
app.get('/usuarios/:id', controller.getUsuarioById)
app.put('/usuarios/:id', controller.updateUsuario)
app.delete('/usuarios/:id', controller.deleteUsuario)
app.post('/login', controller.login)

module.exports = app

