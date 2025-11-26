const rateLimit = require('express-rate-limit');

const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: 'Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Different rate limiters for different endpoints
const apiLimiter = createRateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes
const authLimiter = createRateLimiter(15 * 60 * 1000, 5); // 5 requests per 15 minutes
const strictLimiter = createRateLimiter(15 * 60 * 1000, 10); // 10 requests per 15 minutes

module.exports = {
  apiLimiter,
  authLimiter,
  strictLimiter,
  createRateLimiter,
};