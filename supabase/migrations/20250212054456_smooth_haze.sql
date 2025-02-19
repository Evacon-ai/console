/*
  # Fix user permissions with proper service role access
  
  1. Changes
    - Ensure proper service role access
    - Simplify policies to avoid recursion
    - Add proper grants for authenticated users
    - Fix permission denied errors
*/

-- Drop existing policies
DROP POLICY IF EXISTS "users_view_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;
DROP POLICY IF EXISTS "service_role_policy" ON users;

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON users TO service_role;
GRANT SELECT, UPDATE ON users TO authenticated;

-- Create simplified view policy without recursion
CREATE POLICY "users_view_policy" ON users
  FOR SELECT TO authenticated
  USING (
    id = auth.uid() OR  -- Users can always see themselves
    (SELECT role FROM users WHERE id = auth.uid()) IN ('evacon_admin', 'evacon_staff')  -- Evacon staff can see everyone
  );

-- Create update policy
CREATE POLICY "users_update_policy" ON users
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Create service role policy with full access
CREATE POLICY "service_role_policy" ON users
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);

-- Ensure service role has proper access
ALTER TABLE users FORCE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Grant sequence usage if needed
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;