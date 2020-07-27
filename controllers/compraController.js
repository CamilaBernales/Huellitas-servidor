const Compra = require("../models/Compra");
const Producto = require("../models/Producto");
const ProductoCompra = require("../models/ProductoCompra");
const Usuario = require("../models/Usuario");
const nodemailer = require("nodemailer");
const { PaymentApiMp } = require("./paymentApiMp");

exports.crearCompra = async (req, res, next) => {
  try {
    //traermos el comprador para mandar el email de compra exitosa
    const comprador = await Usuario.findById(req.usuario.id);
    //creamos la compra
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
    if (req.body.medioDePago.efectivoChecked === false) {
      let pago = await PaymentApiMp(req.body);
      if (pago.body.status !== "approved") {
        return res.status(202).json({ msg: "El pago no pudo ser procesado." });
      }
    }
    const { detallesEnvio, pedido, token, total, ...resto } = req.body;
    const compraNueva = {
      ...resto,
      detallesEnvio,
      usuario: req.usuario.id,
      pedido,
      token,
      total,
      fecha: Date.now(),
    };
    req.body.usuario = req.usuario.id;
    let compra = new Compra(compraNueva);
    let compraId;
    await compra.save().then((id) => (compraId = id._id));
    req.body.compra = compraId;
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "HuellitasVeterinariaSMT@gmail.com",
        pass: "Huellitas1234",
      },
    });
    let mailOptions = {
      from: "HuellitasVeterinariaSMT@gmail.com",
      to: comprador.email,
      subject: "Compra realizada con éxito",
      text:
        "Gracias por tu compra! Recibiras información de tu pedido en breve.",
    };
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        res.status(500).jsonp(error);
      } else {
        res.status(200).jsonp(req.body);
      }
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error", error });
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
        "detallesEnvio.nombre": { $regex: ".*" + nombre + ".*", $options: "i" },
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

exports.obtenerComprasUsuario = async (req, res) => {
  try {
    const comprador = await Usuario.findById(req.usuario.id).select("_id");
    if (!comprador) {
      return res.status(202).json({ msg: "No se encontro al comprador." });
    }
    const compras = await Compra.find({
      usuario: req.usuario.id,
    });
    if (compras.length === 0) {
      return res.status(202).json([]);
    }
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
