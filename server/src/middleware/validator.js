
const { body, param, query, validationResult } = require('express-validator');
const { AppError } = require('./errorHandler');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    throw new AppError(errorMessages, 400);
  }
  next();
};

// Product Validators
const productValidators = {
  create: [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('slug').trim().notEmpty().withMessage('Product slug is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category_id').isUUID().withMessage('Valid category ID is required'),
    body('stock_quantity').optional().isInt({ min: 0 }).withMessage('Stock must be non-negative'),
    validate,
  ],
  update: [
    param('id').isUUID().withMessage('Valid product ID is required'),
    body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be positive'),
    body('stock_quantity').optional().isInt({ min: 0 }).withMessage('Stock must be non-negative'),
    validate,
  ],
};

// Order Validators
const orderValidators = {
  create: [
    body('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
    body('items.*.product_id').isUUID().withMessage('Valid product ID required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('customer_name').trim().notEmpty().withMessage('Customer name is required'),
    body('customer_email').isEmail().withMessage('Valid email is required'),
    body('customer_phone').optional().trim(),
    body('shipping_address_line1').trim().notEmpty().withMessage('Address is required'),
    body('shipping_city').trim().notEmpty().withMessage('City is required'),
    body('delivery_date').optional().isISO8601().withMessage('Valid date required'),
    validate,
  ],
  updateStatus: [
    param('id').isUUID().withMessage('Valid order ID required'),
    body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid status'),
    validate,
  ],
};

// Cart Validators
const cartValidators = {
  addItem: [
    body('product_id').isUUID().withMessage('Valid product ID required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    validate,
  ],
  updateItem: [
    param('itemId').isUUID().withMessage('Valid cart item ID required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    validate,
  ],
};

// Category Validators
const categoryValidators = {
  create: [
    body('name').trim().notEmpty().withMessage('Category name is required'),
    body('slug').trim().notEmpty().withMessage('Category slug is required'),
    validate,
  ],
};

// Query Validators
const queryValidators = {
  pagination: [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be positive'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be 1-100'),
    validate,
  ],
};

module.exports = {
  validate,
  productValidators,
  orderValidators,
  cartValidators,
  categoryValidators,
  queryValidators,
};