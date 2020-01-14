const express = require('express');
const cors = require('cors');

// Inicia o App
const app = express();

// Liberar Api
app.use(cors());

// Usar Json
app.use(express.json());

// Envia o App pra todos as rotas 
require('./App/routes/index')(app);

// Porta da Api
app.listen(process.env.PORT || 3333);
