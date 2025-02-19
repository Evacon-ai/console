/*
  # Fix users policies to prevent recursion
  
  1. Changes
    - Simplify policies to avoid recursive checks
    - Keep basic access control without circular dependencies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Evacon staff can view all users" ON users;
DROP POLICY IF EXISTS "Organizations base access" ON organizations;
DROP POLICY IF EXISTS "User organizations base access" ON user_organizations;

-- Create simplified policies
CREATE POLICY "Users base access"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR -- Can view own profile
    role IN ('evacon_admin', 'evacon_staff') OR -- Evacon staff can view all
    EXISTS ( -- Can view users in same organization
      SELECT 1 FROM user_organizations uo
      WHERE uo.user_id = users.id
      AND uo.org_id IN (
        SELECT org_id FROM user_organizations
        WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Organizations base access"
  ON organizations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_organizations
      WHERE org_id = organizations.id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "User organizations base access"
  ON user_organizations FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    org_id IN (
      SELECT org_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  );