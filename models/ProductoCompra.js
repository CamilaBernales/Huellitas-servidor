const mongoose = require("mongoose");

const ProductoCompraSchema = mongoose.Schema({
  compra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compra',
    required: true
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('ProductoCompra', ProductoCompraSchema);