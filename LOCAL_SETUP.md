# ローカル開発環境のセットアップ

## 必要なソフトウェア

- Node.js (v18以上推奨)
- npm または yarn
- Docker Desktop（Supabaseローカル環境用）
- Supabase CLI

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabase CLIのインストール

#### Windows（PowerShell）:
```powershell
# Scoopを使用する場合
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

または

```powershell
# npm経由でインストール
npm install -g supabase
```

### 3. Dockerのインストールと起動

Docker Desktopをインストールしていない場合は、公式サイトからダウンロードしてインストールしてください：
https://www.docker.com/products/docker-desktop

インストール後、Docker Desktopを起動してください。

### 4. Supabaseローカル環境の起動

```bash
# Supabaseサービスを起動（初回は時間がかかります）
npx supabase start
```

起動後、以下の情報が表示されます：
- API URL: http://127.0.0.1:54321
- DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
- Studio URL: http://127.0.0.1:54323
- Anon key: （表示されるキー）

### 5. 環境変数の確認

`.env.local` ファイルが自動的に作成されています。必要に応じて編集してください。

### 6. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:8080 にアクセスしてください。

### 7. Supabase Studioへのアクセス

データベースの管理には Supabase Studio を使用できます：
http://127.0.0.1:54323

## データベースマイグレーション

マイグレーションファイルは `supabase/migrations/` ディレクトリにあります。
Supabaseを起動すると自動的に適用されます。

## トラブルシューティング

### Dockerが起動しない
- Docker Desktopが起動していることを確認してください
- PCを再起動してみてください

### Supabase起動時にエラーが出る
```bash
# Supabaseを停止
npx supabase stop

# リセットして再起動
npx supabase db reset
```

### ポートが使用中のエラー
他のサービスがポート54321、54322、54323を使用している場合は、それらを停止してください。

## 開発用のテストユーザー作成

1. Supabase Studioにアクセス: http://127.0.0.1:54323
2. Authentication > Users から新しいユーザーを作成
3. SQL Editorで以下を実行してusersテーブルにレコードを追加：

```sql
INSERT INTO public.users (id, email, role, full_name, department)
VALUES (
  'ユーザーのUUID',
  'test@example.com',
  'admin',
  'テストユーザー',
  '管理部'
);
```

## 便利なコマンド

```bash
# Supabaseの起動
npx supabase start

# Supabaseの停止
npx supabase stop

# データベースのリセット
npx supabase db reset

# マイグレーションの作成
npx supabase migration new migration_name

# Supabaseの状態確認
npx supabase status
```


