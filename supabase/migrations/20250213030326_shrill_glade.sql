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

-- Create a simple policy for viewing users
CREATE POLICY "users_view_policy" ON users
  FOR SELECT TO authenticated
  USING (
    id = auth.uid() OR  -- Users can always see themselves
    EXISTS (  -- Check if the viewer is Evacon staff
      SELECT 1 
      FROM users viewer 
      WHERE viewer.id = auth.uid() 
      AND viewer.role IN ('evacon_admin', 'evacon_staff')
      LIMIT 1
    )
  );

-- Create a policy for updating users
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

-- Ensure proper permissions for the service role
ALTER TABLE users FORCE ROW LEVEL SECURITY;

-- Grant sequence usage if needed
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;