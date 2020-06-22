const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const productocompraController = require('../controllers/productocompraController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


router.post('/',
  auth,
  [
    check('direccion', 'La dirección es obligatoria').notEmpty(),
    check('codigoPostal', 'El código postal es obligatorio').notEmpty(),
    check('telefono', 'El teléfono es obligatorio').notEmpty(),
    check('total', 'Falta el total de la compra').notEmpty(),
    check('pedido.*.producto', 'No es un ID válido').isMongoId(),
    check('pedido.*.precio', 'Falta precio de producto').notEmpty(),
    check('pedido.*.cantidad', 'Falta la cantidad').notEmpty()
  ],
  compraController.crearCompra,
  productocompraController.crearProductoCompra
);

router.get('/listado', auth, compraController.obtenerCompras);

module.exports = router;