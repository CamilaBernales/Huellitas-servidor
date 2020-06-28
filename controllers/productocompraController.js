const ProductoCompra = require('../models/ProductoCompra');
const { validationResult } = require('express-validator');

exports.crearProductoCompra = async (req,res) => {
  try {
    for (let index = 0; index < req.body.pedido.length; index++) {
      req.body.pedido[index].compra = req.body.compra;
      let productocompra = new ProductoCompra(req.body.pedido[index]);
      await productocompra.save();  
    }
    res.status(200).json({ msg: 'La compra se realizó correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};