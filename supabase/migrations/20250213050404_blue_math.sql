/*
  # Fix user permissions

  1. Changes
    - Grant proper permissions to authenticated users
    - Add policies for auth.users table
    - Remove redundant policies

  2. Security
    - Maintains RLS security
    - Adds specific policies for user access
*/

-- Enable RLS on auth.users if not already enabled
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON auth.users;
DROP POLICY IF EXISTS "Evacon staff can view all users" ON auth.users;

-- Create simplified policies for auth.users
CREATE POLICY "auth_users_self_access"
  ON auth.users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR  -- Users can see themselves
    raw_user_meta_data->>'role' IN ('evacon_admin', 'evacon_staff')  -- Evacon staff can see everyone
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;
GRANT SELECT ON auth.users TO anon;

-- Ensure proper role inheritance
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT SELECT ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT SELECT ON TABLES TO anon;