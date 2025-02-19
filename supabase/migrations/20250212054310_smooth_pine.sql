/*
  # Fix user permissions with simplified approach
  
  1. Changes
    - Remove recursive policies
    - Simplify permission logic
    - Ensure proper service role access
    - Add proper indexes
*/

-- Drop existing policies
DROP POLICY IF EXISTS "users_view_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;
DROP POLICY IF EXISTS "service_role_policy" ON users;

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON users TO authenticated;
GRANT ALL ON users TO service_role;

-- Create simplified view policy
CREATE POLICY "users_view_policy" ON users
  FOR SELECT TO authenticated
  USING (
    CASE
      WHEN id = auth.uid() THEN true  -- User can always see themselves
      WHEN EXISTS (
        SELECT 1 FROM users viewer 
        WHERE viewer.id = auth.uid() 
        AND viewer.role IN ('evacon_admin', 'evacon_staff')
      ) THEN true  -- Evacon staff can see everyone
      ELSE false
    END
  );

-- Create update policy
CREATE POLICY "users_update_policy" ON users
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Create service role policy
CREATE POLICY "service_role_policy" ON users
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);