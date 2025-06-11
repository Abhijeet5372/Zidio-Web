// backend/routes/couponRoutes.js
import express from 'express';
const router = express.Router();
import {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} from '../controllers/couponController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Import protect and admin middleware

router.route('/').get(protect, admin, getCoupons).post(protect, admin, createCoupon); // GET all coupons (admin only), POST new coupon (admin only)
router.post('/apply', applyCoupon); // POST apply coupon to an amount (public or protected based on preference)
router
  .route('/:id')
  .get(protect, admin, getCouponById) // GET single coupon by ID (admin only)
  .put(protect, admin, updateCoupon) // PUT update coupon (admin only)
  .delete(protect, admin, deleteCoupon); // DELETE coupon (admin only)

export default router;