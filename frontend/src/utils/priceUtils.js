// // frontend/src/utils/priceUtils.js

// // Helper function to add decimals
// export const addDecimals = (num) => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// };

// // You can add other price related utilities here if needed
// // For example, currency formatting:
// export const formatCurrency = (amount, currency = 'USD') => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: currency,
//   }).format(amount);
// };

// frontend/src/utils/priceUtils.js

// Helper function to add decimals and ensure it's a number
export const addDecimals = (num) => {
  // Ensure num is a number first, then round, then return as a number
  return Math.round(Number(num) * 100) / 100; // Returns a number, not a string
};

// You can add other price related utilities here if needed
// For example, currency formatting:
export const formatCurrency = (amount, currency = 'USD') => {
  // Use addDecimals to ensure it's a number before formatting for display
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(addDecimals(amount)); // Format the number for display
};