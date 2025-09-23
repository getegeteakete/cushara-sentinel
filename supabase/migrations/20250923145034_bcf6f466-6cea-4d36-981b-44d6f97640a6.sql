-- Fix RLS policy issues by adding missing policies

-- Add missing RLS policies for attachments
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

-- Add missing RLS policies for actions
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

-- Add missing DELETE policy for incidents
CREATE POLICY "Admin can delete incidents"
ON public.incidents FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role = 'admin'
  )
);

-- Add missing INSERT policy for users (only admin can create users)
CREATE POLICY "Admin can create users"
ON public.users FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role = 'admin'
  ) OR 
  NOT EXISTS (SELECT 1 FROM public.users) -- Allow first user creation
);

-- Insert sample data with demo users
INSERT INTO public.users (id, email, role, full_name, department) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@cushara-sentinel.jp', 'admin', 'システム管理者', 'IT部門'),
('550e8400-e29b-41d4-a716-446655440001', 'manager@cushara-sentinel.jp', 'manager', '部門マネージャー', '営業部'),
('550e8400-e29b-41d4-a716-446655440002', 'member@cushara-sentinel.jp', 'member', '一般ユーザー', 'カスタマーサポート')
ON CONFLICT (email) DO NOTHING;

-- Insert sample incidents for demo
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