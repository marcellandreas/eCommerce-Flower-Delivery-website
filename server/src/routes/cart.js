const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { optionalAuth, requireAuth, requireAdmin } = require('../middleware/auth');
const { cartValidators } = require('../middleware/validator');

// All cart routes support both authenticated and guest users
// Admin route
router.get('/all', requireAuth, requireAdmin, cartController.getAllCarts);

// All cart routes support both authenticated and guest users
router.get('/', optionalAuth, cartController.getCart);
router.post('/items', optionalAuth, cartValidators.addItem, cartController.addToCart);
router.put(
  '/items/:itemId',
  optionalAuth,
  cartValidators.updateItem,
  cartController.updateCartItem
);
router.delete('/items/:itemId', optionalAuth, cartController.removeFromCart);
router.delete('/', optionalAuth, cartController.clearCart);

module.exports = router;