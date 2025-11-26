const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// User routes
router.get('/me', requireAuth, userController.getCurrentUser);
router.put('/me', requireAuth, userController.updateCurrentUser);

// Admin routes
router.get('/', requireAuth, requireAdmin, userController.getAllUsers);
router.get('/:id', requireAuth, requireAdmin, userController.getUser);
router.put('/:id', requireAuth, requireAdmin, userController.updateUser);

module.exports = router;