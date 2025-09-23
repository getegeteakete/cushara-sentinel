-- Delete existing test users from auth.users and recreate with proper hashing
DELETE FROM auth.users WHERE email IN ('admin@cushara-sentinel.jp', 'manager@cushara-sentinel.jp', 'member@cushara-sentinel.jp');

-- Use auth.signup to properly create test users
-- Note: This uses internal functions that properly hash passwords
SELECT auth.signup(
  'admin@cushara-sentinel.jp',
  'admin123',
  '{"role": "admin", "full_name": "システム管理者"}'::jsonb,
  '{"provider": "email", "providers": ["email"]}'::jsonb
);

SELECT auth.signup(
  'manager@cushara-sentinel.jp', 
  'manager123',
  '{"role": "manager", "full_name": "部門マネージャー"}'::jsonb,
  '{"provider": "email", "providers": ["email"]}'::jsonb
);

SELECT auth.signup(
  'member@cushara-sentinel.jp',
  'member123', 
  '{"role": "member", "full_name": "一般ユーザー"}'::jsonb,
  '{"provider": "email", "providers": ["email"]}'::jsonb
);

-- Confirm all test users (bypass email confirmation)
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmation_token = '',
    email_change_confirmation_status = 0
WHERE email IN ('admin@cushara-sentinel.jp', 'manager@cushara-sentinel.jp', 'member@cushara-sentinel.jp');