# 🚀 Gitへの新規アップロード手順

## 📋 準備

このプロジェクトを新しいGitHubリポジトリにアップロードします。

---

## ⚠️ 重要：機密情報の確認

以下のファイルには機密情報が含まれている可能性があります：

### 🔒 確認が必要なファイル
- `.env.local` - ✅ 既に.gitignoreに含まれています（アップロードされません）
- `src/integrations/supabase/client.ts` - Supabase接続情報

---

## 🎯 アップロード手順

### ステップ1: GitHubで新しいリポジトリを作成

1. https://github.com にアクセス
2. 右上の「+」→「New repository」をクリック
3. リポジトリ情報を入力：
   ```
   Repository name: cushara-sentinel
   Description: AIを活用したカスタマーハラスメント対策システム
   
   Public または Private を選択
   
   ❌ Initialize this repository with:
      (何もチェックしない - 既存プロジェクトがあるため)
   ```
4. 「Create repository」をクリック
5. 表示されたURLをコピー（例: `https://github.com/username/cushara-sentinel.git`）

---

### ステップ2: 不要なファイルを除外

プロジェクトフォルダで、以下のファイルは除外することを推奨：

```
# SQLファイル（機密情報が含まれる可能性）
create_admin_user.sql
update_admin_user.sql
fix_admin_user.sql
check_user_status.sql

# ログイン手順書（個人情報が含まれる）
ログイン設定完了手順.md
ログイン問題解決手順.md
```

これらを除外する場合は、`.gitignore`に追加します。

---

### ステップ3: 変更をコミット

#### PowerShellで実行：

```powershell
# 1. 現在のリモートリポジトリを削除（新規リポジトリに変更する場合）
git remote remove origin

# 2. 新しいリモートリポジトリを追加
# ⚠️ 以下のURLを実際のGitHubリポジトリURLに置き換えてください
git remote add origin https://github.com/username/cushara-sentinel.git

# 3. 全てのファイルをステージング
git add .

# 4. コミット
git commit -m "feat: CusHara Sentinel初期バージョン - AIカスハラ対策システム"

# 5. メインブランチの名前を確認/変更
git branch -M main

# 6. GitHubにプッシュ
git push -u origin main
```

---

### ステップ4: 機密情報を含むファイルを除外したい場合

#### 個別のファイルを除外：

```powershell
# .gitignoreに追加
echo "create_admin_user.sql" >> .gitignore
echo "update_admin_user.sql" >> .gitignore
echo "fix_admin_user.sql" >> .gitignore
echo "check_user_status.sql" >> .gitignore
echo "ログイン*.md" >> .gitignore

# 変更をコミット
git add .gitignore
git commit -m "chore: 機密情報を含むファイルを除外"
git push
```

---

## 📦 含めるべきファイル

✅ **アップロードして良いファイル**:
- `src/` - ソースコード
- `public/` - 公開ファイル（画像など）
- `supabase/migrations/` - データベーススキーマ
- `supabase/setup_all_in_one.sql` - セットアップSQL
- `package.json` - 依存関係
- `README.md` - プロジェクト説明
- 各種ガイド（SETUP_OPTIONS.md, QUICK_START.md など）

❌ **アップロードしないファイル**:
- `.env.local` - 環境変数（機密情報）
- `node_modules/` - 依存パッケージ
- `dist/` - ビルド成果物
- 個人のログイン情報を含むSQLファイル

---

## 🔒 セキュリティチェック

### Supabase接続情報の確認

`src/integrations/supabase/client.ts` を確認：

- 環境変数から読み込んでいる → ✅ 安全
- ハードコードされている → ⚠️ 危険（環境変数に変更必要）

現在のコードは環境変数を使用しているので安全です。

---

## 📝 README.mdの更新

アップロード前に、README.mdを更新することをおすすめします：

```markdown
# CusHara Sentinel

AIを活用したカスタマーハラスメント対策システム

## 概要

東京都の指針に基づき、AIが客観的にカスタマーハラスメントを判定し、
従業員の働きやすい環境づくりを支援する企業専用システムです。

## 主な機能

- 🤖 AI自動判定
- 📊 事案管理
- 👥 権限管理
- 📈 リスクスコアリング

## セットアップ

詳細は [QUICK_START.md](./QUICK_START.md) をご覧ください。

## 技術スタック

- React + TypeScript
- Vite
- Supabase
- Tailwind CSS
- shadcn/ui

## ライセンス

© 2025 CusHara Sentinel
```

---

## 🎉 完了後

GitHubリポジトリにアクセスして、以下を確認：

- [ ] ファイルが正しくアップロードされている
- [ ] 機密情報が含まれていない
- [ ] README.mdが表示される
- [ ] リポジトリの説明が正しい

---

## 🆘 トラブルシューティング

### エラー: "remote origin already exists"

```powershell
git remote remove origin
git remote add origin https://github.com/username/cushara-sentinel.git
```

### エラー: "failed to push"

```powershell
# 強制プッシュ（注意して使用）
git push -u origin main --force
```

### 大きなファイルのエラー

```powershell
# Git LFS を使用（100MB以上のファイル用）
git lfs track "*.jpg"
git lfs track "*.png"
git add .gitattributes
git commit -m "chore: Git LFS設定"
```

---

この手順に沿って進めてください！

