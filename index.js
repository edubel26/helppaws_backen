// Conjuración de express
const express = require('express'); // Importando la librería
const app = express(); // Inicializamos la variable de la librería
const port = 3000 // Definimos el puerto a usar

const mongoose = require('mongoose'); // Importo la librería mongoose

// Obtengo la cadena de conexión del archivo .env
require('dotenv').config();
const DB_CONNECTION = process.env.DB_CONNECTION || ''
mongoose.connect(DB_CONNECTION); // Creo la cadena de conexión

// Agregamos la configuración del cors
const cors = require('cors');
app.use(cors());

// Importamos las rutas del otro archivo
app.use(express.urlencoded({extended: true})); // Acceder a la información de las urls
app.use(express.json()); // Analizar información en formato JSON

//apartado de creación inicio de sesión etc, del usuario 
const UsuarioRoutes = require('./routes/UsuarioRoutes');
app.use('/', UsuarioRoutes);

// apartado de links
const LinkRoutes = require('./routes/LinkRoutes');
app.use('/', LinkRoutes);

// Creando el servicio web
// Funcionalidad de nuestra API
// [get, post, put, patch, delete]
// res -> Response -> Respuesta
// req -> Request  -> Información de entrada
app.get('/', (req, res) => {
    // Muestra en pantalla Hello world
    res.send("Help Paws");
});


// Ejecutamos el servidor
app.listen(port, () => {
    console.log("Listen on " + port);
});