const mongoose = require("mongoose") // Importar la libreria
const bcrypt = require("bcrypt")//Importa el incriptador

const saltRounds = 10; //Comunicar cuantas veses se va a incriptar la contraseña 



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