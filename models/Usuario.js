const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-paginate-v2");
const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  rol: {
    type: String,
    required: true,
    default: "usuario",
  },
  imagen: {
    type: String,
    default : 'https://www.ganaderia.com/img/default.jpg'
  },
  telefono:{
    type: Number
  }
});
UsuarioSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Usuario", UsuarioSchema);
