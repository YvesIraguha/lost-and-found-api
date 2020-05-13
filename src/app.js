import morgan from 'morgan';
import express from 'express';
import routes from './routes/lostItems/lostItem.route';
import socialAuthRoutes from './routes/socialAuth/googleAuth';
import emailAuthRoutes from './routes/authentication/auth';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

/**
 * Routes configurations
 */
app.use('/api/v1/lost', routes);
app.use('/api/v1/users', emailAuthRoutes);
app.use('/api/v1/users/auth', socialAuthRoutes);

app.use('*', (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json({
    message: 'You have successfully reached to lostAndFoundAPI. Thanks'
  })
);

export default app;
