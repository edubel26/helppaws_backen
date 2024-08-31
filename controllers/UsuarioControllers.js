const UsuarioSchema = require("../models/Usuario") // Accedemos a los datos del modelo
const bcrypt = require('bcrypt') //Importamos la librería de encriptar 
const jwt = require("jsonwebtoken"); // Importamos la librería de token  

// Permite agrupar atributos y funciones
class UsuariosController {

    async getUsuarios(req, res) {
      var usuarios = await UsuarioSchema.find();
      res.json(usuarios)
    }

    async createUsuarios(req, res){

      // Encriptando la contraseña
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      var nuevoUsuarios = {
          nombres: req.body.nombres,
          email: req.body.email,
          password: hashedPassword,
      }

      await UsuarioSchema(nuevoUsuarios).save()
      // forma de hacerlo con "Promesas" para evitar errores en guardar usuario
      .then((result) => { 
        res.send({"status": "success", "message": "Usuario Guardado correctamente"}) // Usuario registrado
      }).catch((error) => {
        res.send({"status": "error", "message": error.message })// Muestra el errror al crear usuario
      })

    }

    // Encontrar un solo usuario
    async getUsuariosById(req, res){
      var id = req.params.id
      var usuarios = await UsuarioSchema.findById(id)
      res.json(usuarios)
    }

    async updateUsuarios(req, res){

        var id = req.params.id;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        var updateUsuarios = {
          nombre: req.body.nombres,
          email: req.body.email,
          password: hashedPassword,
        }

        await UsuarioSchema.findByIdAndUpdate(id, updateUsuarios, { new: true })
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario Actualizado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })

    }


    async deleteUsuarios(req, res){

      var id = req.params.id

      await UsuarioSchema.deleteOne({_id: id})

      res.json({"status": "success", "message": "Usuario Eliminado correctamente"})

    }

    async login(req, res){
        // Capturo el correo y a contraseña ingresados
        var email = req.body.email;
        var password = req.body.password

        // Buscar el usuario por el correo
        var usuario = await UsuarioSchema.findOne({email})
        if(usuario){
            // Comparar la contraseña ingresada con la registrada por el usuario
                                                    //   Ingreso      Almacenado [Encriptado]
            var verificacionClave = await bcrypt.compare(password, usuario.password)
            // Si la verificación de la clave es exitosa
            if(verificacionClave){

                // Creo un token con la información codificada del usuario
                usuario.password = null
                const token = jwt.sign({usuario}, 'secret', { expiresIn: '1h'})

                res.send({"status": "success", 
                            "message": "Bienvenido " + usuario.nombres,
                            "user_id": usuario._id,
                            "token": token
                    })
            }else{
                res.status(401).send({"status": "error", "message": "Datos inválidos"})
            }
        }else{
            // Cuando el correo ingresado no esta registrado
            res.status(401).send({"status": "error", "message": "El correo ingresado no existe"})
        }
    }
}

module.exports =  UsuariosController