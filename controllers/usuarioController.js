const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Crear Usuario
exports.crearUsuario = async (req, res) => {
  // Extraer email y password
  const { email, password, telefono } = req.body;
  try {
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      return res.status(403).json({ msg: "Ingrese un email válido." });
    }
    if (password.length < 6) {
      return res
        .status(403)
        .json({ msg: "La contraseña debe ser de más de seis carácteres." });
    }
    if (telefono!== undefined) {
        let numbervalidation = /^(381)?[0-9]{8,10}/;
      if (
        !telefono.match(numbervalidation) ||
        telefono.length > 10 ||
        telefono.length < 8
      ) {
        return res.status(403).json({ msg: "Numero no válido" });
      }
    }
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res
        .status(400)
        .json({ msg: "El email ingresado ya esta siendo usado." });
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
        expiresIn: 7200,
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

//obtener un usuario
exports.ObtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select(
      "nombre email imagen"
    );
    res.json({ usuario });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

//obtener listado usuarios
exports.ObtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({})
      .select("nombre email rol")
      .sort("rol");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
//cambiar rol de admin a usuario
exports.quitarPermisos = async (req, res) => {
  try {
    const admin = await Usuario.findOneAndUpdate(
      { _id: req.params.id },
      { rol: "usuario" },
      { new: true }
    );
    res.json({ admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};
//cambiar rol de usuario a administrador
exports.cambiarRol = async (req, res) => {
  try {
    const usuario = await Usuario.findOneAndUpdate(
      { _id: req.params.id },
      { rol: "admin" },
      { new: true }
    );
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};
exports.updateUsuario = async (req, res) => {
  const { email, telefono } = req.body;
  try {
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      return res.status(403).json({ msg: "Ingrese un email válido." });
    }
    if (telefono!== undefined) {
      let numbervalidation = /^(381)?[0-9]{8,10}/;
      if (
        !telefono.match(numbervalidation) ||
        telefono.length > 10 ||
        telefono.length < 8
      ) {
        return res.status(403).json({ msg: "Numero no válido" });
      }
    }
    const usuario = await Usuario.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error." });
  }
};
