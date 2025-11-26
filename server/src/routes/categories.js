const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { categoryValidators } = require('../middleware/validator');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:identifier', categoryController.getCategory);

// Admin routes
router.post(
  '/',
  requireAuth,
  requireAdmin,
  categoryValidators.create,
  categoryController.createCategory
);

router.put('/:id', requireAuth, requireAdmin, categoryController.updateCategory);
router.delete('/:id', requireAuth, requireAdmin, categoryController.deleteCategory);

module.exports = router;