const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray')

const connections = [];
const techsArray = [];

exports.setupWebsocket = (server) => {
  const io = socketio(server);

  io.on('connection', socket => {
    const { techs } = socket.handshake.query;

    if(techs){
      techsArray = parseStringAsArray(techs);
    }

    connections.push({
      id: socket.id,
      techs: techsArray
    });

  })
};

exports.findConnections = (techs) => {
  return connections.filter(connection => {
    return connection.techs.some( item => {
      techs.includes(item)
    })
  })
}