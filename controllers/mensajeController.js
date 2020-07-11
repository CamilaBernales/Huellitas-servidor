const Mensaje = require("../models/Mensaje");
const moment = require("moment");

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
    let fecha = moment(Date.now()).format("YYYY-MM-DD");
    mensaje.created_at = fecha;
    // Guardamos el mensaje en la BD
    await mensaje.save();
    console.log(mensaje);

    res.json({ msg: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Hubo un error." });
  }
};
exports.obtenerMensajes = async ( res) => {
  try {
    const mensajes = await Mensaje.find({}).sort("created_at");
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
