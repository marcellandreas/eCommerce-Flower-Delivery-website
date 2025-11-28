// ============================================
// src/middleware/auth.js
const clerk = require('../config/clerk');

/**
 * Middleware to verify Clerk session token (JWT)
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

    // Verify session token (JWT) with Clerk
    // Note: verifyToken returns the decoded JWT payload if valid, throws otherwise
    const decodedToken = await clerk.verifyToken(sessionToken);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session token.'
      });
    }

    // Get user details from Clerk using the subject (sub) claim which holds the user ID
    const userId = decodedToken.sub;
    const user = await clerk.users.getUser(userId);

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
      try {
        const decodedToken = await clerk.verifyToken(sessionToken);
        if (decodedToken) {
          const userId = decodedToken.sub;
          const user = await clerk.users.getUser(userId);
          req.user = {
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          };
        }
      } catch (err) {
        // Token invalid, just ignore
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