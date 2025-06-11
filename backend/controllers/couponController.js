// backend/controllers/couponController.js
import asyncHandler from '../middleware/asyncHandler.js';
import Coupon from '../models/couponModel.js';

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({});
  res.json(coupons);
});

// @desc    Get coupon by ID
// @route   GET /api/coupons/:id
// @access  Private/Admin
const getCouponById = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    res.json(coupon);
  } else {
    res.status(404);
    throw new Error('Coupon not found');
  }
});

// @desc    Create a coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
  const { code, discountType, discountValue, minOrderAmount, maxDiscountAmount, expiresAt } = req.body;

  const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
  if (couponExists) {
    res.status(400);
    throw new Error('Coupon with this code already exists');
  }

  const coupon = new Coupon({
    code: code.toUpperCase(),
    discountType,
    discountValue,
    minOrderAmount: minOrderAmount || 0,
    maxDiscountAmount: maxDiscountAmount || (discountType === 'percentage' ? discountValue : 0), // Default for percentage if not provided
    expiresAt: expiresAt || null, // Allow null for no expiry
    isActive: true,
  });

  const createdCoupon = await coupon.save();
  res.status(201).json(createdCoupon);
});

// @desc    Update a coupon
// @route   PUT /api/coupons/:id
// @access  Private/Admin
const updateCoupon = asyncHandler(async (req, res) => {
  const { code, discountType, discountValue, minOrderAmount, maxDiscountAmount, expiresAt, isActive } = req.body;

  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    // Check if new code already exists and is not the current coupon's code
    if (code && code.toUpperCase() !== coupon.code) {
      const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
      if (couponExists) {
        res.status(400);
        throw new Error('Coupon with this code already exists');
      }
    }

    coupon.code = code ? code.toUpperCase() : coupon.code;
    coupon.discountType = discountType || coupon.discountType;
    coupon.discountValue = discountValue !== undefined ? discountValue : coupon.discountValue;
    coupon.minOrderAmount = minOrderAmount !== undefined ? minOrderAmount : coupon.minOrderAmount;
    coupon.maxDiscountAmount = maxDiscountAmount !== undefined ? maxDiscountAmount : coupon.maxDiscountAmount;
    coupon.expiresAt = expiresAt !== undefined ? expiresAt : coupon.expiresAt;
    coupon.isActive = isActive !== undefined ? isActive : coupon.isActive;

    const updatedCoupon = await coupon.save();
    res.json(updatedCoupon);
  } else {
    res.status(404);
    throw new Error('Coupon not found');
  }
});

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    await Coupon.deleteOne({ _id: coupon._id });
    res.json({ message: 'Coupon removed' });
  } else {
    res.status(404);
    throw new Error('Coupon not found');
  }
});

// @desc    Apply coupon to an amount
// @route   POST /api/coupons/apply
// @access  Public (or Private if you want only logged-in users to apply)
const applyCoupon = asyncHandler(async (req, res) => {
  const { code, amount } = req.body;

  if (!code || !amount) {
    res.status(400);
    throw new Error('Coupon code and amount are required');
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (!coupon) {
    res.status(404);
    throw new Error('Invalid or expired coupon code');
  }

  if (!coupon.isActive) {
    res.status(400);
    throw new Error('Coupon is inactive');
  }

  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    res.status(400);
    throw new Error('Coupon has expired');
  }

  if (amount < coupon.minOrderAmount) {
    res.status(400);
    throw new Error(`Minimum order amount for this coupon is $${coupon.minOrderAmount}`);
  }

  let discountAmount = 0;
  let newTotal = amount;

  if (coupon.discountType === 'percentage') {
    discountAmount = (amount * coupon.discountValue) / 100;
    if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
      discountAmount = coupon.maxDiscountAmount;
    }
  } else if (coupon.discountType === 'fixed') {
    discountAmount = coupon.discountValue;
  }

  newTotal = amount - discountAmount;
  if (newTotal < 0) newTotal = 0; // Ensure total doesn't go negative

  res.json({
    message: 'Coupon applied successfully',
    couponCode: coupon.code,
    discountApplied: discountAmount,
    newTotal: newTotal,
  });
});

export {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};