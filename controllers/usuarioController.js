const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// Crear Usuario
exports.crearUsuario = async (req, res) => {
  // Validación de campos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Extraer email y password
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El email ingresado ya esta usado." });
    }

    // Creamos el usuario
    usuario = new Usuario(req.body);

    // Hashear password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    // Guardamos el usuario en la BD
    await usuario.save();

    //payload
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
        res.json({ msg: "Usuario creado correctamente", token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
