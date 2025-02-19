/*
  # Fix user policy recursion with simplified approach
  
  1. Changes
    - Single policy for viewing
    - Direct role check without subqueries
    - Remove all complex conditions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view themselves" ON users;
DROP POLICY IF EXISTS "Evacon staff can view all users" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

-- Create single simple policy
CREATE POLICY "users_policy"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR role IN ('evacon_admin', 'evacon_staff')
  );

-- Add policy for updates
CREATE POLICY "users_update_policy"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Add index for role lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);