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
    check('total', 'Falta el total de la compra').notEmpty()
  ],
  compraController.crearCompra
);

module.exports = router;