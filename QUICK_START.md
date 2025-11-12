# クイックスタートガイド

## 現在の状態

✅ 依存関係インストール完了
✅ 環境変数ファイル作成完了  
✅ 開発サーバー起動中

## ブラウザで確認

開発サーバーが起動しています。以下のURLにアクセスしてください：

**http://localhost:8080**

## 次のステップ: データベースのセットアップ

現在、データベースに接続していないため、アプリケーションは正常に動作しません。
以下のいずれかの方法でデータベースをセットアップしてください：

### 🌐 方法1: オンラインSupabaseを使用（推奨・最も簡単）

1. https://supabase.com でアカウント作成
2. 新しいプロジェクトを作成
3. Project URLとanon keyを取得
4. `.env.local` ファイルを編集：
   ```
   VITE_SUPABASE_URL=あなたのProject URL
   VITE_SUPABASE_ANON_KEY=あなたのanon key
   ```
5. Supabase SQLエディタでマイグレーションを実行
   - `supabase/migrations/` 内の各.sqlファイルを順番に実行

### 🐳 方法2: ローカルDockerでSupabaseを使用

1. Docker Desktop for Windowsをインストール
   https://www.docker.com/products/docker-desktop
   
2. Docker Desktopを起動

3. Supabaseを起動：
   ```bash
   npx supabase start
   ```
   
4. 自動的に`.env.local`が正しく設定されます

## マイグレーションファイルの実行順序

Supabase SQLエディタで、以下の順番でファイルを実行してください：

1. ✅ `20250923144852_fc860a0b-9fc5-4e69-a45f-a72f31c2539c.sql` - 基本テーブル作成
2. ✅ `20250923145034_bcf6f466-6cea-4d36-981b-44d6f97640a6.sql`
3. ✅ `20250923145104_2b9dc709-6bf1-42e1-9214-0b2e6dcd31d4.sql`
4. ✅ `20250923150534_181bd51d-0d71-4366-979d-29a3ac72b61c.sql`
5. ✅ `20250923150558_4fb38baa-ad0b-4374-abd6-1137b8542d4f.sql`
6. ✅ `20250923150658_6df62c4b-0f93-4fdd-9ee8-b59a79073c52.sql`
7. ✅ `20250923150916_f8e101e5-f99d-496d-91bc-2dfb3c84fc8e.sql`
8. ✅ `20250923151043_45403786-cf9e-4757-931a-6464340c8677.sql`
9. ✅ `20250924203256_0d6a55b2-01ea-4b8c-9855-177151037e4e.sql`

## テストユーザーの作成

データベースセットアップ後、Supabaseダッシュボードで：

1. **Authentication > Users** で新しいユーザーを作成
2. **SQL Editor** で以下を実行：

```sql
-- 作成したユーザーのUUIDを使用
INSERT INTO public.users (id, email, role, full_name, department)
VALUES (
  'ユーザーのUUID（Authenticationページでコピーしたもの）',
  'admin@example.com',
  'admin',
  '管理者ユーザー',
  '管理部'
);
```

## トラブルシューティング

### 「Supabaseに接続できません」エラー
- `.env.local` の設定を確認
- Supabaseプロジェクトが起動しているか確認
- ページをリロード（Ctrl + Shift + R）

### ページが表示されない
- http://localhost:8080 にアクセスしているか確認
- ターミナルでエラーが出ていないか確認
- 開発サーバーを再起動：
  ```bash
  # Ctrl+C で停止してから
  npm run dev
  ```

### マイグレーションエラー
- ファイルを順番通りに実行しているか確認
- 前のマイグレーションが成功しているか確認

## 便利なコマンド

```bash
# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー（ビルド後）
npm run preview

# Lint
npm run lint
```

## このアプリについて

**CusHara Sentinel** - カスタマーハラスメント管理システム

- ハラスメント事案の報告と管理
- AI分析による自動分類とリスク評価
- ロールベースのアクセス制御
- プライバシー保護機能


