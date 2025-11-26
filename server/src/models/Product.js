const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.UUID,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  compare_at_price: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      min: 0,
    },
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  image_url: {
    type: DataTypes.TEXT,
  },
  images: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
}, {
  tableName: 'products',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Product;