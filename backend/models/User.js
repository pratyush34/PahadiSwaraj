import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
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
=======
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, default: '' },
  provider: { type: String, default: 'local' },
  providerId: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
export default User;
