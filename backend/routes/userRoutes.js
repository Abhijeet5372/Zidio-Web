// backend/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Import protect and admin middleware

router.route('/').post(registerUser).get(protect, admin, getUsers); // POST register user, GET all users (admin only)
router.post('/logout', logoutUser); // POST logout user
router.post('/auth', authUser); // POST authenticate user
router
  .route('/profile')
  .get(protect, getUserProfile) // GET user profile (logged-in user)
  .put(protect, updateUserProfile); // PUT update user profile (logged-in user)
router
  .route('/:id')
  .delete(protect, admin, deleteUser) // DELETE user (admin only)
  .get(protect, admin, getUserById) // GET user by ID (admin only)
  .put(protect, admin, updateUser); // PUT update user by ID (admin only)

export default router;