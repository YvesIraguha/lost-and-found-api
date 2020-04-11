import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LostSchema = new Schema({
  name: 'string',
  description: 'string'
});

const LostItems = mongoose.model('LostItems', LostSchema);

export default LostItems;
