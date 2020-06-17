const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  const cifrado = jwt.verify(token, process.env.SECRET);
  if (cifrado.usuario.rol === "admin") {
    next();
  } else {
    res.status(401).json({ msg: "Permiso no válido." });
  }
};
