require('dotenv').config();
const app = require('./src/app');
const { testConnection } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Only start server locally (not on Vercel)
if (!process.env.VERCEL) {
  const startServer = async () => {
    try {
      await testConnection();

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  };

  startServer();
}

// Export handler for Vercel Serverless
module.exports = app;
