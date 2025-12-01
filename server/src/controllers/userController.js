const { User, Order } = require('../models');
const clerk = require('../config/clerk');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Get current user profile
 * @route GET /api/v1/users/me
 */
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  // User is already attached to req by requireAuth middleware
  // But we fetch fresh from DB just in case
  const user = await User.findByPk(req.user.id);

  if (!user) {
    // This should theoretically not happen if middleware worked
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Update current user
 * @route PUT /api/v1/users/me
 */
exports.updateCurrentUser = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, phone } = req.body;

  const user = await User.findByPk(req.user.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  await user.update({
    first_name,
    last_name,
    phone,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
});

/**
 * Get all users (Admin only)
 * @route GET /api/v1/users
 */
exports.getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  const { count, rows: users } = await User.findAndCountAll({
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['created_at', 'DESC']],
    attributes: { exclude: ['clerk_id'] },
  });

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    },
  });
});

/**
 * Get single user (Admin only)
 * @route GET /api/v1/users/:id
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByPk(id, {
    include: [
      {
        model: Order,
        as: 'orders',
        limit: 5,
        order: [['created_at', 'DESC']],
      },
    ],
  });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Update user (Admin only)
 * @route PUT /api/v1/users/:id
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { role, ...updates } = req.body;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Update user in database
  await user.update(updates);

  // Update role in Clerk if provided
  if (role) {
    try {
      await clerk.users.updateUser(user.clerk_id, {
        publicMetadata: { role },
      });
      await user.update({ role });
    } catch (error) {
      console.error('Error updating Clerk user:', error);
    }
  }

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});