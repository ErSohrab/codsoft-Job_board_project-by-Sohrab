const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 8,
    select: false, // Don't send password in query results by default
  },
  role: {
    type: String,
    enum: ['candidate', 'employer'],
    default: 'candidate',
  },
  company: {
    type: String,
    // Required only if the role is 'employer'
    required: [
      function () {
        return this.role === 'employer';
      },
      'Company name is required for employers.',
    ],
  },
});

// --- Mongoose Middleware ---

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only run if password was modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// --- Mongoose Instance Methods ---

// Method to check if entered password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;