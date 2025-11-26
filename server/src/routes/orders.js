const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { requireAuth, optionalAuth, requireAdmin } = require('../middleware/auth');
const { orderValidators, queryValidators } = require('../middleware/validator');

// Authenticated routes
router.post('/', optionalAuth, orderValidators.create, orderController.createOrder);
router.get('/', requireAuth, queryValidators.pagination, orderController.getOrders);
router.get('/:id', requireAuth, orderController.getOrder);
router.post('/:id/cancel', requireAuth, orderController.cancelOrder);

// Admin routes
router.patch(
  '/:id/status',
  requireAuth,
  requireAdmin,
  orderValidators.updateStatus,
  orderController.updateOrderStatus
);

module.exports = router;