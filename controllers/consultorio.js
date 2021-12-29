var Consultorio = require('../models/consultorio');
var Cita = require('../models/citas');

function registrar(req,res) {
    var params = req.body;
    const consultorio = new Consultorio(params);

    consultorio.save((err,consultorio_save)=>{
        if (err) {
            res.status(500).send({error: 'No se ingreso el usuario'});
        } else {
            res.status(200).send({data: consultorio_save});
        }
    });
}

function listar(req,res) {
    Consultorio.find({ idCentroSalud: req.params.idCentroSalud })
    .populate({ path: 'idCentroSalud', model: 'centroSalud' })
    .populate({ path: 'idDoctor', model: 'user'})
    .exec((err, consultorio_listado) => {
        if(err){
            console.log(err);
        }
        res.status(200).send(consultorio_listado);
    })
}

async function listarHorarios(req, res) {
    const { horarios, idDoctor } = await Consultorio.findById(req.params.id)
                                         .select({ horarios: 1, idDoctor: 1, _id: 0 })
    const citas = await Cita.find({ fecha: req.params.fecha, idConsultorio: req.params.id })
    
    if (citas.length <= 0) {
        res.status(200).send({data: { horarios, idDoctor } })
        return
    }

    const verificarHorario = (horario, citass) => {
        for (let c of citass) {
            if (c.empieza.toString() === horario.empieza) {
                return false
            }
        }
        return true    
    }
    
    const result = horarios.filter(h => verificarHorario(h, citas))

    res.status(200).send({data: { horarios: result, idDoctor } })    
}

function listarConsultoriosPorDoctorId(req,res) {
    Consultorio.find({ idDoctor: req.params.doctorId })
    .populate({ path: 'idCentroSalud', model: 'centroSalud' })
    .populate({ path: 'idDoctor', model: 'user'})
    .exec((err, consultorio_listado) => {
        if(err){
            console.log(err);
        }
        res.status(200).send(consultorio_listado);
    })
}

function listarConsultorioPorId(req, res) {
    Consultorio.findById(req.params.id)
    .exec((err, consultorio_listado) => {
        if(err){
            console.log(err);
        }
        res.status(200).send(consultorio_listado);
    })
}

function editarConsultorioPorId(req,res) {
    Consultorio.findByIdAndUpdate(req.params.id, req.body, (err, consultorio) => {
        if(err){
            console.log(err);
        }
        res.status(200).send({data: consultorio});
    }) 
}

async function eliminarConsultorioPorId(req, res) {
    await Consultorio.findByIdAndDelete(req.params.id,  (err, consultorios) => {
        if(err) return res.status(500).send(err)
        
        Cita.deleteMany({ idConsultorio: req.params.id })
            .exec((err, result2) => {
                if (err)
                    return res.status(500).send(err);
                return res.status(200).send(true);
        })
    }).clone().catch(function(err){ console.log(err)})
}

module.exports = {
    registrar,
    listar,
    listarHorarios,
    listarConsultoriosPorDoctorId,
    listarConsultorioPorId,
    editarConsultorioPorId,
    eliminarConsultorioPorId
}