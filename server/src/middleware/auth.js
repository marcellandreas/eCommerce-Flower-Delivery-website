// ============================================
// src/middleware/auth.js
const clerk = require('../config/clerk');

/**
 * Middleware to verify Clerk session token
 */
const requireAuth = async (req, res, next) => {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');

    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No token provided.'
      });
    }

    // Verify session with Clerk
    const session = await clerk.sessions.verifySession(sessionToken);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session token.'
      });
    }

    // Get user details from Clerk
    const user = await clerk.users.getUser(session.userId);

    // Attach user info to request
    req.user = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Optional auth - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');

    if (sessionToken) {
      const session = await clerk.sessions.verifySession(sessionToken);
      if (session) {
        const user = await clerk.users.getUser(session.userId);
        req.user = {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        };
      }
    }

    next();
  } catch (error) {
    // Continue without auth
    next();
  }
};

/**
 * Check if user is admin
 */
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    // Get user metadata from Clerk
    const user = await clerk.users.getUser(req.user.id);
    const isAdmin = user.publicMetadata?.role === 'admin';

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required.'
      });
    }

    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking admin status.'
    });
  }
};

module.exports = {
  requireAuth,
  optionalAuth,
  requireAdmin,
};