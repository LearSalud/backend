var express = require('express');
var consultorioController = require('../controllers/consultorio');

var api = express.Router();

api.post('/consultorio',consultorioController.registrar);
api.get('/consultorio/:idCentroSalud',consultorioController.listar);
api.get('/consultorio/horarios/:id/:fecha',consultorioController.listarHorarios);
api.get('/consultorio/doctor/:doctorId',consultorioController.listarConsultoriosPorDoctorId);
api.get('/consultorio/porId/:id',consultorioController.listarConsultorioPorId);
api.put('/consultorio/:id',consultorioController.editarConsultorioPorId);
api.delete('/consultorio/:id',consultorioController.eliminarConsultorioPorId);

module.exports = api;