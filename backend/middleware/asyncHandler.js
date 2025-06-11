// backend/middleware/asyncHandler.js

// This is a simple higher-order function (middleware) to wrap async route handlers.
// It catches any errors thrown by the async function and passes them to the
// Express error handling middleware (`next(error)`).
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;