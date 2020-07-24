const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const jwtDecode = require("jwt-decode");
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
    if (telefono !== "" && telefono !== undefined && telefono !== null) {
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
      (error) => {
        if (error) throw error;
        res.json({ msg: "Usuario creado correctamente" });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
exports.sendEmail = function (req, res) {
  const { email } = req.body;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "HuellitasVeterinariaSMT@gmail.com",
      pass: "Huellitas1234",
    },
  });
  let mailOptions = {
    from: "HuellitasVeterinariaSMT@gmail.com",
    to: email,
    subject: "Usuario creado con éxito",
    text: "Te damos la bienvenida a Veterinaria Huellitas!",
  };
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      res.send(500, error.msg);
    } else {
      res.status(200).jsonp(req.body);
    }
  });
};
//obtener un usuario
exports.ObtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select(
      "nombre email imagen telefono"
    );
    res.json({ usuario });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

//obtener listado usuarios
exports.ObtenerUsuarios = async (req, res) => {
  try {
    const { pagina } = req.query;
    const options = {
      page: pagina,
      limit: 10,
      select: "nombre email rol",
      sort: "rol",
    };
    const usuarios = await Usuario.paginate({}, options);
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
    res.status(500).json({ msg: "Hubo un error." });
  }
};
exports.updateUsuario = async (req, res) => {
  const { email, telefono } = req.body;
  try {
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      return res.status(403).json({ msg: "Ingrese un email válido." });
    }
    if (telefono !== "" && telefono !== undefined && telefono !== null) {
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
    res.status(500).json({ msg: "Hubo un error." });
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let usuario = await Usuario.findOne({ email }).select("email");
    if (usuario) {
      res.status(200).json({ usuario });
    } else {
      return res.status(403).json({ msg: "Email no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
exports.sendEmailResetPassword = async (req, res) => {
  const { email } = req.body;
  let usuarioID = await Usuario.findOne({ email }).select("_id");
  if (!usuarioID) {
    return res.status(403).json({ msg: "Este correo no encontrado. " });
  }
  const payload = {
    id: usuarioID._id,
  };
  let encrypted_id = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 3600,
  });
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "HuellitasVeterinariaSMT@gmail.com",
      pass: "Huellitas1234",
    },
  });
  let mailOptions = {
    from: "HuellitasVeterinariaSMT@gmail.com",
    to: email,
    subject: "Restablecer tu contraseña",
    html: `  
    <h3>Has indicado que olvidaste tu contraseña. Si es así, haz clic aquí para crear una nueva:</h3>  
    <a href="http://localhost:3000/resettingpassword/${encrypted_id}"><button>Crea una nueva contraseña</button></a>
    <p>Si no querías restablecer tu contraseña, puedes ignorar este correo. La contraseña no se cambiará.</p>
    `,
  };
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      res.status(500).send(error.msg);
    } else {
      res.status(200).jsonp(req.body);
    }
  });
};

exports.resettingPassword = async (req, res) => {
  const { id, password } = req.body;
  var decoded = jwtDecode(id);
  try {
    let usuario = await Usuario.findById(decoded.id);
    if (usuario) {
      res.status(200).json({ usuario });
      const salt = await bcryptjs.genSalt(10);
      let nuevaContraseña = await bcryptjs.hash(password, salt);
      usuario.password = nuevaContraseña;
      await usuario.save();
    } else {
      return res.status(400).json({ msg: "Email no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error." });
  }
};
