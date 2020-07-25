import morgan from 'morgan';
import express from 'express';
import routes from './routes/lostItems/lostItem.route';
import socialAuthRoutes from './routes/socialAuth/googleAuth';
import emailAuthRoutes from './routes/authentication/auth';
import profileRouter from './routes/profile';
import deleteRouter from './routes/docs/deleteItem';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

/**
 * Routes configurations
 */
app.use('/api/v1/items', routes);
app.use('/api/v1/users', emailAuthRoutes);
app.use('/api/v1/users/auth', socialAuthRoutes);
app.use('/api/v1/users/profile', profileRouter);
app.use('/api/v1/items/delete', deleteRouter);

app.use('*', (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json({
    message: 'You have successfully reached to lostAndFoundAPI. Thanks'
  })
);

export default app;
