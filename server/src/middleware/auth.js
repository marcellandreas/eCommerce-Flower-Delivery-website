// ============================================
// src/middleware/auth.js
const clerk = require('../config/clerk');
const { User } = require('../models');

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
    const decodedToken = await clerk.verifyToken(sessionToken);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session token.'
      });
    }

    // Get user details from Clerk
    const clerkUserId = decodedToken.sub;
    const clerkUser = await clerk.users.getUser(clerkUserId);

    // Find or create local user
    const [user, created] = await User.findOrCreate({
      where: { clerk_id: clerkUserId },
      defaults: {
        clerk_id: clerkUserId,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        first_name: clerkUser.firstName,
        last_name: clerkUser.lastName,
        image_url: clerkUser.imageUrl,
        role: clerkUser.publicMetadata?.role || 'customer',
      }
    });

    // Sync role if it changed in Clerk
    const clerkRole = clerkUser.publicMetadata?.role || 'customer';
    if (!created && user.role !== clerkRole) {
      await user.update({ role: clerkRole });
      console.log(`Synced role for user ${user.email}: ${user.role} -> ${clerkRole}`);
    }

    // Attach local user info to request
    req.user = {
      id: user.id, // This is now the local UUID
      clerk_id: user.clerk_id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      imageUrl: user.image_url,
      role: created ? clerkRole : (user.role !== clerkRole ? clerkRole : user.role), // Use the latest role
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
          const clerkUserId = decodedToken.sub;
          const clerkUser = await clerk.users.getUser(clerkUserId);

          // Find or create local user
          const [user] = await User.findOrCreate({
            where: { clerk_id: clerkUserId },
            defaults: {
              clerk_id: clerkUserId,
              email: clerkUser.emailAddresses[0]?.emailAddress,
              first_name: clerkUser.firstName,
              last_name: clerkUser.lastName,
              image_url: clerkUser.imageUrl,
              role: clerkUser.publicMetadata?.role || 'customer',
            }
          });

          req.user = {
            id: user.id, // This is now the local UUID
            clerk_id: user.clerk_id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            imageUrl: user.image_url,
            role: user.role,
          };
        }
      } catch (err) {
        // Token invalid, just ignore
        console.error('Optional auth token error:', err);
      }
    }

    next();
  } catch (error) {
    // Continue without auth
    console.error('Optional auth error:', error);
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

    // First check from local database user (already set in req.user by requireAuth)
    const isAdmin = req.user.role === 'admin';

    if (!isAdmin) {
      // Double check with Clerk as fallback and sync if needed
      try {
        const clerkUser = await clerk.users.getUser(req.user.clerk_id);
        const clerkRole = clerkUser.publicMetadata?.role;

        if (clerkRole === 'admin') {
          // Sync the role to local database
          const localUser = await User.findByPk(req.user.id);
          if (localUser && localUser.role !== 'admin') {
            await localUser.update({ role: 'admin' });
            req.user.role = 'admin';
            console.log(`Synced admin role for user ${req.user.email}`);
          }
          // Allow access
          return next();
        }
      } catch (clerkError) {
        console.error('Error checking Clerk admin status:', clerkError);
      }

      // If still not admin, deny access
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