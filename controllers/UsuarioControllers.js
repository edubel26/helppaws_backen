const UserSchema = require("../models/Usuario"); // Accedemos a los datos del modelo
const bcrypt = require('bcrypt'); // Importamos la librería de encriptaron
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { getToken, getTokenData } = require('../config/jwtConfig');
const { getTemplate, sendEmail } = require('../config/mailConfig');

// Permite agrupar atributos y funciones
class UsuarioController {

    async getUsuarios(req, res) {
        var usuarios = await UserSchema.find();
        res.json(usuarios);
    }

    async createUsuario(req, res){

        // Encriptando la contraseña
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // se crea unn código aleatorio 
        const code = uuidv4(); 


        var nuevoUsuario = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: hashedPassword,// Guardo la contraseña hasheada
            code: code, 
        }

        const {nombres, apellidos, email} = req.body;

        // Generar token
        const token = getToken({email, code});

        // Obtener un template
        const template = getTemplate(nombres, apellidos, token);
 
        // Enviar el email
        await sendEmail(email, 'Verificacion de correo HelpPaws', template);

        await UserSchema(nuevoUsuario).save()
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario Guardado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })


    }

    async getUsuarioById(req, res){
        var id = req.params.id
        var usuario = await UserSchema.findById(id)
        res.json(usuario)
    }

    async updateUsuario(req, res){

        var id = req.params.id;
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        var updateUser = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: hashedPassword,
        }

        await UserSchema.findByIdAndUpdate(id, updateUser, { new: true })
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario Actualizado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })

    }

    async deleteUsuario(req, res){
        var id = req.params.id

        await UserSchema.deleteOne({_id: id})

        res.json({"status": "success", "message": "Usuario Eliminador correctamente"})
    }

    async login(req, res){
        // Capturo el email y a contraseña ingresados
        var email = req.body.email;
        var password = req.body.password

        // Buscar el usuario por el email
        var usuario = await UserSchema.findOne({email})
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
                            "message": "Bienvenido " + usuario.nombres + " " + usuario.apellidos,
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


    async confirmaEmail(req, res){
        
        try {

            // Obtener el token
            const { token } = req.params;
            
            // Verificar la data
            const data = await getTokenData(token);
     
            if(data === null) {
                 return res.json({
                     success: false,
                     msg: 'Error al obtener data'
                 });
            }
     
            console.log(data);
     
            const { email, code } = data.data;
     
            // Verificar existencia del usuario
            const user = await User.findOne({ email }) || null;
     
            if(user === null) {
                 return res.json({
                     success: false,
                     msg: 'Usuario no existe'
                 });
            }
     
            // Verificar el código
            if(code !== user.code) {
                 return res.redirect('/error.html');
            }
     
            // Actualizar usuario
            user.status = 'VERIFIED';
            await user.save();
     
            // Redireccionar a la confirmación
            return res.redirect('/confirm.html');
             
         } catch (error) {
             console.log(error);
             return res.json({
                 success: false,
                 msg: 'Error al confirmar usuario'
             });
         }

    }
}

module.exports = UsuarioController