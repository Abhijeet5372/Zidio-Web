// backend/data/coupons.js
const coupons = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 50,
    expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Expires 1 year from now
    isActive: true,
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 10, // Represents free shipping up to $10, or simply fixed $10 off if shipping is $10
    minOrderAmount: 75,
    expiresAt: null, // No expiry
    isActive: true,
  },
  {
    code: 'SUMMER20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 100,
    maxDiscountAmount: 25, // Max discount of $25
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 30)), // Expires in 30 days
    isActive: true,
  },
  {
    code: 'EXPIRED15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 30,
    expiresAt: new Date(new Date().setDate(new Date().getDate() - 7)), // Expired 7 days ago
    isActive: false,
  },
];

export default coupons;