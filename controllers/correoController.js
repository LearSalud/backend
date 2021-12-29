const nodeMailer = require('nodemailer');
const Citas = require('../models/citas')

const envioCorreo = async () => {
    const date = new Date()

    const citas = await Citas.find({ fecha: { $gte: date}})
    .populate({ path: "idUser", model: "user", select: { email: 1, _id: 0, name:1 }})
    .select({ _id: 0, idUser: 1, fecha: 1, empieza: 1, finaliza: 1 })

    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post: 587,
        auth:{
            user: 'appmedk@gmail.com',
            pass: 'appmedk1234'
        }
    });

    const getDateFormat = (fecha) => {
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString("es-HN", dateOptions)
    }

    for (const cita of citas) {
        const message = `Estimado ${cita.idUser.name} este correo es para recordarle que tiene una cita agendada para el dia ${getDateFormat(cita.fecha)}, de ${cita.empieza} a ${cita.finaliza}. Para mas informacion visite el sitio web en la seccion de mis citas`

        const opciones = {
            from: 'appmedk@gmail.com',
            subject: "Recordatorio de cita",
            to: cita.idUser.email,
            text: message
        };

        config.sendMail(opciones,function(error,result) {
            if (error) return console.log(error)
            console.log(result)
        })
    }
    
}

module.exports = {
    envioCorreo
}
