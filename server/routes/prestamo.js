const express = require('express');
const _ = require('underscore');
const Prestamo = require('../models/prestamo');
const { verificaToken } = require('../middleware/autenticacion');
const app = express();

app.get('/prestamo', [verificaToken], (req, res) => {
    Prestamo.find()
        .exec((err, prestamo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Ocurrio un error al momento de consultar ${err}`
                });
            }

            res.json({
                ok: false,
                mensaje: 'Consulta realizada con exito',
                prestamo
            });
        });
});

app.post('/prestamo', [verificaToken], (req, res) => {
    let body = req.body;

    let prestamo = new Prestamo({
        usuario: body.usuario,
        fechaPrestamo: body.fechaPrestamo,
        fechaEntrega: body.fechaEntrega,
        libro: body.libro

    });

    prestamo.save((err, prestamoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de guardar ${err}`
            });
        }

        res.json({
            ok: true,
            mensaje: 'El prestamo del libro ha sido insertado con exito',
            prestamo: prestamoDB
        });
    });
});

app.put('/prestamo', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['usuario', 'libro', 'fechaPrestamo', 'fechaEntrega']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, prestamoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de actualizar ${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'Cambios guardados con exito',
            prestamo: prestamoDB
        });
    });
});

app.delete('/prestamo/:id', function(req, res) {
    let id = req.params.id;

    Prestamo.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de eliminar un usuario ${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'Registro borrado con exito',
            resp
        });
    });
});

module.exports = app;