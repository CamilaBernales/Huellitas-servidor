const express  = require('express');
const conectarDB = require('./db');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//puerto
const PORT = process.env.PORT || 4000;
//conectar bd
app.use(cors());
conectarDB();
//middlewares
app.use(morgan('dev'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/turnos', require('./routes/turnos'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/compra', require('./routes/compra'));
app.use('/api/mensajes', require('./routes/mensajes'));

app.listen(PORT, () => {
//arrancar servidor
    console.log(`Servidor Funcionando en puerto ${PORT}`);
})