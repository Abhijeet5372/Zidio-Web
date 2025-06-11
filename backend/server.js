// backend/server.js
import path from 'path'; // Node.js path module
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'; // For colorful console output
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // As it exports a router directly
import paymentRoutes from './routes/paymentRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import couponRoutes from './routes/couponRoutes.js';

dotenv.config(); // Load environment variables

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json()); // For raw JSON
app.use(express.urlencoded({ extended: true })); // For URL-encoded data

// Cookie parser middleware
app.use(cookieParser());

// Route definitions
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes); // Use the upload router directly
app.use('/api/config', paymentRoutes); // For PayPal/Stripe client ID
app.use('/api/categories', categoryRoutes);
app.use('/api/coupons', couponRoutes);

// Serve static files (e.g., uploaded images)
const __dirname = path.resolve(); // Get the current directory name
// Create the uploads folder if it doesn't exist (for local storage fallback/development)
// if (process.env.NODE_ENV !== 'production') {
//   const uploadsDir = path.join(__dirname, '/uploads');
//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
//   }
// }
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // Set static folder for frontend build
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // Any route that is not API will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  // Development mode
  app.get('/api', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);