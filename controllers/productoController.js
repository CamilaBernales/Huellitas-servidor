const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

exports.crearProducto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { nombre, descripcion } = req.body;
  try {
    let producto = await Producto.findOne({ nombre, descripcion });
    if (producto) {
      return res.status(403).json({ msg: "Este producto ya esta registrado" });
    }
    producto = new Producto(req.body);
    await producto.save();
    res.status(200).json({ msg: "Producto creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

// editar/actualizar producto
exports.updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};

//obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const { pagina } = req.query;
    const options = {
      page: pagina,
      limit: 12,
    };
    const productos = await Producto.paginate({}, options);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};

//obtener un producto enviado
exports.obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.status(200).json({ producto });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    let producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({ msg: "Producto no encontrado." });
    }
    //lo elimino
    await Producto.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Producto eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};

exports.ObtenerProductoFiltrado = async (req, res) => {
  try {
    const { nombre, tipoproducto } = req.query;

    const productosfiltrados = await Producto.paginate({
      nombre: { $regex: ".*" + nombre + ".*", $options: "i" },
      tipoproducto: { $regex: ".*" + tipoproducto + ".*", $options: "i" },
    });
    res.status(200).json(productosfiltrados);
  } catch (error) {
    console.log(error);
  }
};
