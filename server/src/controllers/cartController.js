const { Cart, CartItem, Product } = require('../models');
const { asyncHandler } = require('../middleware/errorHandler');


/**
 * Get user's cart
 * @route GET /api/v1/cart
 */
exports.getCart = asyncHandler(async (req, res) => {
  let cart;

  if (req.user) {
    // Authenticated user
    cart = await Cart.findOne({
      where: { user_id: req.user.id },
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'slug', 'price', 'image_url', 'stock_quantity'],
            },
          ],
        },
      ],
    });
  } else {
    // Guest user - use session
    const sessionId = req.headers['x-session-id'];
    if (sessionId) {
      cart = await Cart.findOne({
        where: { session_id: sessionId },
        include: [
          {
            model: CartItem,
            as: 'items',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'slug', 'price', 'image_url', 'stock_quantity'],
              },
            ],
          },
        ],
      });
    }
  }

  if (!cart) {
    return res.status(200).json({
      success: true,
      data: {
        items: [],
        subtotal: 0,
      },
    });
  }

  // Calculate subtotal
  const subtotal = cart.items.reduce((sum, item) => {
    return sum + parseFloat(item.product.price) * item.quantity;
  }, 0);

  res.status(200).json({
    success: true,
    data: {
      id: cart.id,
      items: cart.items,
      subtotal: subtotal.toFixed(2),
    },
  });
});

/**
 * Add item to cart
 * @route POST /api/v1/cart/items
 */
exports.addToCart = asyncHandler(async (req, res, next) => {
  const { product_id, quantity } = req.body;

  // Verify product exists and is available
  const product = await Product.findByPk(product_id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (!product.is_active) {
    return next(new AppError('Product is not available', 400));
  }

  if (product.stock_quantity < quantity) {
    return next(new AppError('Insufficient stock', 400));
  }

  // Find or create cart
  let cart;

  if (req.user) {
    [cart] = await Cart.findOrCreate({
      where: { user_id: req.user.id },
      defaults: { user_id: req.user.id },
    });
  } else {
    const sessionId = req.headers['x-session-id'];
    if (!sessionId) {
      return next(new AppError('Session ID required for guest users', 400));
    }

    [cart] = await Cart.findOrCreate({
      where: { session_id: sessionId },
      defaults: { session_id: sessionId },
    });
  }

  // Add or update cart item
  const [cartItem, created] = await CartItem.findOrCreate({
    where: {
      cart_id: cart.id,
      product_id,
    },
    defaults: {
      cart_id: cart.id,
      product_id,
      quantity,
    },
  });

  if (!created) {
    // Update existing item
    const newQuantity = cartItem.quantity + quantity;

    if (product.stock_quantity < newQuantity) {
      return next(new AppError('Insufficient stock', 400));
    }

    await cartItem.update({ quantity: newQuantity });
  }

  // Fetch updated cart
  const updatedCart = await Cart.findByPk(cart.id, {
    include: [
      {
        model: CartItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }],
      },
    ],
  });

  res.status(200).json({
    success: true,
    message: 'Item added to cart',
    data: updatedCart,
  });
});

/**
 * Update cart item quantity
 * @route PUT /api/v1/cart/items/:itemId
 */
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cartItem = await CartItem.findByPk(itemId, {
    include: [
      {
        model: Cart,
        as: 'cart',
      },
      {
        model: Product,
        as: 'product',
      },
    ],
  });

  if (!cartItem) {
    return next(new AppError('Cart item not found', 404));
  }

  // Verify ownership
  if (req.user && cartItem.cart.user_id !== req.user.id) {
    return next(new AppError('Not authorized', 403));
  }

  // Check stock
  if (cartItem.product.stock_quantity < quantity) {
    return next(new AppError('Insufficient stock', 400));
  }

  await cartItem.update({ quantity });

  res.status(200).json({
    success: true,
    message: 'Cart item updated',
    data: cartItem,
  });
});

/**
 * Remove item from cart
 * @route DELETE /api/v1/cart/items/:itemId
 */
exports.removeFromCart = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;

  const cartItem = await CartItem.findByPk(itemId, {
    include: [{ model: Cart, as: 'cart' }],
  });

  if (!cartItem) {
    return next(new AppError('Cart item not found', 404));
  }

  // Verify ownership
  if (req.user && cartItem.cart.user_id !== req.user.id) {
    return next(new AppError('Not authorized', 403));
  }

  await cartItem.destroy();

  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
  });
});

/**
 * Clear cart
 * @route DELETE /api/v1/cart
 */
exports.clearCart = asyncHandler(async (req, res) => {
  let cart;

  if (req.user) {
    cart = await Cart.findOne({ where: { user_id: req.user.id } });
  } else {
    const sessionId = req.headers['x-session-id'];
    if (sessionId) {
      cart = await Cart.findOne({ where: { session_id: sessionId } });
    }
  }

  if (cart) {
    await CartItem.destroy({ where: { cart_id: cart.id } });
  }

  res.status(200).json({
    success: true,
    message: 'Cart cleared',
  });
});