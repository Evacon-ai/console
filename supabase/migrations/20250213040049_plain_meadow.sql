/*
  # Create User Viewing Policies

  1. Security
    - Enable RLS on auth.users
    - Add policies for:
      - Users can view their own profile
      - Evacon admins can view all users
      - Evacon staff can view all users
*/

-- Enable RLS on auth.users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

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
      AND (
        viewer.raw_user_meta_data->>'role' IN ('evacon_admin', 'evacon_staff')
      )
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;