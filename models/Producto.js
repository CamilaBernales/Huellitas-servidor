const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-paginate-v2");
const ProductoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  disponibilidad: {
    type: String,
    required: true,
    default: "Disponible",
  },
  imagen: {
    type: String,
    required: true,
  },
  tipoproducto: {
    type: String,
    required: true,
  },
});
ProductoSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Producto", ProductoSchema);
