/*
  # Fix user visibility policy recursion - final version
  
  1. Changes
    - Remove all recursive policy structures
    - Implement direct role-based visibility
    - Store user role directly in auth.users metadata
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users visibility policy" ON users;
DROP POLICY IF EXISTS "Customer admin visibility policy" ON users;

-- Create single, non-recursive policy
CREATE POLICY "Users access policy"
  ON users FOR SELECT
  TO authenticated
  USING (
    -- Users can always see themselves
    id = auth.uid()
    OR 
    -- Evacon staff (admin/staff) can see everyone
    EXISTS (
      SELECT 1 
      FROM auth.users au 
      WHERE au.id = auth.uid() 
      AND (
        au.raw_user_meta_data->>'role' IN ('evacon_admin', 'evacon_staff')
      )
    )
    OR
    -- Customer admins can see users in their organizations
    EXISTS (
      SELECT 1 
      FROM auth.users au 
      INNER JOIN user_organizations uo1 ON uo1.user_id = au.id
      INNER JOIN user_organizations uo2 ON uo2.org_id = uo1.org_id
      WHERE au.id = auth.uid() 
      AND au.raw_user_meta_data->>'role' = 'customer_admin'
      AND uo2.user_id = users.id
    )
  );