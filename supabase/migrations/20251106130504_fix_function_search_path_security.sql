/*
  # Fix Function Search Path Security Vulnerability
  
  1. Security Fix
    - Recreate `prevent_multiple_users` function with immutable search_path
    - Use fully qualified table names to prevent SQL injection via search_path manipulation
    - Set explicit `SET search_path = ''` to prevent search_path attacks
  
  2. What this prevents
    - Malicious users cannot manipulate the search_path to hijack function calls
    - Ensures the function only accesses the intended schema (auth.users)
    - Prevents privilege escalation attacks through search_path manipulation
*/

-- Drop the existing function
DROP FUNCTION IF EXISTS public.prevent_multiple_users() CASCADE;

-- Recreate with secure search_path configuration
CREATE OR REPLACE FUNCTION public.prevent_multiple_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if a user already exists using fully qualified table name
  IF (SELECT COUNT(*) FROM auth.users) >= 1 THEN
    RAISE EXCEPTION 'Only one admin user is allowed in this application. Please contact the system administrator.';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS prevent_multiple_users_trigger ON auth.users;
CREATE TRIGGER prevent_multiple_users_trigger
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_multiple_users();