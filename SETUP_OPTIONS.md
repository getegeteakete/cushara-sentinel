# データベースのセットアップオプション

## オプション1: ローカル環境（Docker使用）

### 必要なもの
1. **Docker Desktop for Windows**
   - ダウンロード: https://www.docker.com/products/docker-desktop
   - インストール後、PCを再起動
   
2. **Supabase CLI**
   ```powershell
   npm install -g supabase
   ```

### セットアップ手順
```bash
# Docker Desktopを起動してから実行
npx supabase start

# 開発サーバーを起動
npm run dev
```

## オプション2: オンラインSupabase（推奨・簡単）

### 手順

1. **Supabaseアカウント作成**
   - https://supabase.com にアクセス
   - 無料アカウントを作成

2. **新しいプロジェクト作成**
   - 「New Project」をクリック
   - プロジェクト名を入力（例: cushara-sentinel）
   - データベースパスワードを設定（強力なものを）
   - リージョンを選択（Tokyo推奨）
   - 「Create new project」をクリック

3. **プロジェクトの情報を取得**
   - プロジェクトダッシュボードで「Settings」→「API」を開く
   - 以下の情報をコピー：
     - `Project URL`
     - `anon public` key

4. **環境変数を設定**
   
   `.env.local` ファイルを開いて、以下のように編集：
   ```
   VITE_SUPABASE_URL=あなたのProject URL
   VITE_SUPABASE_ANON_KEY=あなたのanon public key
   ```

5. **マイグレーションを実行**
   
   Supabaseダッシュボードで：
   - 「SQL Editor」を開く
   - `supabase/migrations/` フォルダ内の各SQLファイルの内容をコピー
   - 実行順（ファイル名の日付順）：
     1. `20250923144852_fc860a0b-9fc5-4e69-a45f-a72f31c2539c.sql`
     2. `20250923145034_bcf6f466-6cea-4d36-981b-44d6f97640a6.sql`
     3. `20250923145104_2b9dc709-6bf1-42e1-9214-0b2e6dcd31d4.sql`
     4. 以下同様...

6. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

7. **ブラウザで確認**
   http://localhost:8080 にアクセス

## オプション3: PostgreSQLを直接使用

### 必要なもの
- PostgreSQL 14以上
- pgAdmin または他のPostgreSQLクライアント

### セットアップ手順
1. PostgreSQLをインストール
2. 新しいデータベースを作成
3. マイグレーションファイルを実行
4. 接続情報を環境変数に設定

※ただし、Supabase固有の機能（認証、ストレージなど）は使用できません

## 推奨

**今すぐ始めたい場合**: オプション2（オンラインSupabase）
- 5分程度でセットアップ完了
- 無料枠で十分な機能が使える
- バックアップやメンテナンスが不要

**本格的な開発環境が欲しい場合**: オプション1（Docker + ローカルSupabase）
- 完全にオフラインで開発可能
- 本番環境と同じ構成
- 自由にリセット・実験可能


