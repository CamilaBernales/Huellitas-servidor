const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Permiso no valido" });
  }
  //validar token
  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Permiso no válido." });
  }
};
