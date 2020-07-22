const Compra = require("../models/Compra");
const Producto = require("../models/Producto");
const ProductoCompra = require("../models/ProductoCompra");
const Usuario = require("../models/Usuario");
const nodemailer = require("nodemailer");

exports.crearCompra = async (req, res, next) => {
  try {
    for (let index = 0; index < req.body.pedido.length; index++) {
      const productoId = req.body.pedido[index].producto;
      let producto = await Producto.findById(productoId);
      if (!producto) {
        return res
          .status(400)
          .json({ msg: `El producto ${producto.nombre} no existe.` });
      }
      if (!(producto.disponibilidad === "Disponible")) {
        return res
          .status(400)
          .json({ msg: `El producto ${producto.nombre} no está disponible.` });
      }
    }
    req.body.usuario = req.usuario.id;
    let compra = new Compra(req.body);
    let compraId;
    await compra.save().then((id) => (compraId = id._id));
    req.body.compra = compraId;
    next();
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.obtenerCompras = async (req, res) => {
  try {
    const { pagina } = req.query;
    let options = {
      page: pagina,
      limit: 10,
    };
    const compras = await Compra.paginate({}, options);
    for (let i = 0; i < compras.docs.length; i++) {
      const compra = compras.docs[i]._doc._id;
      compras.docs[i]._doc.pedido = await ProductoCompra.find(
        { compra },
        { fecha: 0 }
      );
      for (let j = 0; j < compras.docs[i]._doc.pedido.length; j++) {
        const producto = compras.docs[i]._doc.pedido[j]._doc.producto;
        const productonombre = await Producto.find(producto);
        compras.docs[i]._doc.pedido[j]._doc.nombre = productonombre[0].nombre;
      }
    }
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.filtrarCompras = async (req, res) => {
  try {
    const { nombre, pagina } = req.query;
    let options = {
      page: pagina,
      limit: 10,
    };
    const compras = await Compra.paginate(
      {
        nombre: { $regex: ".*" + nombre + ".*", $options: "i" },
      },
      options
    );
    for (let i = 0; i < compras.docs.length; i++) {
      const compra = compras.docs[i]._doc._id;
      compras.docs[i]._doc.pedido = await ProductoCompra.find(
        { compra },
        { fecha: 0 }
      );
      for (let j = 0; j < compras.docs[i]._doc.pedido.length; j++) {
        const producto = compras.docs[i]._doc.pedido[j]._doc.producto;
        const productonombre = await Producto.find(producto);
        compras.docs[i]._doc.pedido[j]._doc.nombre = productonombre[0].nombre;
      }
    }
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
exports.sendEmail = function (req, res) {
  const { email } = req.body;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "HuellitasVeterinariaSMT@gmail.com",
      pass: "Huellitas1234",
    },
  });
  let mailOptions = {
    from: "HuellitasVeterinariaSMT@gmail.com",
    to: email,
    subject: "Compra realizada con éxito",
    text: "Gracias por tu compra! Recibiras información de tu pedido en breve.",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(500, error.msg);
    } else {
      res.status(200).jsonp(req.body);
    }
  });
};

exports.obtenerComprasUsuario = async (req, res) => {
  try {
    const comprador = await Usuario.findById(req.usuario.id).select("_id");
    const compras = await Compra.find({
      usuario: comprador,
    });
    for (let i = 0; i < compras.length; i++) {
      const compra = compras[i]._doc._id;
      compras[i]._doc.pedido = await ProductoCompra.find(
        { compra },
        { fecha: 0 }
      );
      for (let j = 0; j < compras[i]._doc.pedido.length; j++) {
        const producto = compras[i]._doc.pedido[j]._doc.producto;
        const productonombre = await Producto.find(producto);
        compras[i]._doc.pedido[j]._doc.nombre = productonombre[0].nombre;
      }
    }
    return res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
