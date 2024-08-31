const mongoose = require("mongoose") // Importar la librería
const bcrypt = require("bcrypt")//Importa el encriptar

const saltRounds = 10; //Comunicar cuantas veces se va a encriptar la contraseña 



const UsuarioSchema = new mongoose.Schema({
        
    nombres: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        unique: true,  
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
});

module.exports =  mongoose.model('usuarios', UsuarioSchema)