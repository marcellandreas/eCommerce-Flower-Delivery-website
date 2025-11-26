const { Category, Product } = require('../models');
const { sequelize } = require('../config/database');

const categories = [
  {
    name: 'Fresh Flowers',
    slug: 'fresh-flowers',
    description: 'Beautiful fresh flowers delivered daily',
    image_url: '/images/categories/fresh-flowers.jpg',
  },
  {
    name: 'Dried Flowers',
    slug: 'dried-flowers',
    description: 'Long-lasting dried flower arrangements',
    image_url: '/images/categories/dried-flowers.jpg',
  },
  {
    name: 'Live Plants',
    slug: 'live-plants',
    description: 'Indoor and outdoor live plants',
    image_url: '/images/categories/live-plants.jpg',
  },
  {
    name: 'Aroma Candles',
    slug: 'aroma-candles',
    description: 'Scented candles for relaxation',
    image_url: '/images/categories/aroma-candles.jpg',
  },
  {
    name: 'Designer Vases',
    slug: 'designer-vases',
    description: 'Elegant vases for your flowers',
    image_url: '/images/categories/designer-vases.jpg',
  },
];

const products = [
  {
    category_slug: 'fresh-flowers',
    name: 'Rose Bouquet',
    slug: 'rose-bouquet',
    description: 'Elegant bouquet of 12 fresh red roses',
    price: 450.00,
    compare_at_price: 600.00,
    stock_quantity: 50,
    image_url: '/images/products/rose-bouquet.jpg',
    is_featured: true,
  },
  {
    category_slug: 'fresh-flowers',
    name: 'Tulip Arrangement',
    slug: 'tulip-arrangement',
    description: 'Colorful tulip arrangement with 20 stems',
    price: 380.00,
    stock_quantity: 30,
    image_url: '/images/products/tulip-arrangement.jpg',
    is_featured: true,
  },
  {
    category_slug: 'fresh-flowers',
    name: 'Sunflower Bunch',
    slug: 'sunflower-bunch',
    description: 'Bright sunflowers to light up your day',
    price: 320.00,
    stock_quantity: 40,
    image_url: '/images/products/sunflower-bunch.jpg',
  },
  {
    category_slug: 'dried-flowers',
    name: 'Lavender Bundle',
    slug: 'lavender-bundle',
    description: 'Dried lavender bundle for aromatherapy',
    price: 280.00,
    stock_quantity: 60,
    image_url: '/images/products/lavender-bundle.jpg',
  },
  {
    category_slug: 'live-plants',
    name: 'Monstera Deliciosa',
    slug: 'monstera-deliciosa',
    description: 'Popular indoor plant with large leaves',
    price: 850.00,
    stock_quantity: 25,
    image_url: '/images/products/monstera.jpg',
    is_featured: true,
  },
  {
    category_slug: 'live-plants',
    name: 'Snake Plant',
    slug: 'snake-plant',
    description: 'Low-maintenance air-purifying plant',
    price: 420.00,
    stock_quantity: 35,
    image_url: '/images/products/snake-plant.jpg',
  },
  {
    category_slug: 'aroma-candles',
    name: 'Vanilla Dreams Candle',
    slug: 'vanilla-dreams-candle',
    description: 'Soothing vanilla-scented candle',
    price: 180.00,
    stock_quantity: 100,
    image_url: '/images/products/vanilla-candle.jpg',
  },
  {
    category_slug: 'designer-vases',
    name: 'Modern Glass Vase',
    slug: 'modern-glass-vase',
    description: 'Contemporary glass vase for any bouquet',
    price: 350.00,
    stock_quantity: 45,
    image_url: '/images/products/glass-vase.jpg',
  },
];

const seed = async () => {
  try {
    console.log('\n🌱 Starting database seeding...\n');

    // Check if data already exists
    const categoryCount = await Category.count();
    if (categoryCount > 0) {
      console.log('⚠️  Database already contains data. Skipping seed.');
      console.log('   Use "npm run seed:force" to force re-seed.');
      process.exit(0);
    }

    const transaction = await sequelize.transaction();

    try {
      // Seed categories
      console.log('📦 Seeding categories...');
      const createdCategories = await Category.bulkCreate(categories, {
        transaction,
      });
      console.log(`✅ Created ${createdCategories.length} categories`);

      // Map category slugs to IDs
      const categoryMap = {};
      createdCategories.forEach((cat) => {
        categoryMap[cat.slug] = cat.id;
      });

      // Prepare products with category IDs
      const productsWithCategoryIds = products.map((product) => ({
        ...product,
        category_id: categoryMap[product.category_slug],
      }));

      // Remove category_slug field
      productsWithCategoryIds.forEach((product) => {
        delete product.category_slug;
      });

      // Seed products
      console.log('📦 Seeding products...');
      const createdProducts = await Product.bulkCreate(productsWithCategoryIds, {
        transaction,
      });
      console.log(`✅ Created ${createdProducts.length} products`);

      await transaction.commit();

      console.log('\n✨ Database seeding completed successfully!\n');
      console.log('📊 Summary:');
      console.log(`   Categories: ${createdCategories.length}`);
      console.log(`   Products: ${createdProducts.length}`);
      console.log('');

      process.exit(0);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
