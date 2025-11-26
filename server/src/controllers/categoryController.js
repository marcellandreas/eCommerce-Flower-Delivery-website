const { Category, Product } = require('../models');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

/**
 * Get all categories
 * @route GET /api/v1/categories
 */
exports.getAllCategories = asyncHandler(async (req, res) => {
  const { include_products } = req.query;

  const includeOptions = include_products === 'true'
    ? [
        {
          model: Product,
          as: 'products',
          where: { is_active: true },
          required: false,
          attributes: ['id', 'name', 'slug', 'price', 'image_url'],
        },
      ]
    : [];

  const categories = await Category.findAll({
    where: { is_active: true },
    include: includeOptions,
    order: [['name', 'ASC']],
  });

  res.status(200).json({
    success: true,
    data: categories,
  });
});

/**
 * Get single category
 * @route GET /api/v1/categories/:identifier
 */
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { identifier } = req.params;

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
  const where = isUUID ? { id: identifier } : { slug: identifier };

  const category = await Category.findOne({
    where: { ...where, is_active: true },
    include: [
      {
        model: Product,
        as: 'products',
        where: { is_active: true },
        required: false,
      },
    ],
  });

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

/**
 * Create category (Admin only)
 * @route POST /api/v1/categories
 */
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name, slug, description, image_url } = req.body;

  // Check if slug exists
  const existing = await Category.findOne({ where: { slug } });
  if (existing) {
    return next(new AppError('Category with this slug already exists', 409));
  }

  const category = await Category.create({
    name,
    slug,
    description,
    image_url,
  });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

/**
 * Update category (Admin only)
 * @route PUT /api/v1/categories/:id
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  const category = await Category.findByPk(id);

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  // Check slug uniqueness if being updated
  if (updates.slug && updates.slug !== category.slug) {
    const existing = await Category.findOne({ where: { slug: updates.slug } });
    if (existing) {
      return next(new AppError('Category with this slug already exists', 409));
    }
  }

  await category.update(updates);

  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

/**
 * Delete category (Admin only)
 * @route DELETE /api/v1/categories/:id
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  // Soft delete
  await category.update({ is_active: false });

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});