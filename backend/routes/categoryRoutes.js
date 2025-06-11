// backend/routes/categoryRoutes.js
import express from 'express';
const router = express.Router();
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Import protect and admin middleware

router.route('/').get(getCategories).post(protect, admin, createCategory); // GET all categories, POST new category (admin only)
router
  .route('/:id')
  .get(getCategoryById) // GET single category
  .put(protect, admin, updateCategory) // PUT update category (admin only)
  .delete(protect, admin, deleteCategory); // DELETE category (admin only)

export default router;