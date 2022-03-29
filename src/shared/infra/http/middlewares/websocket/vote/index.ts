import { WebSocket } from 'ws';

const wsApp = new WebSocket.Server({
  port: 8081,
});

export { wsApp };
