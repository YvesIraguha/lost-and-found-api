import mongoose, { Schema } from 'mongoose';

const LostSchema = new Schema({
  name: 'string',
  description: 'string'
});

const LostItems = mongoose.model('LostItems', LostSchema);

export default LostItems;
