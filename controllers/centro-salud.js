const CentroSalud = require('../models/centro-salud');
const Citas = require('../models/citas');
const User = require('../models/Usuario');
const Consultorio = require('../models/consultorio');

function registrar(req,res) {
    var params = req.body;
    const centroSalud = new CentroSalud(params);

    centroSalud.save((err, centro_save)=>{
        if (err) {
            res.status(500).send({error: 'No se ingreso el usuario'});
        } else {
            res.status(200).send({data: centro_save});
        }
    });
}
function listar(req,res) {
    CentroSalud.find({},(err, centros_listado) => {
        if (err) throw err;
        res.status(200).send(centros_listado);
    });
}

async function listarCentrosYDoctores(req, res) {
    const centros = await CentroSalud.find({}).select({ _id: 1, nombre: 1  });
    const doctores = await User.find({rol: "DOCTOR"}).select({ _id: 1, name: 1 });
    const data = {
        centros,
        doctores
    }
    res.status(200).send(data);
}

async function eliminarCentroSaludPorId(req, res) {
    await CentroSalud.findByIdAndDelete(req.params.id, async (err, result) => {
        if(err) return res.status(500).send(err)

        let consultorios = await Consultorio.find({ idCentroSalud: req.params.id })
        for (const c of consultorios) {
            Citas.deleteMany({ idConsultorio: c._id })
            .exec((err, result2) => {
                if (err) return res.status(500).send(err);
            });
        }

        Consultorio.deleteMany({ idCentroSalud: req.params.id })
            .exec((err2, resultcount) => {
                if (err) return res.status(500).send(err2);
                return res.status(200).send(true);
            })
        }).clone().catch(function(err){ console.log(err)})
}

module.exports = {
    registrar,
    listar,
    listarCentrosYDoctores,
    eliminarCentroSaludPorId
}