var express = require('express');
var centroController = require('../controllers/centro-salud');

var api = express.Router();

api.post('/centro',centroController.registrar);
api.get('/centro',centroController.listar);
api.get('/centro/centros-doctores',centroController.listarCentrosYDoctores);
api.delete('/centro/:id',centroController.eliminarCentroSaludPorId);

module.exports = api;