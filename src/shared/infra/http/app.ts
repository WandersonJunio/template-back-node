import bodyParser from 'body-parser';
import express from 'express';

import { handleError } from './middlewares/error';
import { wsApp } from './middlewares/websocket/vote/index';
import { router } from './routes/index.router';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', router);
app.use(handleError);

let sockets = [];
wsApp.on('connection', function (socket) {
  // Adicionamos cada nova conexão/socket ao array `sockets`
  sockets.push(socket);
  // Quando você receber uma mensagem, enviamos ela para todos os sockets
  socket.on('message', function (msg) {
    sockets.forEach(s => s.send(msg));
  });
  // Quando a conexão de um socket é fechada/disconectada, removemos o socket do array
  socket.on('close', function () {
    sockets = sockets.filter(s => s !== socket);
  });
});

export { app };
