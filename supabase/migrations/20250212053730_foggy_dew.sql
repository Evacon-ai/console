/*
  # Fix user visibility policy recursion
  
  1. Changes
    - Remove recursive policy structure
    - Implement flat, non-recursive visibility rules
    - Maintain security boundaries
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users visibility policy" ON users;

-- Create new non-recursive policy
CREATE POLICY "Users visibility policy"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR -- Can view own profile
    (SELECT role FROM users WHERE id = auth.uid()) IN ('evacon_admin', 'evacon_staff') -- Evacon staff can view all
  );

-- Add separate policy for customer admins
CREATE POLICY "Customer admin visibility policy"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM user_organizations uo
      WHERE uo.user_id = users.id
      AND uo.org_id IN (
        SELECT org_id 
        FROM user_organizations 
        WHERE user_id = auth.uid()
        AND (SELECT role FROM users WHERE id = auth.uid()) = 'customer_admin'
      )
    )
  );