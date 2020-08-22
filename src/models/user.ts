import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  username: String,
  createdAt: String,
  password: String,
});

export default mongoose.model('User', userSchema);
