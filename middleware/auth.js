const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No hay token. Permiso no válido." });
  }
  try {
    jwt.verify(token, process.env.SECRET, function (error, decoded) {
      if (error) {
        return res.status(403).send({
          msg: "Permiso no válido",
          error,
        });
      }
      if (req.method != "POST" || req.method != "GET") {
        if (decoded.usuario.rol === "admin") {
          next();
        } else {
          // console.log(decoded.usuario.rol)
          return res.status(403).send({
            msg: "Permiso no válido",
          });
        }
      } else {
        req.usuario = decoded.usuario;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no válido." });
  }
};
