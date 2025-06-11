// backend/utils/helpers.js

// Example helper function for basic email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Example helper function for formatting currency
const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// You can add more general utility functions here as needed
// e.g., generate unique IDs, date formatting, data transformation, etc.

export { isValidEmail, formatCurrency };