-- Fix password hashes for test users using bcrypt via pgcrypto
UPDATE auth.users 
SET encrypted_password = crypt('admin123', gen_salt('bf')),
    email_confirmed_at = NOW(),
    updated_at = NOW()
WHERE email = 'admin@cushara-sentinel.jp';

UPDATE auth.users 
SET encrypted_password = crypt('manager123', gen_salt('bf')),
    email_confirmed_at = NOW(),
    updated_at = NOW()
WHERE email = 'manager@cushara-sentinel.jp';

UPDATE auth.users 
SET encrypted_password = crypt('member123', gen_salt('bf')),
    email_confirmed_at = NOW(),
    updated_at = NOW()
WHERE email = 'member@cushara-sentinel.jp';