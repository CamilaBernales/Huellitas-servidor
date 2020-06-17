const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(403).json({ msg: "El usuario no existe." });
    }
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(403).json({ msg: "Hubo un error" });
    }
    const payload = {
      usuario: {
        id: usuario.id,
        rol: usuario.rol,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
//obtiene que tipo de usuario es
exports.isAdmin = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario.rol.match("admin")) {
      return res.status(403).json({ validToken: true, isAdmin: false });
    } else {
      return res.json({ validToken: true, isAdmin: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};
