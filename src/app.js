import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import routes from './routes/items';
import socialAuthRoutes from './routes/googleAuth';
import emailAuthRoutes from './routes/auth';
import profileRouter from './routes/profile';
import searchRouter from './routes/searchDoc/search';
import i18n from './helpers/i18n';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(i18n.init);

/**
 * Routes configurations
 */
app.use('/api/v1/items', routes);
app.use('/api/v1/users', emailAuthRoutes);
app.use('/api/v1/users/auth', socialAuthRoutes);
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/items/search', searchRouter);

app.use('*', (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json({
    message: 'You have successfully reached to lostAndFoundAPI. Thanks'
  })
);

export default app;
