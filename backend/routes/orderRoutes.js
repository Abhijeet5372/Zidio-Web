// backend/routes/orderRoutes.js
import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Import protect and admin middleware

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders); // POST create order, GET all orders (admin only)
router.route('/myorders').get(protect, getMyOrders); // GET logged-in user's orders
router.route('/:id').get(protect, getOrderById); // GET single order by ID
router.route('/:id/pay').put(protect, updateOrderToPaid); // PUT update order to paid (logged-in user)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered); // PUT update order to delivered (admin only)

export default router;