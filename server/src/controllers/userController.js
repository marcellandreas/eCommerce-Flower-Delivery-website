const { User, Order } = require('../models');
const clerk = require('../config/clerk');

/**
 * Get current user profile
 * @route GET /api/v1/users/me
 */
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  // Find or create user in database
  let user = await User.findOne({ where: { clerk_id: req.user.id } });

  if (!user) {
    // Create user if doesn't exist
    user = await User.create({
      clerk_id: req.user.id,
      email: req.user.email,
      first_name: req.user.firstName,
      last_name: req.user.lastName,
      image_url: req.user.imageUrl,
    });
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

  let user = await User.findOne({ where: { clerk_id: req.user.id } });

  if (!user) {
    user = await User.create({
      clerk_id: req.user.id,
      email: req.user.email,
      first_name,
      last_name,
      phone,
      image_url: req.user.imageUrl,
    });
  } else {
    await user.update({
      first_name,
      last_name,
      phone,
    });
  }

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
    return next(new AppError('User not found', 404));
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
    return next(new AppError('User not found', 404));
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