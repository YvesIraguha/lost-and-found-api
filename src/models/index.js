import mongoose from 'mongoose';
import config from '../../config/config';
import LostItems from './lost';
import User from './user';

const {
  db: { host, port, name }
} = config;
export const url =
  `mongodb://${host}:${port}/${name}?authSource=admin` ||
  config.db.database_url;

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose
  .connect(url, options)
  .then(() => {})
  .catch((err) => {
    throw new Error(err);
  });

export default { LostItems, User };
