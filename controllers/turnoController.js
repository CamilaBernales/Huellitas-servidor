const Turno = require("../models/Turno");
const Usuario = require("../models/Usuario");
const moment = require("moment");

exports.crearTurno = async (req, res) => {
  const { fecha, hora, telefono } = req.body;
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("_id");
    let turno = await Turno.findOne({ fecha, hora });
    let fechaActual = moment().format("YYYY-MM-DD");
    let dueñoValidacion = await Turno.findOne({
      dueño: usuario,
      fecha,
    });
    if (dueñoValidacion) {
      return res
        .status(403)
        .json({ msg: "No puedes reservar más de una vez por día." });
    }
    if (turno) {
      return res
        .status(403)
        .json({ msg: "Elija una fecha y un horario que este disponible." });
    }

    if (fecha <= fechaActual) {
      return res
        .status(403)
        .json({ msg: "La fecha no puede ser anterior ni igual a la actual." });
    }
    if (moment(fecha).day() === 0) {
      return res.status(403).json({ msg: "No atendemos los domingos." });
    }
    numbervalidation = /^(381)?[0-9]{8,10}/;
    if (
      !telefono.match(numbervalidation) ||
      telefono.length > 10 ||
      telefono.length < 8
    ) {
      return res.status(403).json({ msg: "Numero no válido" });
    }
    turno = new Turno(req.body);
    turno.dueño = req.usuario.id;

    await turno.save();
    res.json({ msg: "Turno creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};

//obtener
exports.obtenerHorariosDisponibles = async (req, res) => {
  let horarios = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];
  try {
    let turnos = await Turno.find({ fecha: req.params.fecha });
    // res.json({turnos})
    if (turnos) {
      const hdisp = horarios.filter(
        (horario) => !turnos.some((turno) => horario === turno.hora)
      );
      res.json({ hdisp });
    }
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};

//obtener turnos
exports.obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find({}).sort("fecha, hora");
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
//obtener todos los turnos de un usuario en especifico
exports.obtenerTurnosUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("_id");
    const turnos = await Turno.find({ dueño: usuario }).sort("fecha");
    return res.json({ turnos });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};

//eliminar turnos de la bd
exports.eliminarTurno = async (req, res) => {
  try {
    let turno = await Turno.findById(req.params.id);
    if (!turno) {
      res.status(404).json({ msg: "Turno no encontrado." });
    }
    //lo elimino
    await Turno.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Turno eliminado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};
