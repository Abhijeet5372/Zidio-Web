// backend/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Import protect and admin middleware

router.route('/').get(getProducts).post(protect, admin, createProduct); // GET all products, POST new product (admin only)
router.route('/top').get(getTopProducts); // GET top rated products
router
  .route('/:id')
  .get(getProductById) // GET single product
  .put(protect, admin, updateProduct) // PUT update product (admin only)
  .delete(protect, admin, deleteProduct); // DELETE product (admin only)
router.route('/:id/reviews').post(protect, createProductReview); // POST review for a product (logged-in users)

export default router;