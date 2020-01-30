const express = require('express');
const http = require('http')
const cors = require('cors');
const {setupWebsocket} = require('./websocket')

// Inicia o App
const app = express();

// Criando Server
const server = http.Server(app); 
setupWebsocket(server);

// Liberar Api
app.use(cors());

// Usar Json
app.use(express.json());

// Envia o App pra todos as rotas 
require('./App/routes/index')(app);

// Porta da Api
server.listen(process.env.PORT || 3333);
