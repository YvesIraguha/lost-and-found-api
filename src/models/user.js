import mongoose from 'mongoose';

const User = mongoose.Schema({
  platform: {
    type: String,
    enum: ['google', 'twitter', 'facebook', 'linkedin', 'email']
  },
  profileId: String,
  username: String,
  firsName: String,
  secondName: String,
  photoUrl: String,
  email: String,
  password: {
    type: String,
    required() { return this.platform === 'email'; }
  },
  date: {
    timestamp: { type: Date, default: undefined }
  }
});

const userSchema = mongoose.model('User', User);

export default userSchema;
