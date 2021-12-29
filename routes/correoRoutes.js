var express = require('express');
var envio = require('../controllers/correoController');

var api = express.Router();

api.post('/envio',envio.envioCorreo);

module.exports = api;