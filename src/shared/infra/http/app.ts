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
  console.log('Socket connected');
  sockets.push(socket);

  socket.on('message', function (msg) {
    console.log(JSON.stringify(msg.toString()));
    sockets.forEach(s => {
      s.send(JSON.stringify(msg.toString()));
    });
  });

  socket.on('close', function () {
    console.log('Connection closed');
    sockets = sockets.filter(s => s !== socket);
  });
});

export { app };
