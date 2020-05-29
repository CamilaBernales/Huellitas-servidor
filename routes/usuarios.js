const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");

//crear usuario
// request a : api/usuarios
router.post('/', 
    [
        check('nombre','El nombre es obligatorio.').notEmpty(),
        check('email','El email es obligatorio.').notEmpty(),
        check('email','Ingrese un email válido.').isEmail(),
        check('password','El password es obligatorio.').notEmpty(),
        check('password','El password debe ser de al menos 6 caracteres.').isLength({ min: 6}),

    ],
    usuarioController.crearUsuario
);
module.exports = router;
