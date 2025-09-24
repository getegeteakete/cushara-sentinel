-- Fix infinite recursion in users table RLS policies
-- Drop problematic policies that cause infinite recursion
DROP POLICY IF EXISTS "Admin can create users" ON public.users;
DROP POLICY IF EXISTS "Admin can update users" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile and admins can view all" ON public.users;

-- Create a security definer function to check admin role without recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.users 
    WHERE id::text = auth.uid()::text 
    AND role = 'admin'
  )
$$;

-- Create a security definer function to check user role without recursion
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role 
  FROM public.users 
  WHERE id::text = auth.uid()::text
  LIMIT 1
$$;

-- Recreate safe policies for users table
CREATE POLICY "Users can view their own profile and admins can view all"
ON public.users
FOR SELECT
TO authenticated
USING (
  id::text = auth.uid()::text OR 
  public.is_admin()
);

CREATE POLICY "Admin can create users"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin() OR 
  NOT EXISTS (SELECT 1 FROM public.users LIMIT 1) -- Allow first user creation
);

CREATE POLICY "Admin can update users"
ON public.users
FOR UPDATE
TO authenticated
USING (public.is_admin());

-- Create trigger to automatically create user profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'member'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();