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
router.get("/obtenerusuario/:id", auth, authrol, usuarioController.ObtenerUsuario);
router.put("/cambiarrol/:id", auth, authrol, usuarioController.cambiarRol);

module.exports = router;
