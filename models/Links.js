const mongoose = require("mongoose");// Importamos la librería mongoose

const LinkSchema = new mongoose.Schema({
   
  nombreLinks: {
    type: String,
    required: true
  },
  links: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(opcionlinks){
        return /^http:\/\/|(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(opcionlinks);
      },
      message: props => props.value + " no es un links válido!"
    }
  },
  opcionlinks: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('links', LinkSchema);