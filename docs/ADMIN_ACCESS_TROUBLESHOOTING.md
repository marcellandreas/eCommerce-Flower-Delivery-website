# Admin Access Troubleshooting Guide

## Problem
Getting "Error loading users" on `/admin/users` page even though your role is admin.

## Root Cause
There was a mismatch between the role stored in the local database and the role stored in Clerk's `publicMetadata`. The `requireAdmin` middleware was checking the role from Clerk API instead of using the local database role, and there could be a sync issue.

## Solutions Implemented

### 1. Updated `requireAdmin` Middleware
**File**: `server/src/middleware/auth.js`

The middleware now:
- First checks the role from the local database (already loaded in `req.user`)
- If not admin in local DB, it double-checks with Clerk as a fallback
- Automatically syncs the role to local database if there's a mismatch
- This reduces redundant API calls and fixes sync issues

### 2. Updated `requireAuth` Middleware
**File**: `server/src/middleware/auth.js`

The middleware now:
- Automatically syncs role from Clerk to local database on every request
- Ensures `req.user.role` always reflects the latest role from Clerk
- Logs when role synchronization occurs for debugging

### 3. Enhanced Error Display
**File**: `client/src/pages/Admin/Users.jsx`

The Users page now:
- Shows detailed error messages (status code + error message)
- Includes a retry button for easy troubleshooting
- Better debugging information

## How to Fix Your Current Issue

### Option 1: Use the Automated Script (Recommended)
Run this command in the server directory:

```bash
cd server
node scripts/set-admin.js YOUR_EMAIL@example.com
```

This script will:
- Find your user in the database
- Update your role to 'admin' in both Clerk and local database
- Verify the changes

### Option 2: Manual Database Update
If the script doesn't work, you can manually update the database:

```bash
cd server
# Connect to your PostgreSQL database, then run:
```

```sql
UPDATE users 
SET role = 'admin', updated_at = CURRENT_TIMESTAMP 
WHERE email = 'YOUR_EMAIL@example.com';
```

You can use the SQL file at: `server/src/migrations/update_user_to_admin.sql`

### Option 3: Update via Clerk Dashboard
1. Go to your Clerk Dashboard
2. Navigate to Users
3. Find your user
4. Click on the user
5. Scroll to "Metadata" section
6. Add to Public Metadata:
   ```json
   {
     "role": "admin"
   }
   ```
7. Save changes

## Verification Steps

After applying any of the solutions:

1. **Clear your browser cache and cookies**
2. **Logout and login again** to get a fresh token
3. **Check the browser console** for any errors
4. **Navigate to `/admin/users`** page
5. The middleware will automatically sync the role from Clerk to local database

## Understanding the Fix

### Before
```
Client Request → requireAuth → requireAdmin (checks Clerk API) → Controller
                                     ↓
                              Role mismatch = Access Denied
```

### After
```
Client Request → requireAuth (syncs role) → requireAdmin (checks local DB + syncs) → Controller
                        ↓                              ↓
                 req.user.role = 'admin'    Auto-sync if mismatch
```

## Debugging Tips

### Check current user info:
Add this to any protected route:
```javascript
console.log('Current user:', req.user);
```

### Check if token is being sent:
Open browser DevTools → Network → Check request headers for `Authorization: Bearer ...`

### Check backend logs:
Look for these log messages:
- `Synced role for user <email>: <old_role> -> <new_role>`
- `Synced admin role for user <email>`

## Common Issues

### "Authentication required" error
- Your Clerk session token is invalid or expired
- Solution: Logout and login again

### "Admin access required" error
- Your role is not set to 'admin' in either Clerk or database
- Solution: Use one of the options above to set your role

### Still getting errors after setting admin role
- Clear browser cache and cookies
- Logout and login again to get a fresh token with updated metadata
- Check if the server is actually running and connected to database

## Prevention

To avoid this issue in the future:
1. Always use the `set-admin.js` script to promote users to admin
2. Ensure Clerk publicMetadata is updated when changing roles
3. The middleware now handles auto-sync, so roles should stay consistent

## Files Changed

1. `server/src/middleware/auth.js` - Updated `requireAuth` and `requireAdmin` middleware
2. `client/src/pages/Admin/Users.jsx` - Enhanced error display
3. `server/scripts/set-admin.js` - New utility script
4. `server/src/migrations/update_user_to_admin.sql` - SQL helper script
