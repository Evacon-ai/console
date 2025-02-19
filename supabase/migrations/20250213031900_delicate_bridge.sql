/*
  # Fix User Policies
  
  1. Changes
    - Drop all existing policies
    - Create simple non-recursive policies for:
      - Self-view (login)
      - Evacon admin view all
    
  2. Security
    - Users can only view their own profile
    - Evacon admins can view all users
    - No recursive queries
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "users_auth_policy" ON users;
DROP POLICY IF EXISTS "evacon_admin_view_all" ON users;
DROP POLICY IF EXISTS "service_role_policy" ON users;

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON users TO authenticated;

-- Create basic self-view policy (for login)
CREATE POLICY "users_self_view"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Create non-recursive admin view policy
CREATE POLICY "admin_view_all"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM auth.users au 
      WHERE au.id = auth.uid() 
      AND au.raw_user_meta_data->>'role' = 'evacon_admin'
    )
  );