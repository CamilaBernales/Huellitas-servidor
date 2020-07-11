const mongoose = require('mongoose')

const MensajeSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    mensaje: {
        type: String,
        require: true,
        trim: true
    },
    created_at:{
        type: String,
    }
    
}) 

module.exports = mongoose.model('Mensaje', MensajeSchema)