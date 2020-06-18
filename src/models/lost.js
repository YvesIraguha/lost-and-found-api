import mongoose, { Schema } from 'mongoose';

const LostSchema = new Schema({
  documentName: {
    type: String,
    required: true
  },
  documentNumber: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    isFound: Boolean,
    isLost: Boolean
  },
  lostPlace: {
    sector: String,
    district: String
  },
  foundPlace: {
    sector: String,
    district: String
  },
  isRewarded: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required() { return this.isRewarded; }
  },
  date: {
    type: Date,
    default: new Date()
  }
});

const document = mongoose.model('LostItems', LostSchema);

export default document;
