const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authrol = require('../middleware/authrol');

router.post(
  '/compra',
  auth,
  authrol,
  [
    check('usuario', 'Falta ID usuario').isEmpty(),
    check('usuario', 'No es un ID válido').isMongoId(),
    check('total', 'Falta el total de la compra').isEmpty()
  ],
  compraController.crearCompra
);