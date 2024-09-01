const UsuarioSchema = require("../models/Usuario") // Accedemos a los datos del modelo
const bcrypt = require('bcrypt') // Importamos la librería de encriptaron
const jwt = require('jsonwebtoken')

// Permite agrupar atributos y funciones
class UsuarioController {

    async getUsuarios(req, res) {
        var usuarios = await UsuarioSchema.find();
        res.json(usuarios)
    }

    async createUsuario(req, res){

        // Encriptando la contraseña
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
       
        var nuevoUsuario = {
           
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: hashedPassword, // Guardo la contraseña hasheada
        }

        await UsuarioSchema(nuevoUsuario).save()
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario Guardado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })

    }

    async getUsuarioById(req, res){
        var id = req.params.id
        var usuario = await UsuarioSchema.findById(id)
        res.json(usuario)
    }

    async updateUsuario(req, res){

        var id = req.params.id;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        var updateUser = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            email: req.body.correo,
            password: hashedPassword,
        }

        await UsuarioSchema.findByIdAndUpdate(id, updateUser, { new: true })
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario Actualizado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })

    }

    async deleteUsuario(req, res){
        var id = req.params.id

        await UsuarioSchema.deleteOne({_id: id})

        res.json({"status": "success", "message": "Usuario Eliminador correctamente"})
    }

    async login(req, res){
        // Capturo el correo y a contraseña ingresados
        var email = req.body.email;
        var password = req.body.password

        // Buscar el usuario por el email
        var usuario = await UsuarioSchema.findOne({email})
        if(usuario){
            // Comparar la contraseña ingresada con la registrada por el usuario
                                                    //   Ingreso      Almacenado [Encriptado]
            var verificacionClave = await bcrypt.compare(password, usuario.password)
            // Si la verificacion de la clave es exitosa
            if(verificacionClave){

                // Creo un token con la información codificada del usuario
                usuario.password = null
                const token = jwt.sign({usuario}, 'secret', { expiresIn: '1h'})

                res.send({"status": "success", 
                            "message": "Bienvenido " + usuario.nombre + " " + usuario.apellidos,
                            "user_id": usuario._id,
                            "token": token
                    })
            }else{
                res.status(401).send({"status": "error", "message": "Datos inválidos"})
            }
        }else{
            // Cuando el email ingresado no esta registrado
            res.status(401).send({"status": "error", "message": "El email ingresado no existe"})
        }
    }
}

module.exports = UsuarioController