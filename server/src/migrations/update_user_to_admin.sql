-- ============================================
-- Script to update user role to admin
-- Usage: Replace 'YOUR_EMAIL_HERE' with your actual email
-- ============================================

-- Option 1: Update by email
UPDATE users 
SET role = 'admin', updated_at = CURRENT_TIMESTAMP 
WHERE email = 'YOUR_EMAIL_HERE';

-- Option 2: Update by clerk_id (if you know your Clerk user ID)
-- UPDATE users 
-- SET role = 'admin', updated_at = CURRENT_TIMESTAMP 
-- WHERE clerk_id = 'YOUR_CLERK_ID_HERE';

-- Verify the change
SELECT id, email, role, first_name, last_name, created_at, updated_at 
FROM users 
WHERE email = 'YOUR_EMAIL_HERE';
