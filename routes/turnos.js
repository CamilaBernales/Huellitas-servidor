const express = require("express");
const router = express.Router();
const turnoController = require("../controllers/turnoController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombremascota", "El nombre de tu mascota obligatorio.").notEmpty(),
    check("edad", "La edad de tu mascota es obligatoria.").notEmpty(),
    check("raza", "La raza de tu mascota es obligatoria.").notEmpty(),
    check("profesional", "Debe elegir el profesional que atendera a su mascota.").notEmpty(),
    check("fecha", "La fecha de tu turno es obligatoria.").notEmpty(),
  ],
  turnoController.crearTurno
);
module.exports = router;
