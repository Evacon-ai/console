/*
  # Fix Schema Issues

  1. Changes
    - Create supabase_functions schema
    - Grant necessary permissions
    - Create required extensions
*/

-- Create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS supabase_functions;

-- Create required extensions
CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

-- Grant necessary permissions
GRANT USAGE ON SCHEMA supabase_functions TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA supabase_functions TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA supabase_functions TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA supabase_functions TO postgres, anon, authenticated, service_role;

-- Create function to invoke edge function
CREATE OR REPLACE FUNCTION supabase_functions.http_request()
RETURNS trigger AS $$
BEGIN
  PERFORM
    net.http_post(
      url := TG_ARGV[0],
      headers := '{"Content-Type": "application/json"}',
      body := json_build_object(
        'old_record', OLD,
        'record', NEW,
        'type', TG_OP,
        'table', TG_TABLE_NAME,
        'schema', TG_TABLE_SCHEMA
      )::text
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;