// // backend/controllers/uploadController.js
// import path from 'path';
// import express from 'express';
// import multer from 'multer';
// import asyncHandler from '../middleware/asyncHandler.js'; // Assuming you have asyncHandler
// import { protect, admin } from '../middleware/authMiddleware.js'; // Import protect and admin middleware

// const router = express.Router();

// // Configure storage for Multer
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/'); // Uploads will be saved in the 'uploads' folder in the backend root
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// // Check file type
// function fileFilter(req, file, cb) {
//   const filetypes = /jpe?g|png|webp/; // Allowed file extensions
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/; // Allowed MIME types

//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = mimetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Images only!'), false);
//   }
// }

// const upload = multer({ storage, fileFilter });

// // @desc    Upload image
// // @route   POST /api/upload
// // @access  Private/Admin
// router.post(
//   '/',
//   protect, // Assuming you want to protect this route
//   admin,   // Assuming only admins can upload images
//   upload.single('image'),
//   asyncHandler(async (req, res) => {
//     if (req.file) {
//       // Return the path relative to the public folder (or wherever your static files are served)
//       res.send({
//         message: 'Image uploaded successfully',
//         image: `/${req.file.path.replace(/\\/g, '/')}`, // Convert backslashes to forward slashes for URL
//       });
//     } else {
//       res.status(400);
//       throw new Error('No image file provided');
//     }
//   })
// );

// export default router;

// backend/controllers/uploadController.js
import express from 'express';
import multer from 'multer';
import asyncHandler from '../middleware/asyncHandler.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadToCloudinary } from '../utils/cloudinary.js'; // Import Cloudinary utility

// Configure storage for Multer: use memory storage to directly get buffer
const storage = multer.memoryStorage(); // Store files in memory as Buffers

// Check file type
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp|gif/; // Allowed image file extensions
  const mimetypes = /image\/jpe?g|image\/png|image\/webp|image\/gif/; // Allowed MIME types

  if (mimetypes.test(file.mimetype) && filetypes.test(file.originalname.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });

// @desc    Upload image to Cloudinary
// @route   POST /api/upload (handled by uploadRoutes.js)
// @access  Private/Admin
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided');
  }

  // Convert buffer to data URI for Cloudinary upload
  const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

  try {
    const cloudinaryResult = await uploadToCloudinary(dataUri, 'ecom_products'); // 'ecom_products' is the folder in Cloudinary

    res.send({
      message: 'Image uploaded successfully to Cloudinary',
      image: cloudinaryResult.url, // Send back the Cloudinary URL
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500);
    throw new Error('Image upload failed: ' + error.message);
  }
});

export { uploadImage, upload }; // Export both the controller function and the configured multer instance