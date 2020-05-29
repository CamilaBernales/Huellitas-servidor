const mongoose = require('mongoose');

const TurnoSchema = mongoose.Schema({
    nombremascota:{
        type: String,
        required: true,
        trim: true
    },
    edad:{
        type: Number,
        required: true
    },
    raza:{
        type: String,
        required: true,
        trim: true
    },
    particularidades:{
        type: String,
        required: false,
        trim: true
    },
    profesional:{
        type: String,
        required: true,
        trim: true
    },
    dueño:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Usuario'
    },
    fecha:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Turno', TurnoSchema);