/*
  # Fix recursive policies
  
  1. Changes
    - Remove all recursive policy checks
    - Implement direct, non-recursive access control
    - Simplify organization access patterns
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users base access" ON users;
DROP POLICY IF EXISTS "Organizations base access" ON organizations;
DROP POLICY IF EXISTS "User organizations base access" ON user_organizations;

-- Create non-recursive policies
CREATE POLICY "Users base access"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR -- Own profile
    role IN ('evacon_admin', 'evacon_staff') -- Evacon staff can view all
  );

CREATE POLICY "Organizations base access"
  ON organizations FOR SELECT
  TO authenticated
  USING (true); -- All authenticated users can view organizations

CREATE POLICY "User organizations base access"
  ON user_organizations FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR -- Own memberships
    EXISTS ( -- Admin access
      SELECT 1 
      FROM users 
      WHERE id = auth.uid() 
      AND role IN ('evacon_admin', 'evacon_staff')
    )
  );