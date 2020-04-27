import mongoose, { Schema } from 'mongoose';
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
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    throw new Error(err);
  });

const LostSchema = new Schema({
  name: 'string',
  description: 'string'
});

const LostItems = mongoose.model('LostItems', LostSchema);

export default LostItems;
