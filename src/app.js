import morgan from 'morgan';
import express from 'express';
import dbConnection from './db/connection';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

/**
 * Routes configurations
 */
app.use('/api/v1/lost', routes);
app.use('*', (req, res) =>
  res.status(200).json({
    message: 'You have successfully reached to lostAndFoundAPI. Thanks'
  })
);

export default app;
