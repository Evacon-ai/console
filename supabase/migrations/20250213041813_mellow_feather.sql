/*
  # Update user management to use auth.users

  1. Changes
    - Drop users table and associated objects
    - Update policies for auth.users table
    - Grant necessary permissions

  2. Security
    - Enable RLS on auth.users
    - Add policies for viewing users based on role
*/

-- Drop users table and associated objects
DROP TABLE IF EXISTS users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- Enable RLS on auth.users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON auth.users;
DROP POLICY IF EXISTS "Evacon staff can view all users" ON auth.users;

-- Create policy for users to view themselves
CREATE POLICY "Users can view own profile"
  ON auth.users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Create policy for Evacon staff to view all users
CREATE POLICY "Evacon staff can view all users"
  ON auth.users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM auth.users viewer 
      WHERE viewer.id = auth.uid() 
      AND viewer.raw_user_meta_data->>'role' IN ('evacon_admin', 'evacon_staff')
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;