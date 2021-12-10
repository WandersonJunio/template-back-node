import bodyParser from 'body-parser';
import express from 'express';

import { handleError } from './middlewares/error';
import { router } from './routes/index.router';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', router);
app.use(handleError);

export { app };
