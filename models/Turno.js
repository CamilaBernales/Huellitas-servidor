const mongoose = require("mongoose");

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

module.exports = mongoose.model("Turno", TurnoSchema);
