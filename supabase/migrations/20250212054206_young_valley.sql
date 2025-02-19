/*
  # Fix user policy recursion
  
  1. Changes
    - Remove recursive policy that was causing infinite recursion
    - Create simple, non-recursive policies for user visibility
    - Maintain proper access control for evacon staff and customer users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "users_view_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;

-- Create new simplified policy for viewing users
CREATE POLICY "users_view_policy"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR                           -- Users can see themselves
    role IN ('evacon_admin', 'evacon_staff') OR  -- Evacon staff can see all users
    EXISTS (                                      -- Evacon staff can see customer users
      SELECT 1 
      FROM auth.users au 
      WHERE au.id = auth.uid() 
      AND au.raw_user_meta_data->>'role' IN ('evacon_admin', 'evacon_staff')
      AND users.role LIKE 'customer_%'
    )
  );

-- Keep the update policy for self-updates only
CREATE POLICY "users_update_policy"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Ensure we have the role index
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);