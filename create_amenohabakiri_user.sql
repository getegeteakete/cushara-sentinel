-- ==========================================
-- 株式会社AMENOHABAKIRI 管理者ユーザー作成
-- メール: amenohabakiri@ei-life.co.jp
-- パスワード: aa793179
-- ==========================================

DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- 1. 既存のユーザーを削除
  DELETE FROM public.users WHERE email = 'amenohabakiri@ei-life.co.jp';
  DELETE FROM auth.users WHERE email = 'amenohabakiri@ei-life.co.jp';
  
  PERFORM pg_sleep(0.5);
  
  -- 2. 新しいUUIDを生成
  new_user_id := gen_random_uuid();
  
  -- 3. 認証ユーザーを作成
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    'amenohabakiri@ei-life.co.jp',
    crypt('aa793179', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name": "AMENOHABAKIRI"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );
  
  -- 4. ユーザープロファイルを作成
  INSERT INTO public.users (id, email, role, full_name, department)
  VALUES (
    new_user_id,
    'amenohabakiri@ei-life.co.jp',
    'admin',
    'AMENOHABAKIRI',
    '株式会社AMENOHABAKIRI'
  );
  
  RAISE NOTICE 'ユーザー作成完了: amenohabakiri@ei-life.co.jp (UUID: %)', new_user_id;
END $$;

-- ==========================================
-- 確認用クエリ
-- ==========================================
SELECT 
  'auth.users' as source,
  au.id,
  au.email,
  'confirmed' as status,
  au.created_at
FROM auth.users au
WHERE au.email = 'amenohabakiri@ei-life.co.jp'

UNION ALL

SELECT 
  'public.users' as source,
  u.id,
  u.email,
  u.role as status,
  u.created_at
FROM public.users u
WHERE u.email = 'amenohabakiri@ei-life.co.jp'
ORDER BY source;

-- パスワードテスト
SELECT 
  CASE 
    WHEN encrypted_password = crypt('aa793179', encrypted_password) 
    THEN '✅ パスワード正常'
    ELSE '❌ パスワード不一致'
  END as password_check
FROM auth.users
WHERE email = 'amenohabakiri@ei-life.co.jp';

