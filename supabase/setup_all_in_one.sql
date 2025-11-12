-- ==========================================
-- CusHara Sentinel - 統合データベースセットアップ
-- このファイルをSupabase SQLエディタで実行してください
-- ==========================================

-- ==========================================
-- 1. 基本テーブル作成
-- ==========================================

-- ユーザーテーブル
CREATE TABLE IF NOT EXISTS public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'member', 'auditor')) DEFAULT 'member',
  department TEXT,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- 事案テーブル
CREATE TABLE IF NOT EXISTS public.incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  incident_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'reviewing', 'resolved', 'escalated')) DEFAULT 'pending',
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  
  -- AI分析結果
  ai_is_cushara BOOLEAN,
  ai_categories TEXT[],
  ai_risk_score INTEGER CHECK (ai_risk_score >= 0 AND ai_risk_score <= 100),
  ai_reasoning TEXT,
  ai_recommended_actions TEXT[],
  ai_guideline_refs TEXT[],
  ai_analyzed_at TIMESTAMP WITH TIME ZONE,
  
  -- プライバシー設定
  personal_info_masked BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 添付ファイルテーブル
CREATE TABLE IF NOT EXISTS public.attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_id UUID REFERENCES public.incidents(id) ON DELETE CASCADE NOT NULL,
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_by UUID REFERENCES public.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- アクションテーブル
CREATE TABLE IF NOT EXISTS public.actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_id UUID REFERENCES public.incidents(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('comment', 'status_change', 'escalation', 'resolution')),
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ポリシーテーブル
CREATE TABLE IF NOT EXISTS public.policies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'archived')) DEFAULT 'draft',
  created_by UUID REFERENCES public.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 2. Row Level Security (RLS) の有効化
-- ==========================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 3. ヘルパー関数の作成
-- ==========================================

-- 管理者チェック関数（再帰回避）
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

-- ユーザーロール取得関数
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

-- タイムスタンプ更新関数
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 新規ユーザープロファイル自動作成関数
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

-- ==========================================
-- 4. RLSポリシーの作成 - Users
-- ==========================================

DROP POLICY IF EXISTS "Users can view their own profile and admins can view all" ON public.users;
CREATE POLICY "Users can view their own profile and admins can view all"
ON public.users
FOR SELECT
TO authenticated
USING (
  id::text = auth.uid()::text OR 
  public.is_admin()
);

DROP POLICY IF EXISTS "Admin can create users" ON public.users;
CREATE POLICY "Admin can create users"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin() OR 
  NOT EXISTS (SELECT 1 FROM public.users LIMIT 1)
);

DROP POLICY IF EXISTS "Admin can update users" ON public.users;
CREATE POLICY "Admin can update users"
ON public.users
FOR UPDATE
TO authenticated
USING (public.is_admin());

-- ==========================================
-- 5. RLSポリシーの作成 - Incidents
-- ==========================================

DROP POLICY IF EXISTS "Users can view incidents based on role" ON public.incidents;
CREATE POLICY "Users can view incidents based on role"
ON public.incidents FOR SELECT
USING (
  user_id::text = auth.uid()::text OR
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role IN ('admin', 'manager', 'auditor')
  )
);

DROP POLICY IF EXISTS "Users can create their own incidents" ON public.incidents;
CREATE POLICY "Users can create their own incidents"
ON public.incidents FOR INSERT
WITH CHECK (user_id::text = auth.uid()::text);

DROP POLICY IF EXISTS "Users can update their own incidents or managers can update all" ON public.incidents;
CREATE POLICY "Users can update their own incidents or managers can update all"
ON public.incidents FOR UPDATE
USING (
  user_id::text = auth.uid()::text OR
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role IN ('admin', 'manager')
  )
);

DROP POLICY IF EXISTS "Admin can delete incidents" ON public.incidents;
CREATE POLICY "Admin can delete incidents"
ON public.incidents FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role = 'admin'
  )
);

-- ==========================================
-- 6. RLSポリシーの作成 - Attachments
-- ==========================================

DROP POLICY IF EXISTS "Users can view attachments of accessible incidents" ON public.attachments;
CREATE POLICY "Users can view attachments of accessible incidents"
ON public.attachments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.incidents 
    WHERE incidents.id = incident_id 
    AND (
      incidents.user_id::text = auth.uid()::text OR
      EXISTS (
        SELECT 1 FROM public.users 
        WHERE users.id::text = auth.uid()::text 
        AND users.role IN ('admin', 'manager', 'auditor')
      )
    )
  )
);

DROP POLICY IF EXISTS "Users can upload attachments to their incidents" ON public.attachments;
CREATE POLICY "Users can upload attachments to their incidents"
ON public.attachments FOR INSERT
WITH CHECK (
  uploaded_by::text = auth.uid()::text AND
  EXISTS (
    SELECT 1 FROM public.incidents 
    WHERE incidents.id = incident_id 
    AND incidents.user_id::text = auth.uid()::text
  )
);

-- ==========================================
-- 7. RLSポリシーの作成 - Actions
-- ==========================================

DROP POLICY IF EXISTS "Users can view actions of accessible incidents" ON public.actions;
CREATE POLICY "Users can view actions of accessible incidents"
ON public.actions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.incidents 
    WHERE incidents.id = incident_id 
    AND (
      incidents.user_id::text = auth.uid()::text OR
      EXISTS (
        SELECT 1 FROM public.users 
        WHERE users.id::text = auth.uid()::text 
        AND users.role IN ('admin', 'manager', 'auditor')
      )
    )
  )
);

DROP POLICY IF EXISTS "Users can add actions to accessible incidents" ON public.actions;
CREATE POLICY "Users can add actions to accessible incidents"
ON public.actions FOR INSERT
WITH CHECK (
  user_id::text = auth.uid()::text AND
  EXISTS (
    SELECT 1 FROM public.incidents 
    WHERE incidents.id = incident_id 
    AND (
      incidents.user_id::text = auth.uid()::text OR
      EXISTS (
        SELECT 1 FROM public.users 
        WHERE users.id::text = auth.uid()::text 
        AND users.role IN ('admin', 'manager')
      )
    )
  )
);

-- ==========================================
-- 8. RLSポリシーの作成 - Policies
-- ==========================================

DROP POLICY IF EXISTS "All authenticated users can view active policies" ON public.policies;
CREATE POLICY "All authenticated users can view active policies"
ON public.policies FOR SELECT
USING (status = 'active' OR EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text 
  AND users.role IN ('admin', 'manager')
));

DROP POLICY IF EXISTS "Admin and managers can create policies" ON public.policies;
CREATE POLICY "Admin and managers can create policies"
ON public.policies FOR INSERT
WITH CHECK (
  created_by::text = auth.uid()::text AND
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role IN ('admin', 'manager')
  )
);

DROP POLICY IF EXISTS "Admin and managers can update policies" ON public.policies;
CREATE POLICY "Admin and managers can update policies"
ON public.policies FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role IN ('admin', 'manager')
  )
);

DROP POLICY IF EXISTS "Admin can delete policies" ON public.policies;
CREATE POLICY "Admin can delete policies"
ON public.policies FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role = 'admin'
  )
);

-- ==========================================
-- 9. トリガーの作成
-- ==========================================

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_incidents_updated_at ON public.incidents;
CREATE TRIGGER update_incidents_updated_at
BEFORE UPDATE ON public.incidents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_policies_updated_at ON public.policies;
CREATE TRIGGER update_policies_updated_at
BEFORE UPDATE ON public.policies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================
-- 10. サンプルデータの挿入
-- ==========================================

-- サンプルユーザーの挿入
INSERT INTO public.users (id, email, role, full_name, department) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@cushara-sentinel.jp', 'admin', 'システム管理者', 'IT部門'),
('550e8400-e29b-41d4-a716-446655440001', 'manager@cushara-sentinel.jp', 'manager', '部門マネージャー', '営業部'),
('550e8400-e29b-41d4-a716-446655440002', 'member@cushara-sentinel.jp', 'member', '一般ユーザー', 'カスタマーサポート')
ON CONFLICT (email) DO NOTHING;

-- サンプル事案の挿入
INSERT INTO public.incidents (
  id, user_id, title, description, incident_date, 
  ai_is_cushara, ai_categories, ai_risk_score, ai_reasoning, 
  ai_recommended_actions, ai_guideline_refs, ai_analyzed_at, status
) VALUES
(
  '660e8400-e29b-41d4-a716-446655440000',
  '550e8400-e29b-41d4-a716-446655440002',
  '顧客からの執拗な電話対応',
  'お客様から2時間にわたり執拗に電話があり、「責任者を出せ」「こんなサービスは詐欺だ」などの発言が続きました。途中で電話を切ろうとすると「逃げるのか」と脅迫的な言動がありました。',
  now() - interval '2 days',
  true,
  ARRAY['脅迫', '長時間拘束', '過度な要求'],
  85,
  '2時間という長時間の拘束、脅迫的言動、執拗な要求が確認され、カスタマーハラスメントに該当する可能性が高い',
  ARRAY['上司へ報告', '法務相談', '警察#9110への相談'],
  ARRAY['東京都指針第2条', '迷惑行為防止条例'],
  now() - interval '2 days',
  'reviewing'
),
(
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440002',
  'メールでの人格否定的内容',
  '製品の不具合について問い合わせをいただいたお客様から「お前たちは詐欺師だ」「会社ごと潰してやる」「個人的に恨みを持った」などの内容のメールを受信しました。',
  now() - interval '1 day',
  true,
  ARRAY['脅迫', '人格否定', '暴言'],
  92,
  '明確な脅迫と人格否定の言葉が使用されており、重大なカスタマーハラスメント事案',
  ARRAY['上司へ報告', '法務相談', '警察への届出検討'],
  ARRAY['東京都指針第2条', '刑法第222条脅迫罪'],
  now() - interval '1 day',
  'escalated'
)
ON CONFLICT (id) DO NOTHING;

-- サンプルポリシーの挿入
INSERT INTO public.policies (title, content, status, created_by) VALUES
(
  'カスタマーハラスメント対応基本方針',
  '# カスタマーハラスメント対応基本方針

## 1. 基本的な考え方
当社は、お客様からの正当な申出やご要望については真摯に対応いたします。しかし、暴力的な行為、脅迫的な言動、差別的発言、長時間にわたる拘束、過度な要求など、従業員の人格を否定するような行為については、カスタマーハラスメントとして毅然とした対応を行います。

## 2. 対象となる行為
- 暴力的行為や威嚇
- 脅迫的言動
- 差別的発言や人格否定
- 長時間にわたる拘束
- 過度で不当な要求
- その他従業員の尊厳を害する行為

## 3. 対応方針
1. 事案発生時は速やかにシステムに登録
2. AIによる客観的な判定を実施
3. リスクレベルに応じた適切な対応
4. 必要に応じて外部機関との連携',
  'active',
  '550e8400-e29b-41d4-a716-446655440000'
),
(
  'システム運用ガイドライン',
  '# CusHara Sentinel システム運用ガイドライン

## システムの目的
東京都の条例・指針に基づき、AIを活用してカスタマーハラスメントの適切な判定と対応を支援する。

## 使用方法
1. 事案発生時の登録手順
2. AI判定結果の確認方法
3. 対応アクションの記録
4. 報告書の作成

## 注意事項
- 個人情報の適切な取り扱い
- 判定結果の客観的な評価
- 記録の正確性確保',
  'active',
  '550e8400-e29b-41d4-a716-446655440000'
)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- セットアップ完了
-- ==========================================
-- このSQLの実行が完了したら、次のステップに進んでください：
-- 1. Authentication > Users でテストユーザーを作成
-- 2. そのユーザーのUUIDをコピー
-- 3. 以下のSQLを実行してusersテーブルに追加
--
-- UPDATE public.users 
-- SET id = 'あなたのUUID' 
-- WHERE email = 'admin@cushara-sentinel.jp';


