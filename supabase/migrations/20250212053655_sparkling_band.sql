/*
  # Fix user visibility policies
  
  1. Changes
    - Simplify user visibility rules
    - Allow customer admins to view users in their organization
    - Maintain security while improving visibility
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users base access" ON users;

-- Create new user visibility policies
CREATE POLICY "Users visibility policy"
  ON users FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR -- Can view own profile
    EXISTS ( -- Admin/Staff access
      SELECT 1 
      FROM users u
      WHERE u.id = auth.uid() 
      AND (
        u.role IN ('evacon_admin', 'evacon_staff') OR -- Evacon staff can view all
        (u.role = 'customer_admin' AND EXISTS ( -- Customer admins can view their org users
          SELECT 1 
          FROM user_organizations uo1
          WHERE uo1.user_id = auth.uid()
          AND EXISTS (
            SELECT 1 
            FROM user_organizations uo2
            WHERE uo2.user_id = users.id 
            AND uo2.org_id = uo1.org_id
          )
        ))
      )
    )
  );