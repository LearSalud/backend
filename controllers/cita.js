var Cita = require('../models/citas');

function registrar(req,res) {
    //Variable que verificara si se mandan los datos, por ejemplo: titulo, descripcion o datos de texto
    var data = req.body;
    var cita = new Cita(data);

    //Vamos actualizarlo
    cita.save((err,cita_save)=>{
        if (err) {
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if (cita_save) {
                res.status(200).send({data: cita_save});  
            }else{
                res.status(403).send({message: 'No se registro la cita'});
            }
        }
    });
}

function listarMisCitas(req,res) {
    Cita.find({ idUser: req.params.idUser })
    .populate([
        { 
            path: 'idConsultorio', 
            model: 'Consultorio',
            select: { indicaciones: 1, numeroConsultorio: 1, idCentroSalud: 1, _id: 0 },
            populate: [
                {
                    path: "idCentroSalud",
                    model: 'centroSalud',
                    select: { ubicacion: 1, nombre: 1, _id: 0 }
                },
            ],
        }, 
        {
            path: "idDoctor",
            model: "user",
            select: { _id: 0, name: 1 }
        }
    ])
    .select(
        {
            fecha: 1,
            empieza: 1,
            finaliza: 1,
            idConsultorio: 1,
            idDoctor: 1
        }
    )
    .exec((err, citas_listado) => {
        if (err) throw err
        res.status(200).send(citas_listado)
    })
}

function listarMiAgenda(req, res) {
    const date = new Date(req.params.date)
    const lteDate = new Date(date).setHours(date.getHours() + 17)
    
    Cita.find({ idDoctor: req.params.idDoctor, fecha: { 
        $gte: req.params.date, $lte: lteDate
    }})
    .populate([
        { 
            path: 'idConsultorio', 
            model: 'Consultorio',
            select: { indicaciones: 1, numeroConsultorio: 1, idCentroSalud: 1, _id: 0 },
            populate: [
                {
                    path: "idCentroSalud",
                    model: 'centroSalud',
                    select: { ubicacion: 1, nombre: 1, _id: 0 }
                },
            ],
        },
        {
            path: "idUser",
            model: "user",
            select: { _id: 0, name: 1 }
        }
    ])
    .select({
        fecha: 1,
        tipo: 1,
        empieza: 1,
        finaliza: 1,
        idConsultorio: 1
    })
    .exec((err, citas_listado) => {
        if (err) throw err
        res.status(200).send(citas_listado)
    })
}

function obtener_cita(req,res) {
    //Vamos a capturar que estamos pasando por la ruta
    var id = req.params['id'];
    
    //Hacemos una consulta
    Cita.findById({_id: id},(err,cita_data)=>{
        if (err) {
            res.status(500).send({message: 'Server Error'});
        } else {
            if (cita_data) {
                res.status(200).send({cita: cita_data});
            }
            else{
                res.status(403).send({message: 'El registro no existe'});
            }
        }
    });
}

function editar(req,res) {
    var id = req.params['id'];
    var data = req.body;
    //Hacer una consulta para actualizar
    Cita.findByIdAndUpdate({_id:id},{observacion: data.observacion, email: data.email ,idUser: data.idUser},(err,cita_edit)=>{
        if (err) {
            res.status(500).send({message: 'Server Error'});
        }  else {
            if (cita_edit) {
                res.status(200).send({actividad: cita_edit});
            }
            else{
                res.status(403).send({message: 'La cita no se pudo actualizar'});
            }
        }
    });
}

function eliminar(req,res) {
    var id = req.params['id'];

    //Hacemos una consulta para eliminar
    Cita.findByIdAndRemove({_id:id},(err,cita_delete)=>{
        if (err) {
            res.status(500).send({message: 'Server Error'});
        }else{
            if (cita_delete) {
                res.status(200).send({cita: cita_delete});
            }else{
                res.status(403).send({message: 'No se pudo eliminar el registro'});
            }
        }
    });
}

module.exports = {
    registrar,
    listarMisCitas,
    listarMiAgenda,
    editar,
    obtener_cita,
    eliminar
}