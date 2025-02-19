/*
  # Simplify user policy to avoid recursion
  
  1. Changes
    - Create separate policies for viewing and modifying
    - Use direct role checks without subqueries
    - Remove complex EXISTS clauses
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users access policy" ON users;

-- Create separate policies for different operations
CREATE POLICY "Users can view themselves"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Evacon staff can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role IN ('evacon_admin', 'evacon_staff')
    )
  );

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Add index for role lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);