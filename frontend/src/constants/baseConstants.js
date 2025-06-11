// frontend/src/constants/baseConstants.js

// This URL will be used for all API calls.
// In development, it points to your local backend.
// In production, it should point to your deployed backend.
export const BASE_URL = import.meta.env.VITE_BASE_URL || ''; // Use Vite's env variable for flexibility
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOAD_URL = '/api/upload';
export const CATEGORY_URL = '/api/categories';
export const COUPON_URL = '/api/coupons';