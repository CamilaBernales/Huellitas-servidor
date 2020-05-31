const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");

router.post(
  "/login",
  [
    check("email", "Ingrese un email valido").isEmail()
  ],
  authController.autenticarUsuario
);
module.exports = router;