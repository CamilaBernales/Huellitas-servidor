const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

exports.crearProducto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { nombre } = req.body;
  try {
    let producto = await Producto.findOne({ nombre });
    if (producto) {
      return res.status(403).json({ msg: "Este producto ya esta registrado" });
    }
    producto = new Producto(req.body);
    await producto.save();
    res.json({ msg: "Producto creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

// editar/actualizar producto
//obtener turnos
exports.updateProducto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }
  const productoUpdate = req.body;
  try {
    let producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado." });
    }
    producto = await Producto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: productoUpdate },
      { new: true }
    );
    res.json({ producto });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};

//obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find({});
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};

