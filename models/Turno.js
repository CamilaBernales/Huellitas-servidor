const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-paginate-v2");


const TurnoSchema = mongoose.Schema({
  nombremascota: {
    type: String,
    required: true,
    trim: true,
  },
  edad: {
    type: Number,
    required: false,
  },
  raza: {
    type: String,
    required: false,
    trim: true,
  },
  particularidades: {
    type: String,
    required: false,
    trim: true,
  },
  resumen: {
    type: String,
    required: true,
    trim: true,
  },
  dueño: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  fecha: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
});
TurnoSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Turno", TurnoSchema);
