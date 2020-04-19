import morgan from 'morgan';
import express from 'express';

import config from '../config/config';
import router from './controllers/controller';
import dbConnection from './db/connection';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

/**
 * Routes configurations
 */
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the lost and found api' });
});

app.use('/lostAndFound', router);

const { port } = config.app;

dbConnection();

module.exports = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Our app is running on http://localhost:${port}/ ....🚀....`);
});
