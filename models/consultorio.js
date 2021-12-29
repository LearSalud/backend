var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Crear un modelo para el esquema 
//Atributos de la tabla
var ConsultorioSchema = new Schema({
    idCentroSalud: { type: Schema.Types.ObjectId, ref: 'centroSalud'} ,
    horarios: [Schema.Types.Mixed],
    indicaciones: { type: String },
    numeroConsultorio: { type: Number },
    idDoctor: { type: Schema.Types.ObjectId, ref: 'user'}    
});

//Exportacion de modulos
module.exports = mongoose.model('Consultorio',ConsultorioSchema);