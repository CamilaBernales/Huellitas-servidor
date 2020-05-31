const Turno = require("../models/Turno");
const { validationResult } = require("express-validator");
const moment = require("moment");

exports.crearTurno = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }

  const { fecha } = req.body;
  // const hora = moment(req.body.fecha).format('LLLL');
  try {
    let turno = await Turno.findOne({ fecha });
    if (turno) {
      return res
        .status(403)
        .json({ msg: "Elija una fecha que no este ocupada." });
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

//update turno
exports.updateTurno = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }
  const turnoUpdate = req.body;
  try {
    let turno = await Turno.findById(req.params.id);
    if (!turno) {
      return res.status(404).json({ msg: "Turno no encontrado." });
    }
    turno = await Turno.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: turnoUpdate },
      { new: true }
    );
    res.json({ turno });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};


//obtener turnos
exports.obtenerTurnos = async (req, res) => {
  try {
      const turnos = await Turno.find({});
      res.json(turnos);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
}
//obtener todos los turnos de un usuario en especifico
exports.obtenerTurnosUsuario = async (req, res) => {
  try {
      const turnos = await Turno.find({ dueño: req.params.id })
      res.json({ turnos });
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}


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
