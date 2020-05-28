const express  = require('express');
const conectarDB = require('./db');

const app = express();

conectarDB();
app.use(express.json({extended: true}));

app.listen(4000, () => {
    console.log('Servidor Funcionando');
})