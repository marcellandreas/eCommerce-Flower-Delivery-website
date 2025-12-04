const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/multer');
const { productValidators, queryValidators } = require('../middleware/validator');

// Public routes
router.get('/', queryValidators.pagination, productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/category/:categorySlug', productController.getProductsByCategory);
router.get('/:identifier', productController.getProduct);

// Admin routes
router.post(
  '/',
  requireAuth,
  requireAdmin,
  upload.single("image"),
  productValidators.create,
  productController.createProduct
);

router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  upload.single("image"),
  productValidators.update,
  productController.updateProduct
);

router.delete('/:id', requireAuth, requireAdmin, productController.deleteProduct);

router.patch(
  '/:id/stock',
  requireAuth,
  requireAdmin,
  productController.updateStock
);

module.exports = router;