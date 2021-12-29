//Variable para inicializar express
var express = require('express');

//Variable para requerir el controlador user
var citaController = require('../controllers/cita');

//Vamos a crear esta variable e igualarla a express y usaremos el enrutado de express
var api = express.Router();

api.post('/cita',citaController.registrar);
api.get('/citas/doctor/:idDoctor/:date', citaController.listarMiAgenda);
api.get('/citas/user/:idUser', citaController.listarMisCitas);
api.get('/cita/:id',citaController.obtener_cita);
api.put('/cita/:id',citaController.editar);
api.delete('/cita/:id',citaController.eliminar);

module.exports = api;