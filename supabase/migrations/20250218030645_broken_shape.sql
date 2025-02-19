/*
  # Add User Update Trigger

  1. Changes
    - Create trigger to invoke edge function when user data changes
    - Add trigger for auth.users table
*/

-- Create trigger for user updates
CREATE OR REPLACE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION supabase_functions.http_request(
    'https://xrervizpmnaxamrjhlwr.functions.supabase.co/update-user'
  );

-- Ensure RLS is enabled
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated;

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