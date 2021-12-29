var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Crear un modelo para el esquema 
//Atributos de la tabla
var CentroSaludSchema = new Schema({
    ubicacion: { type: String },
    empieza: { type: Number },
    finaliza: { type: Number },
    nombre: { type: String }    
});

//Exportacion de modulos
module.exports = mongoose.model('centroSalud', CentroSaludSchema);