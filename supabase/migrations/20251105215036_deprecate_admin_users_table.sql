/*
  # Deprecate admin_users Table
  
  ## Purpose
  This migration deprecates the custom admin_users table in favor of using
  Supabase's built-in authentication system (auth.users).
  
  ## Changes
  - Drop the admin_users table (no longer needed)
  - Admin authentication now handled via Supabase Auth
  
  ## Security Benefits
  - Proper password hashing with bcrypt (handled by Supabase)
  - JWT-based session management
  - Automatic token refresh
  - Built-in security features (rate limiting, email verification, etc.)
  - No custom authentication code to maintain
  
  ## Migration Path
  - Admin user will be created directly in Supabase Auth dashboard
  - Email: shant101094@gmail.com
  - Password: Set securely through Supabase dashboard
*/

-- Drop the old admin_users table
DROP TABLE IF EXISTS admin_users CASCADE;