const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  order_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending',
  },
  customer_email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  customer_phone: {
    type: DataTypes.STRING(20),
  },
  shipping_address_line1: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  shipping_address_line2: {
    type: DataTypes.STRING(255),
  },
  shipping_city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  shipping_state: {
    type: DataTypes.STRING(100),
  },
  shipping_postal_code: {
    type: DataTypes.STRING(20),
  },
  shipping_country: {
    type: DataTypes.STRING(100),
    defaultValue: 'Ukraine',
  },
  delivery_date: {
    type: DataTypes.DATEONLY,
  },
  delivery_time: {
    type: DataTypes.STRING(50),
  },
  delivery_notes: {
    type: DataTypes.TEXT,
  },
  gift_message: {
    type: DataTypes.TEXT,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  shipping_cost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING(50),
  },
  payment_intent_id: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'orders',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Order;