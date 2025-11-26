const { Order, OrderItem, Product, User } = require('../models');
const { AppError, asyncHandler } = require('../middleware/errorHandler');
const { sequelize } = require('../config/database');

/**
 * Generate unique order number
 */
const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

/**
 * Create new order
 * @route POST /api/v1/orders
 */
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    items,
    customer_name,
    customer_email,
    customer_phone,
    shipping_address_line1,
    shipping_address_line2,
    shipping_city,
    shipping_state,
    shipping_postal_code,
    shipping_country,
    delivery_date,
    delivery_time,
    delivery_notes,
    gift_message,
    payment_method,
  } = req.body;

  // Start transaction
  const transaction = await sequelize.transaction();

  try {
    // Calculate order totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.product_id);

      if (!product) {
        throw new AppError(`Product ${item.product_id} not found`, 404);
      }

      if (!product.is_active) {
        throw new AppError(`Product ${product.name} is not available`, 400);
      }

      if (product.stock_quantity < item.quantity) {
        throw new AppError(
          `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}`,
          400
        );
      }

      const itemSubtotal = parseFloat(product.price) * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        product_image: product.image_url,
        quantity: item.quantity,
        price: product.price,
        subtotal: itemSubtotal,
      });

      // Reduce stock
      await product.decrement('stock_quantity', {
        by: item.quantity,
        transaction,
      });
    }

    // Calculate shipping and total (simplified - you can add complex logic)
    const shipping_cost = subtotal > 1000 ? 0 : 50; // Free shipping over 1000
    const tax = subtotal * 0.0; // No tax for now
    const total = subtotal + shipping_cost + tax;

    // Create order
    const order = await Order.create(
      {
        user_id: req.user?.id || null,
        order_number: generateOrderNumber(),
        customer_name,
        customer_email,
        customer_phone,
        shipping_address_line1,
        shipping_address_line2,
        shipping_city,
        shipping_state,
        shipping_postal_code,
        shipping_country: shipping_country || 'Ukraine',
        delivery_date,
        delivery_time,
        delivery_notes,
        gift_message,
        subtotal,
        shipping_cost,
        tax,
        total,
        payment_method,
        status: 'pending',
        payment_status: 'pending',
      },
      { transaction }
    );

    // Create order items
    for (const item of orderItems) {
      await OrderItem.create(
        {
          order_id: order.id,
          ...item,
        },
        { transaction }
      );
    }

    await transaction.commit();

    // Fetch complete order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: completeOrder,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
});

/**
 * Get all orders (Admin) or user's orders
 * @route GET /api/v1/orders
 */
exports.getOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const offset = (page - 1) * limit;

  const where = {};

  // Non-admin users only see their orders
  if (!req.user?.role || req.user.role !== 'admin') {
    where.user_id = req.user.id;
  }

  if (status) {
    where.status = status;
  }

  const { count, rows: orders } = await Order.findAndCountAll({
    where,
    include: [
      {
        model: OrderItem,
        as: 'items',
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'image_url', 'slug'],
          },
        ],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'first_name', 'last_name'],
      },
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['created_at', 'DESC']],
  });

  res.status(200).json({
    success: true,
    data: {
      orders,
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
 * Get single order
 * @route GET /api/v1/orders/:id
 */
exports.getOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findByPk(id, {
    include: [
      {
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }],
      },
    ],
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  // Check authorization
  if (req.user?.role !== 'admin' && order.user_id !== req.user?.id) {
    return next(new AppError('Not authorized to view this order', 403));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

/**
 * Update order status (Admin only)
 * @route PATCH /api/v1/orders/:id/status
 */
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findByPk(id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  await order.update({ status });

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: order,
  });
});

/**
 * Cancel order
 * @route POST /api/v1/orders/:id/cancel
 */
exports.cancelOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findByPk(id, {
    include: [{ model: OrderItem, as: 'items' }],
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  // Check authorization
  if (req.user?.role !== 'admin' && order.user_id !== req.user?.id) {
    return next(new AppError('Not authorized to cancel this order', 403));
  }

  // Only pending or processing orders can be cancelled
  if (!['pending', 'processing'].includes(order.status)) {
    return next(new AppError('Order cannot be cancelled at this stage', 400));
  }

  const transaction = await sequelize.transaction();

  try {
    // Restore stock
    for (const item of order.items) {
      if (item.product_id) {
        const product = await Product.findByPk(item.product_id);
        if (product) {
          await product.increment('stock_quantity', {
            by: item.quantity,
            transaction,
          });
        }
      }
    }

    await order.update({ status: 'cancelled' }, { transaction });
    await transaction.commit();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: order,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
});