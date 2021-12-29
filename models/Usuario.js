const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        require: true
    },
    fechaCreacion: {
        type: Date, 
        default: Date.now
    }
});

module.exports = model('user', UsuarioSchema ); 