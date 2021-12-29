var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Crear un modelo para el esquema 
//Atributos de la tabla
var CitaSchema = new Schema({
    tipo: { type: String, default: "normal" },
    fecha: { type: Date, required: true },
    empieza: { type: Number, required: true  },
    finaliza: { type: Number, required: true  },
    idUser: { type: Schema.Types.ObjectId, ref: 'user'} ,
    idDoctor: { type: Schema.Types.ObjectId, ref: 'user'} ,
    idConsultorio: { type: Schema.Types.ObjectId, ref: "Consultorio" }    
});

//Exportacion de modulos
module.exports = mongoose.model('Cita',CitaSchema);