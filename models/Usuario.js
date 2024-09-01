const mongoose = require("mongoose") // Importar la librería

const UsuarioSchema = new mongoose.Schema({
        
    nombres: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(correo){
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
          },
          message: props => props.value + " no es un correo electrónico válido!"
        }
    }, 
    password: {
        type: String,
        required: true
    }
});

module.exports =  mongoose.model('usuarios', UsuarioSchema)