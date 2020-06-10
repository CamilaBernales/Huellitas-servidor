const mongoose = require("mongoose");

const CompraSchema = mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
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
module.exports = mongoose.model("Compra", CompraSchema);