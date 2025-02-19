/*
  # Fix authentication schema and policies

  1. Changes
    - Drop existing policies and triggers
    - Create simplified auth policies
    - Add necessary indexes
    - Grant proper permissions
*/

-- Drop existing objects
DROP TRIGGER IF EXISTS sync_user_data ON auth.users;
DROP FUNCTION IF EXISTS sync_user_data();
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
DROP TABLE IF EXISTS public.users CASCADE;

-- Ensure RLS is enabled
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON auth.users;
DROP POLICY IF EXISTS "Evacon staff can view all users" ON auth.users;

-- Create simplified policies
CREATE POLICY "auth_users_self_access"
  ON auth.users FOR SELECT
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
  -- Check if the current user is Evacon staff
  IF EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' IN ('evacon_admin', 'evacon_staff')
  ) THEN
    -- Evacon staff can see all users
    RETURN QUERY
    SELECT 
      u.id,
      u.email,
      (u.raw_user_meta_data->>'first_name' || ' ' || u.raw_user_meta_data->>'last_name')::text as full_name,
      COALESCE(u.raw_user_meta_data->>'role', 'customer_user') as role,
      u.created_at
    FROM auth.users u
    ORDER BY u.created_at DESC;
  ELSE
    -- Regular users can only see themselves
    RETURN QUERY
    SELECT 
      u.id,
      u.email,
      (u.raw_user_meta_data->>'first_name' || ' ' || u.raw_user_meta_data->>'last_name')::text as full_name,
      COALESCE(u.raw_user_meta_data->>'role', 'customer_user') as role,
      u.created_at
    FROM auth.users u
    WHERE u.id = auth.uid()
    ORDER BY u.created_at DESC;
  END IF;
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;
GRANT EXECUTE ON FUNCTION get_users() TO authenticated;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_auth_users_role ON auth.users USING gin ((raw_user_meta_data->'role'));
CREATE INDEX IF NOT EXISTS idx_auth_users_email ON auth.users(email);