const Mensaje = require("../models/Mensaje");
// const { validationResult } = require("express-validator");

exports.crearMensaje = async (req, res) => {
  // Extraer email y password
  const { email } = req.body;

  try {
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      return res.status(403).json({ msg: "Ingrese un email válido." });
    }
    let mensaje;
    // Creamos el Mensaje
    mensaje = new Mensaje(req.body);
    // Guardamos el mensaje en la BD
    await mensaje.save();
    res.json({ msg: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error." });
  }
};
exports.obtenerMensajes = async (req, res) => {
  try {
    const mensajes = await Mensaje.find({}).sort("fecha, hora");
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
