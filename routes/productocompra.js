const express = require('express');
const router = express.Router();
const productocompraController = require('../controllers/productocompraController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
  auth,
  [
    check('compra', 'Falta ID de compra').notEmpty(),
    check('compra', 'No es un ID válido').isMongoId(),
    check('producto', 'Falta ID de producto').notEmpty(),
    check('producto', 'No es un ID válido').isMongoId(),
    check('precio', 'Falta precio de producto').notEmpty(),
    check('cantidad', 'Falta la cantidad').notEmpty()
  ],
  productocompraController.crearProductoCompra
);

router.get('/listado', auth, productocompraController.obtenerProductoCompra);

module.exports = router;