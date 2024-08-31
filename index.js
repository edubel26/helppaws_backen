// configuracion de express 
const express = require('express') //Importando la libreria
const app = express() // Iniciando la variable de la libreria
const port = 3000 // Definimos el puerto a usar

const mongoose = require('mongoose'); // Importo la libreria de mongoose

//Obtengo la cadena de conexion del archivo .anv
require('dotenv').config()
const DB_CONNECTION = process.env.DB_CONNECTION || ''
mongoose.connect(DB_CONNECTION)// creo la cadena de conexion

const cors = require('cors') // Importo la libreria de cors 
app.use(cors());// permite la entrada y salida de datos 

// Importamos las rutas del otro archivo
app.use(express.urlencoded({extended: true}))// Acceder a la informacion de las urls
app.use(express.json())// Analizar informacion en formato json
const UsuarioRoutes = require('./routes/UsuarioRoutes')
app.use('/', UsuarioRoutes)


//Ejecuta el servidor
app.listen(port, () =>{
    console.log("Listen on " + port)
})