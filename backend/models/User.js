import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    default: ''
  },
  passwordHash: {
    type: String,
    default: null
  },
  provider: {
    type: String,
    enum: ['local', 'google', 'github'],
    default: 'local'
  },
  providerId: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
