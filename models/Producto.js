const mongoose = require("mongoose");

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
  // espromo:{
  //   type:Boolean,
  //   default:false
  // },
  // marca:{
  //   type: String,
  //   required: true
  // },
  tipoproducto:{
    type:String,
    required:true
  }
});
module.exports = mongoose.model("Producto", ProductoSchema);
