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
      //cuando el usuario quiera un turno
      if (
        req.path === "turnos/alta" ||
        req.path === "turnos/listadoturno/:id"
      ) {
        //metodo: quiero un turno => post un turno ; o quiero ver mis turnos => dame mis turnos
        console.log("soy un if que no anda :(");
        //tomo el id del dueño del animal
        req.usuario = req.decoded.id;
        //ejecuto lo del controller
        next();
      }
      //el path es diferente
      else {
        //valida que soy admin y puedo crear, borrar o actualizar algo
        if (decoded.usuario.rol === "admin") {
          //ejecuta lo del controller
          next();
        } else {
          //la ruta es otra pero no soy admin
          res.status(401).json({ msg: "Permiso no válido." });
          next();
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no válido." });
  }
};
