// src/models/index.js
const { sequelize } = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Cart = require('./Cart');
const CartItem = require('./CartItem');

// Define associations
const setupAssociations = () => {
  // User - Orders
  User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
  Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // User - Cart
  User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });
  Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // Category - Products
  Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
  Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

  // Order - OrderItems
  Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
  OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

  // Product - OrderItems
  Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
  OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // Cart - CartItems
  Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });
  CartItem.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });

  // Product - CartItems
  Product.hasMany(CartItem, { foreignKey: 'product_id', as: 'cartItems' });
  CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
};

setupAssociations();

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
};