import mongoose, { Schema } from 'mongoose';

const LostSchema = new Schema({
  documentTitle: {
    type: String,
    required: true
  },
  documentID: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  foundsBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['lost', 'found', 'delivered']
  },
  location: {
    sector: String,
    district: String
  },
  reward: {
    type: Number
  },
  date: {
    type: Date,
    default: new Date()
  }
});

LostSchema.index({ '$**': 'text' });

const document = mongoose.model('LostItems', LostSchema);

export default document;
