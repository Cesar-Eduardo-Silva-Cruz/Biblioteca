const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese su nombre, por favor']
    },
    apellido: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: [true, 'Ingrese una contraseña, por favor']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Ingrese su email, por favor']
    },
    img: {
        type: String,
    }

});

usuarioSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe que ser único'
});

module.exports = mongoose.model('Usuario', usuarioSchema);