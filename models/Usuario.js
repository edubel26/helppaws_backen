const mongoose = require("mongoose");// Importamos la librería mongoose

const UserSchema = new mongoose.Schema({
   
  nombres: {
    type: String,
    required: true
   },
  apellidos: {
    type: String,
    required: true
   },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: props => props.value + " no es un email electrónico válido!"
    }
  },
  password: {
    type: String,
    required: true
  },
  code: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true,
    default:'UNVERIFIED'
  }
});

module.exports = mongoose.model('usuarios', UserSchema);