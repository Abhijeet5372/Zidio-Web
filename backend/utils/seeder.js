// backend/utils/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'; // For colorful console output

// Corrected relative paths for data files
import users from '../data/users.js';
import products from '../data/products.js';
import categoriesData from '../data/categories.js';
import couponsData from '../data/coupons.js';

// Corrected relative paths for models
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import Category from '../models/categoryModel.js';
import Coupon from '../models/couponModel.js';

// Corrected relative path for db.js
import connectDB from '../config/db.js';

dotenv.config();

connectDB(); // Connect to the database

const importData = async () => {
  try {
    // Clear existing data in reverse order of dependency
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany(); // Clear categories
    await Coupon.deleteMany();   // Clear coupons

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id; // First user in data/users.js is admin

    // Insert categories first, so we can get their IDs
    const createdCategories = await Category.insertMany(categoriesData);
    const categoryMap = createdCategories.reduce((map, category) => {
      map[category.name] = category._id; // Map category name to its ObjectId
      return map;
    }, {});

    // Prepare products with admin user and correct category IDs
    const sampleProducts = products.map((product) => {
      // Find the correct category ID using the mapped name
      const categoryId = categoryMap[product.category];
      if (!categoryId) {
        console.warn(`Category "${product.category}" not found for product "${product.name}". Skipping this product.`);
        return null; // Skip products with missing categories
      }
      return {
        ...product,
        user: adminUser,
        category: categoryId, // Assign the actual ObjectId
      };
    }).filter(Boolean); // Remove any null entries from skipping

    // Insert products
    if (sampleProducts.length > 0) {
      await Product.insertMany(sampleProducts);
    } else {
      console.log('No products to import after category mapping.'.yellow);
    }

    // Insert coupons
    await Coupon.insertMany(couponsData);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    await Coupon.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Check command line arguments to determine import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}