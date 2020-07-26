const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({
      email,
    });
    if (!usuario) {
      return res.status(403).json({
        msg: "El usuario no existe.",
      });
    }
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      return res.status(403).json({ msg: "Ingrese un email válido." });
    }
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(403).json({
        msg: "Contraseña no válida.",
      });
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
        expiresIn: '365d',
      },
      (error, token) => {
        if (error) throw error;
        usuario.password = undefined;
        res.status(200).json({
          token,
          usuario,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error.",
    });
  }
};
//obtiene que tipo de usuario es
exports.isAdmin = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario.rol.match("admin")) {
      return res.json({
        validToken: true,
        isAdmin: false,
      });
    } else {
      return res.json({
        validToken: true,
        isAdmin: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error.",
    });
  }
};
