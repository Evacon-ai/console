/*
  # Update user policies for role-based access control

  1. Changes
    - Drop all existing policies
    - Create new policies for:
      - Basic user authentication
      - Role-based panel visibility
      - Role-specific user viewing permissions
      - Admin user management capabilities
    
  2. Security
    - Enable RLS
    - Grant necessary permissions
    - Add performance indexes
*/

-- Drop existing policies
DROP POLICY IF EXISTS "users_view_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;
DROP POLICY IF EXISTS "service_role_policy" ON users;
DROP POLICY IF EXISTS "users_access_policy" ON users;

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON users TO service_role;
GRANT ALL ON users TO authenticated;

-- Basic view policy for all authenticated users
CREATE POLICY "users_self_view"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Evacon staff view policy
CREATE POLICY "evacon_staff_view"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM users viewer 
      WHERE viewer.id = auth.uid() 
      AND viewer.role = 'evacon_user'
      AND users.role LIKE 'customer_%'
    )
  );

-- Evacon admin view policy
CREATE POLICY "evacon_admin_view"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM users viewer 
      WHERE viewer.id = auth.uid() 
      AND viewer.role = 'evacon_admin'
    )
  );

-- Admin user management policy
CREATE POLICY "admin_user_management"
  ON users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM users admin 
      WHERE admin.id = auth.uid() 
      AND admin.role = 'evacon_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM users admin 
      WHERE admin.id = auth.uid() 
      AND admin.role = 'evacon_admin'
    )
  );

-- Service role policy
CREATE POLICY "service_role_policy"
  ON users FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);

-- Ensure proper permissions for the service role
ALTER TABLE users FORCE ROW LEVEL SECURITY;

-- Grant sequence usage if needed
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;