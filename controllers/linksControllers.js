const LinkSchema = require("../models/Links"); // Accedemos a los datos del modelo

// Permite agrupar atributos y funciones
class LinkController {

    async getLink(req, res) {
        var link = await LinkSchema.find();
        res.json(link);
    }
 

    async createLink(req, res){

        var nuevoLink = {
            nombreLinks: req.body.nombreLinks,
            links: req.body.links,
            opcionlinks: req.body.opcionlinks
        }
    
        await LinkSchema(nuevoLink).save()
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Link Guardado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })


    }

    async getLinkById(req, res){
        var id = req.params.id
        var link = await LinkSchema.findById(id)
        res.json(link)
    }

    async updateLink(req, res){

        var id = req.params.id;
        
        var updateLink = {
            nombreLinks: req.body.nombreLinks,
            links: req.body.links,
            opcionlinks: req.body.opcionlinks,
        }

        await LinkSchema.findByIdAndUpdate(id, updateLink, { new: true })
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Links Actualizado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })

    }

    async deleteLink(req, res){
        var id = req.params.id

        await LinkSchema.deleteOne({_id: id})

        res.json({"status": "success", "message": "Link Eliminador correctamente"})
    }
}

module.exports = LinkController