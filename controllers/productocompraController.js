const ProductoCompra = require('../models/ProductoCompra');
const { validationResult } = require('express-validator');

exports.crearProductoCompra = async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    let productocompra = new ProductoCompra(req.body);
    await productocompra.save();
    res.status(200).json({ msg: 'Producto de compra guardado corrctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};

exports.obtenerProductoCompra = async (req,res) => {
  try {
    const {compra} = req.body.compra;
    let productocompra = await ProductoCompra.find(compra);
    res.status(200).json(productocompra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};