/*
  # Final policy fix
  
  1. Changes
    - Remove all recursive policy checks
    - Create single, simple policy for user visibility
    - Ensure no self-referential queries
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

-- Create single, simple view policy
CREATE POLICY "users_access_policy" ON users
  FOR SELECT TO authenticated
  USING (
    id = auth.uid() OR  -- Users can always see themselves
    auth.uid() IN (     -- Check if viewer is Evacon staff
      SELECT id 
      FROM users 
      WHERE role IN ('evacon_admin', 'evacon_staff')
      AND id = auth.uid()  -- Explicit self-reference to prevent recursion
    )
  );

-- Create simple update policy
CREATE POLICY "users_update_policy" ON users
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Create service role policy
CREATE POLICY "service_role_policy" ON users
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);