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
    check("edad", "La edad de tu mascota es obligatoria.").notEmpty(),
    check("raza", "La raza de tu mascota es obligatoria.").notEmpty(),
    check("resumen", "Cuentanos un poco que le pasa a tu mascota.").notEmpty(),
    check(
      "profesional",
      "Debe elegir el profesional que atenderé a su mascota."
    ).notEmpty(),
    check("fecha", "La fecha de tu turno es obligatoria.").notEmpty(),
  ],
  turnoController.crearTurno
);
//traer horarios disponibles
router.get('/horariosdip/:fecha',
  turnoController.obtenerHorariosDisponibles
);
//borrar turno
router.delete("/delete/:id", auth, authrol, turnoController.eliminarTurno);
//obtener TODOS los turnos
router.get("/listadoturnos", auth, authrol, turnoController.obtenerTurnos);
//obtener turnos de un usuario especifico
router.get("/listadoturno/:id", auth, turnoController.obtenerTurnosUsuario);

module.exports = router;
