const Compra = require('../models/Compra');
const { validationResult } = require('express-validator');

exports.crearCompra = async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    let compra = new Compra(req.body);
    await producto.save();
    res.status(200).json({ msg: 'Compra realizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};