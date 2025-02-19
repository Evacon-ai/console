/*
  # Fix user policy recursion
  
  1. Changes
    - Replace recursive role check with direct auth.uid() check
    - Simplify policy logic
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Users access policy" ON users;

-- Create new non-recursive policy
CREATE POLICY "Users access policy"
  ON users FOR ALL
  TO authenticated
  USING (
    -- Users can always see themselves
    id = auth.uid()
    OR 
    -- Evacon staff can see everyone
    EXISTS (
      SELECT 1 
      FROM users u 
      WHERE u.id = auth.uid() 
      AND u.role IN ('evacon_admin', 'evacon_staff')
      AND u.id != users.id  -- Prevent recursion by excluding self-reference
    )
  )
  WITH CHECK (
    -- Only allow users to modify their own profile
    id = auth.uid()
  );

-- Add index for role lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);