-- Drop existing policies
DROP POLICY IF EXISTS "users_access_policy" ON users;
DROP POLICY IF EXISTS "service_role_policy" ON users;

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON users TO service_role;
GRANT SELECT, UPDATE ON users TO authenticated;

-- Create single, simple view policy that checks the viewer's role
CREATE POLICY "users_access_policy" ON users
  FOR ALL TO authenticated
  USING (
    id = auth.uid() OR  -- Users can always see themselves
    EXISTS (  -- Check if the viewer is Evacon staff
      SELECT 1 
      FROM users viewer 
      WHERE viewer.id = auth.uid() 
      AND viewer.role IN ('evacon_admin', 'evacon_staff')
    )
  )
  WITH CHECK (id = auth.uid());  -- Only allow users to modify their own profile

-- Create service role policy
CREATE POLICY "service_role_policy" ON users
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);