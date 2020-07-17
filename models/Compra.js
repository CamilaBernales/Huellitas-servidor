const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-paginate-v2");

const CompraSchema = mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  codigoPostal: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now(),
    required: true
  },
  total: {
    type: Number,
    required: true
  }
  
});
CompraSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Compra", CompraSchema);