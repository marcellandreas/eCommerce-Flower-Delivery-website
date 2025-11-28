const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Clerk Webhook
// Note: This route expects raw body, so it should be mounted before express.json() in app.js
// or handled with specific middleware in app.js
router.post('/clerk', webhookController.handleClerkWebhook);

module.exports = router;
