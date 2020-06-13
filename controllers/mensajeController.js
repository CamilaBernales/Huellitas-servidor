const Mensaje = require('../models/Mensaje');
// const { validationResult } = require("express-validator");
 
exports.crearMensaje = async (req, res)  => {
    

    try {
        let mensaje;
        
        // Creamos el Mensaje
        mensaje = new Mensaje(req.body);
        
        // Guardamos el usuario en la BD
        await mensaje.save();
        res.json({ msg: 'Mensaje enviado correctamente'});
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.'});
    }
};
