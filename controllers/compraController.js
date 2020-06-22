const Compra = require('../models/Compra');
const Producto = require('../models/Producto');
const ProductoCompra = require('../models/ProductoCompra');
const { validationResult } = require('express-validator');

exports.crearCompra = async (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    for (let index = 0; index < req.body.pedido.length; index++) {
      const productoId = req.body.pedido[index].producto;
      let producto = await Producto.findById(productoId);
      if (!producto) {
        return res.status(400).json({ msg: `El producto ${producto.nombre} no existe.` });
      }
      if (!producto.disponibilidad) {
        return res.status(400).json({ msg: `El producto ${producto.nombre} no está disponible.` });
      }
    }
    req.body.usuario = req.usuario.id;
    let compra = new Compra(req.body);
    let compraId;
    await compra.save().then(id => compraId = id._id);
    req.body.compra = compraId;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};

exports.obtenerCompras = async(req, res) => {
  try {
    const compras = await Compra.find({});
    for (let index = 0; index < compras.length; index++) {
      const compra = compras[index]._doc._id;
      console.log(compra);
      compras[index]._doc.pedido = await ProductoCompra.find({compra});
    }
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error' });
  }
};