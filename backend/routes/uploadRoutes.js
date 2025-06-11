// backend/routes/uploadRoutes.js
import express from 'express';
const router = express.Router();
import { uploadImage, upload } from '../controllers/uploadController.js'; // Import both
import { protect, admin } from '../middleware/authMiddleware.js';

// Route for image upload
router.post('/', protect, admin, upload.single('image'), uploadImage);

export default router;