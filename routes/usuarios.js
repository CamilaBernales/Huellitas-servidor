const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authrol = require("../middleware/authrol");
//crear usuario
// request a : api/usuarios
router.post(
  "/registro",
  [
    check("nombre", "El nombre es obligatorio.").notEmpty(),
    check("email", "El email es obligatorio.").notEmpty(),
    check("email", "Ingrese un email válido.").isEmail(),
    check("password", "El password es obligatorio.").notEmpty(),
    check("telefono", "Teléfono no válido,.").isNumeric(),
    check(
      "password",
      "El password debe ser de al menos 6 caracteres."
    ).isLength({ min: 6 }),
  ],
  usuarioController.crearUsuario
);
router.get(
  "/listadousuarios",
  auth,
  authrol,
  usuarioController.ObtenerUsuarios
);
router.put("/otorgarpermisos/:id", auth, authrol, usuarioController.cambiarRol);
router.put(
  "/quitarpermisos/:id",
  auth,
  authrol,
  usuarioController.quitarPermisos
);
router.get("/usuarioactual", auth, usuarioController.ObtenerUsuario);
router.put(
  "/updateusuario/:id",
  auth,
  [
    check("nombre", "El nombre es obligatorio.").notEmpty(),
    check("email", "El email es obligatorio.").notEmpty(),
    check("email", "Ingrese un email válido.").isEmail(),
    check("telefono", "Teléfono no válido,.").isNumeric(),
  ],
  usuarioController.updateUsuario
);

module.exports = router;
