const express = require('express');
const router = express.Router();
const mensajeCotroller = require('../controllers/mensajeController')
const { check } = require('express-validator')

//Crea el mensaje
router.post('/',
    [
        check('nombre','El nombre es obligatorio.').notEmpty(),
        check('email','El email es obligatorio.').notEmpty(),
        check('email','Ingrese un email válido.').isEmail(),
        check('mensaje','Es obligatorio escribir algo.').notEmpty(),
    ],
    mensajeCotroller.crearMensaje
)
module.exports = router