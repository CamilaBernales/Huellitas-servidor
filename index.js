const express  = require('express');
const conectarDB = require('./db');
const morgan = require('morgan');

const app = express();

//puerto
const PORT = process.env.PORT || 4000;
//conectar bd
conectarDB();
//middlewares
app.use(morgan('dev'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));

//arrancar servidor
app.listen(PORT, () => {
    console.log('Servidor Funcionando');
})