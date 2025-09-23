-- Add missing RLS policies for policies table
CREATE POLICY "All authenticated users can view active policies"
ON public.policies FOR SELECT
USING (status = 'active' OR EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text 
  AND users.role IN ('admin', 'manager')
));

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

CREATE POLICY "Admin and managers can update policies"
ON public.policies FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role IN ('admin', 'manager')
  )
);

CREATE POLICY "Admin can delete policies"
ON public.policies FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text 
    AND users.role = 'admin'
  )
);

-- Insert sample policy data
INSERT INTO public.policies (title, content, status, created_by) VALUES
(
  'カスタマーハラスメント対応基本方針',
  '# カスタマーハラスメント対応基本方針\n\n## 1. 基本的な考え方\n当社は、お客様からの正当な申出やご要望については真摯に対応いたします。しかし、暴力的な行為、脅迫的な言動、差別的発言、長時間にわたる拘束、過度な要求など、従業員の人格を否定するような行為については、カスタマーハラスメントとして毅然とした対応を行います。\n\n## 2. 対象となる行為\n- 暴力的行為や威嚇\n- 脅迫的言動\n- 差別的発言や人格否定\n- 長時間にわたる拘束\n- 過度で不当な要求\n- その他従業員の尊厳を害する行為\n\n## 3. 対応方針\n1. 事案発生時は速やかにシステムに登録\n2. AIによる客観的な判定を実施\n3. リスクレベルに応じた適切な対応\n4. 必要に応じて外部機関との連携',
  'active',
  '550e8400-e29b-41d4-a716-446655440000'
),
(
  'システム運用ガイドライン',
  '# CusHara Sentinel システム運用ガイドライン\n\n## システムの目的\n東京都の条例・指針に基づき、AIを活用してカスタマーハラスメントの適切な判定と対応を支援する。\n\n## 使用方法\n1. 事案発生時の登録手順\n2. AI判定結果の確認方法\n3. 対応アクションの記録\n4. 報告書の作成\n\n## 注意事項\n- 個人情報の適切な取り扱い\n- 判定結果の客観的な評価\n- 記録の正確性確保',
  'active',
  '550e8400-e29b-41d4-a716-446655440000'
)
ON CONFLICT (id) DO NOTHING;