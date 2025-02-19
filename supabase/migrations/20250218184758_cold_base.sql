/*
  # Fix authentication schema and policies

  1. Changes
    - Simplify auth policies
    - Add necessary indexes
    - Grant proper permissions
    - Remove complex triggers and functions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "auth_users_self_access" ON auth.users;
DROP POLICY IF EXISTS "Users can view own profile" ON auth.users;
DROP POLICY IF EXISTS "Evacon staff can view all users" ON auth.users;

-- Ensure RLS is enabled
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create simplified policy for auth.users
CREATE POLICY "auth_users_policy"
  ON auth.users FOR ALL
  TO authenticated
  USING (
    id = auth.uid() OR  -- Users can see themselves
    EXISTS (  -- Evacon staff can see everyone
      SELECT 1 
      FROM auth.users viewer 
      WHERE viewer.id = auth.uid() 
      AND viewer.raw_user_meta_data->>'role' IN ('evacon_admin', 'evacon_staff')
    )
  );

-- Create function to get users with proper access control
CREATE OR REPLACE FUNCTION get_users()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  role text,
  created_at timestamptz
) SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.email,
    (u.raw_user_meta_data->>'first_name' || ' ' || u.raw_user_meta_data->>'last_name')::text as full_name,
    COALESCE(u.raw_user_meta_data->>'role', 'customer_user') as role,
    u.created_at
  FROM auth.users u
  WHERE 
    u.id = auth.uid() OR  -- Users can see themselves
    EXISTS (  -- Evacon staff can see everyone
      SELECT 1 
      FROM auth.users viewer 
      WHERE viewer.id = auth.uid() 
      AND viewer.raw_user_meta_data->>'role' IN ('evacon_admin', 'evacon_staff')
    )
  ORDER BY u.created_at DESC;
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;
GRANT EXECUTE ON FUNCTION get_users() TO authenticated;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_auth_users_role ON auth.users USING gin ((raw_user_meta_data->'role'));
CREATE INDEX IF NOT EXISTS idx_auth_users_email ON auth.users(email);

-- Grant service role full access
GRANT ALL ON auth.users TO service_role;