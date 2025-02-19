/*
  # Add Evacon Admin View Policy
  
  1. Changes
    - Add policy for evacon_admin to view all users
    
  2. Security
    - Only evacon_admin role can view all users
    - Maintains existing RLS
*/

-- Create policy for evacon_admin to view all users
CREATE POLICY "evacon_admin_view_all"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM users viewer 
      WHERE viewer.id = auth.uid() 
      AND viewer.role = 'evacon_admin'
    )
  );