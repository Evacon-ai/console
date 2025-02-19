/*
  # Basic Authentication Policy
  
  1. Changes
    - Drop all existing policies
    - Create single policy for basic authentication
    - Grant necessary permissions
    
  2. Security
    - Enable RLS
    - Only allow users to view their own profile
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "users_self_view" ON users;
DROP POLICY IF EXISTS "evacon_staff_view" ON users;
DROP POLICY IF EXISTS "evacon_admin_view" ON users;
DROP POLICY IF EXISTS "admin_user_management" ON users;
DROP POLICY IF EXISTS "service_role_policy" ON users;

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON users TO service_role;
GRANT SELECT ON users TO authenticated;

-- Create basic authentication policy
CREATE POLICY "users_auth_policy"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Create service role policy for backend operations
CREATE POLICY "service_role_policy"
  ON users FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);