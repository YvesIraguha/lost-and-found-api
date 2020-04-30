import mongoose from 'mongoose';
import config from '../../config/config';

export default () => {
  const {
    db: { host, port, name }
  } = config;
  const url =
    `mongodb://${host}:${port}/${name}?authSource=admin` ||
    config.db.database_url;

  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    (err) => {
     if (err) throw err;
    
    }
  );
};
