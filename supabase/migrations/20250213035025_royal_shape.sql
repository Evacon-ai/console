/*
  # Migrate to auth.users
  
  1. Changes
    - Drop users table and its policies
    - Move user data to auth.users metadata
    - Grant necessary permissions
    
  2. Security
    - Maintain existing role-based access through metadata
*/

-- Drop existing users table and its policies
DROP TABLE IF EXISTS users CASCADE;

-- Update existing auth.users with metadata
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'first_name', subquery.first_name,
  'last_name', subquery.last_name,
  'role', subquery.role
)
FROM (
  SELECT 
    id,
    first_name,
    last_name,
    role
  FROM users
) AS subquery
WHERE auth.users.id = subquery.id;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;

-- Create policy for self-view
CREATE POLICY "users_self_view"
  ON auth.users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Create policy for evacon_admin to view all
CREATE POLICY "admin_view_all"
  ON auth.users FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id 
      FROM auth.users 
      WHERE raw_user_meta_data->>'role' = 'evacon_admin'
    )
  );