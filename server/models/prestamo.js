const mongoose = require('mongoose');
const Libro = require('./libro');
const Usuario = require('./usuario');

let Schema = mongoose.Schema;

let PrestamoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Ingresar un usuario, por favor']
    },
    fechaPrestamo: {
        type: String,
        required: [true, 'Ingresar fecha del prestamo del libro, por favor']
    },
    fechaEntrega: {
        type: String,
        required: [true, 'Ingresar fecha de devolucion del libro']
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Ingresar un libro']
    }
});

module.exports = mongoose.model('Prestamo', PrestamoSchema);