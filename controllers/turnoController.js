const Turno = require("../models/Turno");
const { validationResult } = require("express-validator");
const moment = require("moment");

exports.crearTurno = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ erroes: errores.array() });
  }

  const { fecha } = req.body;
  // const hora = moment(req.body.fecha).format('LLLL');
  try {
    let turno = await Turno.findOne({ fecha });
    if (turno) {
      return res
        .status(400)
        .json({ msg: "Elija una fecha que no este ocupada." });
    }
    turno = new Turno(req.body);
    await turno.save();
    res.json({ msg: "Turno creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Hubo un error." });
  }
};
