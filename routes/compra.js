const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
  auth,
  [
    check('usuario', 'Falta ID usuario').notEmpty(),
    check('usuario', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('direccion', 'La dirección es obligatoria').notEmpty(),
    check('codigoPostal', 'El código postal es obligatorio').notEmpty(),
    check('telefono', 'El teléfono es obligatorio').notEmpty(),
    check('total', 'Falta el total de la compra').notEmpty()
  ],
  compraController.crearCompra
);

router.get('/listado', auth, compraController.obtenerCompras);

module.exports = router;