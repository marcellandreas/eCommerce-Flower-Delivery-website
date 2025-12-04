const { Product, Category } = require('../models');
const cloudinary = require('../config/cloudinary');
const { AppError, asyncHandler } = require('../middleware/errorHandler');
const { Op } = require('sequelize');

/**
 * Get all products with pagination and filters
 * @route GET /api/v1/products
 */
exports.getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    search,
    minPrice,
    maxPrice,
    featured,
    sortBy = 'created_at',
    order = 'DESC',
  } = req.query;

  const offset = (page - 1) * limit;

  // Build filter conditions
  const where = { is_active: true };

  if (category) {
    where.category_id = category;
  }

  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Op.gte] = minPrice;
    if (maxPrice) where.price[Op.lte] = maxPrice;
  }

  if (featured === 'true') {
    where.is_featured = true;
  }

  // Execute query
  const { count, rows: products } = await Product.findAndCountAll({
    where,
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug'],
      },
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [[sortBy, order.toUpperCase()]],
  });

  res.status(200).json({
    success: true,
    data: {
      products,
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
 * Get single product by ID or slug
 * @route GET /api/v1/products/:identifier
 */
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { identifier } = req.params;

  // Check if identifier is UUID or slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

  const where = isUUID ? { id: identifier } : { slug: identifier };

  const product = await Product.findOne({
    where: { ...where, is_active: true },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug'],
      },
    ],
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * Create new product (Admin only)
 * @route POST /api/v1/products
 */
exports.createProduct = asyncHandler(async (req, res, next) => {
  const {
    category_id,
    name,
    slug,
    description,
    price,
    compare_at_price,
    stock_quantity,
    is_featured,
    metadata,
  } = req.body;

  const imageFile = req.file; // file tunggal

  // Check category
  const category = await Category.findByPk(category_id);
  if (!category) return next(new AppError("Category not found", 404));

  // Check slug
  const existingProduct = await Product.findOne({ where: { slug } });
  if (existingProduct) return next(new AppError("Product with this slug already exists", 409));

  // Upload Cloudinary jika ada file
  let imageUrl = null;
  if (imageFile) {
    const result = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    imageUrl = result.secure_url;
  }

  // Create product
  const product = await Product.create({
    category_id,
    name,
    slug,
    description,
    price,
    compare_at_price,
    stock_quantity: stock_quantity || 0,
    image_url: imageUrl,
    is_featured: is_featured || false,
    metadata: metadata || {},
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});



/**
 * Update product (Admin only)
 * @route PUT /api/v1/products/:id
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  const imageFile = req.file;

  const product = await Product.findByPk(id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // If slug is being updated, check if slug exists
  if (updates.slug && updates.slug !== product.slug) {
    const existingProduct = await Product.findOne({ where: { slug: updates.slug } });
    if (existingProduct) {
      return next(new AppError("Product with this slug already exists", 409));
    }
  }

  // If category is updated, check category existence
  if (updates.category_id) {
    const category = await Category.findByPk(updates.category_id);
    if (!category) {
      return next(new AppError("Category not found", 404));
    }
  }

  // Upload new image if image uploaded
  if (imageFile) {
    const result = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    updates.image_url = result.secure_url; // replace old with new
  }

  await product.update(updates);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});


/**
 * Delete product (Admin only)
 * @route DELETE /api/v1/products/:id
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  // Soft delete - just mark as inactive
  await product.update({ is_active: false });

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

/**
 * Get featured products
 * @route GET /api/v1/products/featured
 */
exports.getFeaturedProducts = asyncHandler(async (req, res) => {
  const { limit = 8 } = req.query;

  const products = await Product.findAll({
    where: {
      is_featured: true,
      is_active: true,
    },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug'],
      },
    ],
    limit: parseInt(limit),
    order: [['created_at', 'DESC']],
  });

  res.status(200).json({
    success: true,
    data: products,
  });
});

/**
 * Get products by category
 * @route GET /api/v1/products/category/:categorySlug
 */
exports.getProductsByCategory = asyncHandler(async (req, res, next) => {
  const { categorySlug } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  // Find category
  const category = await Category.findOne({ where: { slug: categorySlug } });

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  const { count, rows: products } = await Product.findAndCountAll({
    where: {
      category_id: category.id,
      is_active: true,
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['created_at', 'DESC']],
  });

  res.status(200).json({
    success: true,
    data: {
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
      },
      products,
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
 * Update product stock (Admin only)
 * @route PATCH /api/v1/products/:id/stock
 */
exports.updateStock = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { stock_quantity } = req.body;

  if (stock_quantity === undefined || stock_quantity < 0) {
    return next(new AppError('Valid stock quantity is required', 400));
  }

  const product = await Product.findByPk(id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  await product.update({ stock_quantity });

  res.status(200).json({
    success: true,
    message: 'Stock updated successfully',
    data: {
      id: product.id,
      name: product.name,
      stock_quantity: product.stock_quantity,
    },
  });
});