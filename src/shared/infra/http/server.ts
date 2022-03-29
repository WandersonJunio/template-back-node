import { app } from './app';

const serverPort = 3000;

app.listen(serverPort, () => {
  console.log(`Server is running at the port ${serverPort}`);
});
