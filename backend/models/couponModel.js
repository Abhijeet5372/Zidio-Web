// backend/models/couponModel.js
import mongoose from 'mongoose';

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, // Coupon codes must be unique
      uppercase: true, // Store codes in uppercase
      trim: true,
    },
    discountType: {
      type: String,
      required: true,
      enum: ['percentage', 'fixed'], // 'percentage' or 'fixed' amount
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderAmount: {
      type: Number,
      default: 0, // Minimum order amount for the coupon to be applicable
      min: 0,
    },
    maxDiscountAmount: {
      type: Number,
      default: null, // Maximum discount amount (useful for percentage discounts)
    },
    expiresAt: {
      type: Date,
      default: null, // Date when the coupon expires (null means no expiry)
    },
    isActive: {
      type: Boolean,
      default: true, // Whether the coupon is currently active
    },
    // You could add fields to track usage, e.g.,
    // usageLimit: { type: Number, default: null }, // Max times coupon can be used
    // usedCount: { type: Number, default: 0 }, // How many times it has been used
    // usersUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who used it
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;