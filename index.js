const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser");
const logger = require("morgan");
const { dbConnection } = require('./db/config');
require('dotenv').config();
const cron = require('node-cron');
const { envioCorreo } = require('./controllers/correoController');

//para enviar cada minuto '* * * * *'
cron.schedule('* * * * 1-7', () => {
    envioCorreo()
});

// Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(logger("dev"));
// Directorio Público
app.use( express.static('public') );
// CORS
app.use( cors() );
// Lectura y parseo del body
app.use( express.json() );
// Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use("/api", require("./routes/citas"));
app.use("/api", require("./routes/consultorio"));
app.use("/api", require("./routes/centro-salud"));
app.use("/api", require("./routes/correoRoutes"));

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});