const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-paginate-v2");

const DetallesEnvio = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
  },
  direccion: {
    type: String,
    required: true,
  },
  codigoPostal: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});
const CompraSchema = mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  total: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  detallesEnvio: DetallesEnvio,
  pedido: {
    type: Array,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
});
CompraSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Compra", CompraSchema);
