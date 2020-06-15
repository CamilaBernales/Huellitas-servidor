const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth =  require ('../middleware/auth');
router.post(
  "/login",
  [check("email", "Ingrese un email valido").isEmail()],
  authController.autenticarUsuario
);
router.get("/uservalidation",auth,authController.isAdmin);
module.exports = router;
