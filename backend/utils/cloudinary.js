// backend/utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});

// Function to upload a file (e.g., product image)
const uploadToCloudinary = async (fileBuffer, folderName = 'ecommerce') => {
  try {
    // You might need to adjust this based on how the file buffer is received (e.g., from multer)
    // For direct buffer upload, you might need to convert it to a data URI or pass stream
    // For simplicity, if using multer, you might get a path to a temp file, or stream from memory.
    // Assuming 'fileBuffer' is a path to a local temp file or a base64 string.
    // For a real-world scenario with Multer, you'd likely use `stream_upload` or `uploader.upload(file.path, ...)`.
    // Here, I'm providing a conceptual example.

    // If fileBuffer is a base64 data URI (e.g., 'data:image/jpeg;base64,...')
    // const result = await cloudinary.uploader.upload(fileBuffer, {
    //   folder: folderName,
    // });

    // If fileBuffer is a local file path (e.g., req.file.path from multer disk storage)
    const result = await cloudinary.uploader.upload(fileBuffer, {
      folder: folderName,
    });


    console.log('Cloudinary upload result:', result);
    return {
      public_id: result.public_id,
      url: result.secure_url, // Use secure URL (HTTPS)
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

// Function to delete a file from Cloudinary (optional, but good for cleanup)
const deleteFromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log('Cloudinary delete result:', result);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

export { uploadToCloudinary, deleteFromCloudinary, cloudinary }; // Export cloudinary object for other uses if needed