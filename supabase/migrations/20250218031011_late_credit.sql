/*
  # Add get_users Function

  1. Changes
    - Create get_users function to fetch combined user data
    - Function returns user data with proper role-based access control
*/

-- Create function to get users with proper access control
CREATE OR REPLACE FUNCTION get_users()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  role text,
  created_at timestamptz
) SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if the current user is Evacon staff
  IF EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' IN ('evacon_admin', 'evacon_staff')
  ) THEN
    -- Evacon staff can see all users
    RETURN QUERY
    SELECT 
      u.id,
      u.email,
      (u.raw_user_meta_data->>'first_name' || ' ' || u.raw_user_meta_data->>'last_name')::text as full_name,
      COALESCE(u.raw_user_meta_data->>'role', 'customer_user') as role,
      u.created_at
    FROM auth.users u
    ORDER BY u.created_at DESC;
  ELSE
    -- Regular users can only see themselves
    RETURN QUERY
    SELECT 
      u.id,
      u.email,
      (u.raw_user_meta_data->>'first_name' || ' ' || u.raw_user_meta_data->>'last_name')::text as full_name,
      COALESCE(u.raw_user_meta_data->>'role', 'customer_user') as role,
      u.created_at
    FROM auth.users u
    WHERE u.id = auth.uid()
    ORDER BY u.created_at DESC;
  END IF;
END;
$$;