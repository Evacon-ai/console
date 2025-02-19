/*
  # Simplify database structure to users only
  
  1. Changes
    - Drop organization-related tables
    - Simplify user policies
    - Keep only essential user functionality
*/

-- Drop organization-related tables
DROP TABLE IF EXISTS user_organizations CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- Drop existing policies
DROP POLICY IF EXISTS "Users access policy" ON users;

-- Create simplified user policy
CREATE POLICY "Users access policy"
  ON users FOR SELECT
  TO authenticated
  USING (
    -- Users can always see themselves
    id = auth.uid()
    OR 
    -- Evacon staff (admin/staff) can see everyone
    (SELECT role FROM users WHERE id = auth.uid()) IN ('evacon_admin', 'evacon_staff')
  );

-- Add index for role lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);