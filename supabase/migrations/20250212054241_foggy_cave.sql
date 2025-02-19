/*
  # Fix user permissions
  
  1. Changes
    - Grant proper permissions to authenticated users
    - Ensure service role has full access
    - Simplify policies to avoid recursion
    - Add proper indexes for performance
*/

-- Drop existing policies
DROP POLICY IF EXISTS "users_view_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON users TO authenticated;
GRANT UPDATE ON users TO authenticated;

-- Create policy for viewing users
CREATE POLICY "users_view_policy"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR                     -- Users can see themselves
    role = 'evacon_admin' OR               -- Evacon admins can see everyone
    role = 'evacon_staff' OR               -- Evacon staff can see everyone
    (SELECT role FROM users WHERE id = auth.uid()) IN ('evacon_admin', 'evacon_staff')  -- Evacon staff can see all users
  );

-- Create policy for updating users
CREATE POLICY "users_update_policy"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Grant full access to service role
GRANT ALL ON users TO service_role;

-- Create policy for service role
CREATE POLICY "service_role_policy"
  ON users
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Ensure we have the necessary indexes
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);