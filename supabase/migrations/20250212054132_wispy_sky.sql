/*
  # Update user policy for customer visibility
  
  1. Changes
    - Allow evacon admins and staff to see all users
    - Allow users to see themselves
    - Allow evacon roles to see all customer users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "users_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;

-- Create new policy for viewing users
CREATE POLICY "users_view_policy"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR                                    -- Users can see themselves
    role IN ('evacon_admin', 'evacon_staff') OR          -- Evacon staff can see all users
    (
      (SELECT role FROM users WHERE id = auth.uid()) 
      IN ('evacon_admin', 'evacon_staff') AND            -- Evacon staff can see customer users
      users.role LIKE 'customer_%'
    )
  );

-- Keep the update policy unchanged
CREATE POLICY "users_update_policy"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Ensure we have the role index
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);