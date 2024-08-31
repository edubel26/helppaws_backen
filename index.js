// configuración de express 
const express = require('express') //Importando la librería
const app = express() // Iniciando la variable de la librería
const port = 3000 // Definimos el puerto a usar

const mongoose = require('mongoose'); // Importo la librería de mongoose

//Obtengo la cadena de conexión del archivo .anv
require('dotenv').config()
const DB_CONNECTION = process.env.DB_CONNECTION || ''
mongoose.connect(DB_CONNECTION)// creo la cadena de conexión

const cors = require('cors') // Importo la librería de cors 
app.use(cors());// permite la entrada y salida de datos 

// Importamos las rutas del otro archivo
app.use(express.urlencoded({extended: true}))// Acceder a la información de las urls
app.use(express.json())// Analizar información en formato json
const UsuarioRoutes = require('./routes/UsuarioRoutes')
app.use('/', UsuarioRoutes)


//Ejecuta el servidor
app.listen(port, () =>{
    console.log("Listen on " + port)
})