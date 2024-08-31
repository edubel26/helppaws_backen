const express = require('express') // Importendo la libreria
const app = express() // Inicializamos la variable de la libreria
const UsuariosController = require('../controllers/UsuarioControllers') //Importando  el controlador
const controller = new UsuariosController();

// creamos nuestros secicios web
app.get('/usuarios', controller.getUsuarios)
app.post('/usuarios', controller.createUsuarios)
app.get('/usuarios/:id', controller.getUsuariosById)
app.put('/usuarios/:id', controller.updateUsuarios)
app.delete('/usuarios/:id', controller.deleteUsuarios)
app.post('/login', controller.login)

module.exports = app

