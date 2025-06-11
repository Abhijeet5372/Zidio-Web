// backend/models/userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    // You can add more fields here like avatar, addresses array, etc.
    // avatar: {
    //   type: String,
    // },
    // addresses: [
    //   {
    //     address: { type: String },
    //     city: { type: String },
    //     postalCode: { type: String },
    //     country: { type: String },
    //     isDefault: { type: Boolean, default: false },
    //   },
    // ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next(); // If password is not modified, move to next middleware
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;