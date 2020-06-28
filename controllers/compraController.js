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
      if (!(producto.disponibilidad === 'Disponible')) {
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
    for (let i = 0; i < compras.length; i++) {
      const compra = compras[i]._doc._id;
      compras[i]._doc.pedido = await ProductoCompra.find({compra}, {fecha: 0});
      for (let j = 0; j < compras[i]._doc.pedido.length; j++) {
        const producto = compras[i]._doc.pedido[j]._doc.producto;
        const productonombre = await Producto.find(producto);
        compras[i]._doc.pedido[j]._doc.nombre = productonombre[0].nombre; 
      }
    }
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error' });
  }
};