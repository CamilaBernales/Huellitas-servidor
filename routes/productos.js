const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authrol = require("../middleware/authrol");
router.post(
  "/alta",
  auth,
  authrol,
  [
    check("nombre", "El nombre del producto es obligatorio.").notEmpty(),
    check("stock", "La cantidad de stock es obligatoria.").notEmpty(),
    check("precio", "El precio del producto es obligatorio.").notEmpty(),
    check("descuento", "El descuento del producto es obligatorio.").notEmpty(),
    check("imagen", "La imagen del producto es obligatoria.").notEmpty(),
  ],
  productoController.crearProducto
);
//actualizar producto
router.put("/update/:id", auth, authrol, productoController.updateProducto);
//borrar producto
router.delete(
  "/delete/:id",
  auth,
  authrol,
  productoController.eliminarProducto
);
//obtener TODOS los productos
router.get("/listado", auth, productoController.obtenerProductos);

module.exports = router;
