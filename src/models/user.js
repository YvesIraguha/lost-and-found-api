import mongoose from 'mongoose';

const User = mongoose.Schema({
  platform: {
    type: String,
    enum: ['google', 'twitter', 'facebook', 'linkedin', 'email']
  },
  profileId: String,
  displayName: String,
  givenName: String,
  familyName: String,
  photoUrl: String,
  email: String,
  lastLogin: {
    timestamp: { type: Date, default: undefined }
  }
});

const userSchema = mongoose.model('User', User);

export default userSchema;
