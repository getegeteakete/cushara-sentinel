# Supabaseオンラインセットアップ - 詳細ガイド

このガイドに従えば、10分程度で完全に動作する環境が整います。

## ステップ1: Supabaseアカウントの作成

1. https://supabase.com にアクセス
2. 右上の「Start your project」をクリック
3. GitHubアカウントでサインアップ（推奨）、またはメールアドレスで登録

## ステップ2: 新しいプロジェクトの作成

1. ダッシュボードで「New project」ボタンをクリック
2. 以下の情報を入力：
   - **Name**: `cushara-sentinel`（または任意の名前）
   - **Database Password**: 強力なパスワードを生成（保存しておいてください）
   - **Region**: `Northeast Asia (Tokyo)` を選択（日本から最も近い）
   - **Pricing Plan**: Free（無料プラン）
3. 「Create new project」をクリック
4. プロジェクトの準備に1-2分かかります

## ステップ3: API認証情報の取得

1. プロジェクトが準備完了したら、左サイドバーの **⚙️ Settings** をクリック
2. **API** セクションを開く
3. 以下の2つの値を見つけてコピー：
   
   **Project URL**（例）:
   ```
   https://abcdefghijk.supabase.co
   ```
   
   **Project API keys** の `anon` `public` キー（例）:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...（長い文字列）
   ```

## ステップ4: ローカル環境変数の設定

1. プロジェクトフォルダの `.env.local` ファイルを開く
2. 以下のように編集（コピーした値を貼り付け）:

```env
VITE_SUPABASE_URL=https://あなたのプロジェクトID.supabase.co
VITE_SUPABASE_ANON_KEY=あなたのanon_keyをここに貼り付け
```

3. ファイルを保存

## ステップ5: データベーススキーマの作成

Supabaseダッシュボードで：

1. 左サイドバーの **🗂️ SQL Editor** をクリック
2. 「New query」をクリック

### マイグレーション1: 基本テーブル

`supabase/migrations/20250923144852_fc860a0b-9fc5-4e69-a45f-a72f31c2539c.sql` を開いて全内容をコピー

SQLエディタに貼り付けて、右下の「Run」をクリック

✅ 成功メッセージが表示されればOK

### マイグレーション2-9: 残りのマイグレーション

同様に、以下のファイルを**順番に**実行：

2. `20250923145034_bcf6f466-6cea-4d36-981b-44d6f97640a6.sql`
3. `20250923145104_2b9dc709-6bf1-42e1-9214-0b2e6dcd31d4.sql`
4. `20250923150534_181bd51d-0d71-4366-979d-29a3ac72b61c.sql`
5. `20250923150558_4fb38baa-ad0b-4374-abd6-1137b8542d4f.sql`
6. `20250923150658_6df62c4b-0f93-4fdd-9ee8-b59a79073c52.sql`
7. `20250923150916_f8e101e5-f99d-496d-91bc-2dfb3c84fc8e.sql`
8. `20250923151043_45403786-cf9e-4757-931a-6464340c8677.sql`
9. `20250924203256_0d6a55b2-01ea-4b8c-9855-177151037e4e.sql`

各ファイルの内容をコピー → SQLエディタに貼り付け → Run をクリック

## ステップ6: 認証の有効化

1. 左サイドバーの **🔐 Authentication** をクリック
2. **Providers** タブを開く
3. **Email** がデフォルトで有効になっていることを確認

## ステップ7: テストユーザーの作成

### 7-1: 認証ユーザーを作成

1. **Authentication > Users** を開く
2. 「Add user」→「Create new user」をクリック
3. 以下を入力：
   - **Email**: `admin@example.com`
   - **Password**: `Admin123!` （任意の安全なパスワード）
   - **Auto Confirm User**: チェックを入れる
4. 「Create user」をクリック
5. 作成されたユーザーの **UUID**（ID）をコピー（例: `a1b2c3d4-e5f6-7890-...`）

### 7-2: usersテーブルにレコードを追加

1. **SQL Editor** に戻る
2. 以下のSQLを実行（UUIDを先ほどコピーしたものに置き換える）：

```sql
INSERT INTO public.users (id, email, role, full_name, department)
VALUES (
  'ここにコピーしたUUIDを貼り付け',
  'admin@example.com',
  'admin',
  '管理者',
  '管理部'
);
```

3. 「Run」をクリック

## ステップ8: 開発サーバーの再起動

1. ターミナルで **Ctrl + C** を押して開発サーバーを停止
2. 以下のコマンドで再起動：

```bash
npm run dev
```

## ステップ9: 動作確認

1. ブラウザで http://localhost:8080 にアクセス
2. ログインページが表示されるはず
3. 以下の情報でログイン：
   - **Email**: `admin@example.com`
   - **Password**: 設定したパスワード

✅ ログインできれば成功です！

## データベースの確認

Supabaseダッシュボードで：

1. **🗂️ Table Editor** を開く
2. 左側に以下のテーブルが表示されるはず：
   - users
   - incidents
   - attachments
   - actions
   - policies

## よくある問題と解決方法

### エラー: "Invalid API key"
- `.env.local` のキーが正しくコピーされているか確認
- 余分なスペースや改行がないか確認
- 開発サーバーを再起動

### エラー: "relation does not exist"
- すべてのマイグレーションが順番通りに実行されているか確認
- SQLエディタで成功メッセージが表示されたか確認

### ログインできない
- テストユーザーが正しく作成されているか確認
  - Authentication > Users でユーザーが表示されるか
  - Table Editor > users テーブルにレコードがあるか
- emailとパスワードが正しいか確認

### ページが真っ白
- ブラウザのコンソールを開く（F12キー）
- エラーメッセージを確認
- 開発サーバーのログを確認

## 次のステップ

アプリケーションが動作したら：

1. **ダッシュボードを探索**
   - 事案報告フォームを試す
   - ユーザー管理機能を確認

2. **追加ユーザーの作成**
   - 異なるロール（manager, member, auditor）のユーザーを作成
   - ロールごとの権限の違いを確認

3. **データベースの監視**
   - Supabaseダッシュボードでリアルタイムにデータを確認
   - SQLエディタでクエリを実行

## Supabase無料プランの制限

- データベース容量: 500MB
- API リクエスト: 50,000/月
- 認証ユーザー: 50,000
- ストレージ: 1GB
- ファイル転送: 2GB/月

開発と小規模な運用には十分です！

## サポート

問題が解決しない場合：
- Supabaseドキュメント: https://supabase.com/docs
- コミュニティ: https://github.com/supabase/supabase/discussions


