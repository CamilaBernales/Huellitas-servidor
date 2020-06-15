const express = require("express");
const router = express.Router();
const turnoController = require("../controllers/turnoController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authrol = require("../middleware/authrol");

router.post(
  "/alta",
  auth,
  [
    check("nombremascota", "El nombre de tu mascota obligatorio.").notEmpty(),
    check(
      "nombremascota",
      "El nombre de tu mascota no puede exceder los 40 caracteres."
    ).isLength({ max: 40 }),
    check(
      "particularidades",
      "Las particularidades no pueden exceder los 100 caracteres"
    ).isLength({ max: 120 }),
    check("edad", "La edad de tu mascota es obligatoria.").notEmpty(),
    check("raza", "La raza de tu mascota es obligatoria.").notEmpty(),
    check(
      "raza",
      "La raza de tu mascota no puede exceder los 40 caracteres."
    ).isLength({ max: 40 }),
    check("resumen", "Cuentanos un poco que le pasa a tu mascota.").notEmpty(),
    check(
      "resumen",
      "El resumen no puede tener más de 200 cáracteres."
    ).isLength({ max: 200 }),
    check(
      "profesional",
      "Debe elegir el profesional que atenderé a su mascota."
    ).notEmpty(),
    check("fecha", "La fecha de tu turno es obligatoria.").notEmpty(),
    check("hora", "La hora del turno es obligatoria").notEmpty(),
    check("contacto", "Tu número de teléfono es obligatorio.").notEmpty(),
    check("contacto", "Ingrese un número de teléfono válido.").isNumeric(),
    check("contacto", "Número de teléfono no valido.").isLength({max: 10}),
  ],
  turnoController.crearTurno
);
//traer horarios disponibles
router.get("/horariosdip/:fecha", turnoController.obtenerHorariosDisponibles);
//borrar turno
router.delete("/delete/:id", auth, authrol, turnoController.eliminarTurno);
//obtener TODOS los turnos
router.get("/listadoturnos", auth, authrol, turnoController.obtenerTurnos);
//obtener turnos de un usuario especifico
router.get("/listadoturno/:id", auth, turnoController.obtenerTurnosUsuario);

module.exports = router;
