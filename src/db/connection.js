import mongoose from 'mongoose';
import config from '../../config/config';

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
  .then(function () {
    console.log('MongoDB is connected');
  })
  .catch(function (err) {
    console.log(err);
  });
