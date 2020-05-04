import morgan from 'morgan';
import express from 'express';
import routes from './routes/lostItem.route';
import userRoutes from './routes/user.route';
import passport from 'passport';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(passport.initialize());

/**
 * Routes configurations
 */
app.use('/api/v1/lost', routes);
app.use('/api/v1/users', userRoutes);
app.use('*', (req, res) =>
  res.status(200).json({
    message: 'You have successfully reached to lostAndFoundAPI. Thanks'
  })
);

export default app;
