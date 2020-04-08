import morgan from 'morgan';
import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './db/connection';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

/**
 * Routes configurations
 */
app.use('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the lost and found api' });
});

const port = process.env.PORT || 3000;

dbConnection();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Our app is running on http://localhost:${port}/ ....🚀....`);
});
