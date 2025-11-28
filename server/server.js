require('dotenv').config();
const app = require('./src/app');
const { testConnection } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Start server only if not in Vercel environment or if run directly
    if (require.main === module) {
      app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   🌸 Flower Delivery API Server           ║
║                                           ║
║   Environment: ${process.env.NODE_ENV?.padEnd(27) || 'development'.padEnd(27)}║
║   Port: ${PORT.toString().padEnd(33)}║
║   API Version: ${(process.env.API_VERSION || 'v1').padEnd(27)}║
║                                           ║
║   Server URL: http://localhost:${PORT}    ║
║   API Base: /api/${process.env.API_VERSION || 'v1'}                  ║
║                                           ║
╚═══════════════════════════════════════════╝
        `);

        if (process.env.NODE_ENV === 'development') {
          console.log('\n📍 Available Routes:');
          console.log(`   GET  /api/v1/health`);
          console.log(`   GET  /api/v1/products`);
          console.log(`   GET  /api/v1/categories`);
          console.log(`   POST /api/v1/orders`);
          console.log(`   GET  /api/v1/cart`);
          console.log(`\n✨ Server is ready to accept connections\n`);
        }
      });
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    // Do not exit process in Vercel
    if (require.main === module) process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥');
  console.error(err.name, err.message);
  // Do not exit process in Vercel
  if (require.main === module) process.exit(1);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully');
  if (require.main === module) process.exit(0);
});

// Execute startServer
startServer();

// Export app for Vercel
module.exports = app;