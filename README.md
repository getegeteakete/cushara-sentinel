# CusHara Sentinel

AIを活用したカスタマーハラスメント対策システム

![License](https://img.shields.io/badge/license-Proprietary-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.57.4-green)

---

## 📋 概要

**CusHara Sentinel**は、東京都の指針に基づき、AIが客観的にカスタマーハラスメントを判定し、従業員の働きやすい環境づくりを支援する企業専用システムです。

### 主な特徴

- 🤖 **AI自動判定**: 東京都の条例・指針に基づく客観的な判定
- 📊 **事案管理**: メール・電話・チャットなど様々な形式の一元管理
- 👥 **権限管理**: 4段階の権限設定（admin/manager/member/auditor）
- 📈 **リスクスコアリング**: 0-100のスコアで優先順位を明確化
- 📝 **証拠保全**: 音声・メール・チャットログの適切な保管
- 📄 **報告書自動生成**: 法的根拠を明記した報告書を自動作成

---

## 🚀 クイックスタート

### 必要環境

- Node.js 18以上
- npm または yarn
- Supabaseアカウント

### インストール

```bash
# リポジトリをクローン
git clone <YOUR_GIT_URL>

# プロジェクトディレクトリに移動
cd cushara-sentinel

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 環境変数の設定

`.env.local` ファイルを作成し、Supabaseの接続情報を設定：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

詳細なセットアップ手順は [QUICK_START.md](./QUICK_START.md) をご覧ください。

---

## 🛠 技術スタック

このプロジェクトは以下の技術で構築されています：

### フロントエンド
- **React** 18.3.1 - UIライブラリ
- **TypeScript** 5.8.3 - 型安全性
- **Vite** 5.4.19 - ビルドツール
- **Tailwind CSS** 3.4.17 - スタイリング
- **shadcn/ui** - UIコンポーネント

### バックエンド
- **Supabase** 2.57.4 - BaaS（認証・データベース）
- **PostgreSQL** - データベース

### その他
- **React Router** 6.30.1 - ルーティング
- **TanStack Query** 5.83.0 - データフェッチング
- **React Hook Form** 7.61.1 - フォーム管理
- **Zod** 3.25.76 - バリデーション

---

## 📁 プロジェクト構造

```
cushara-sentinel/
├── src/
│   ├── components/     # Reactコンポーネント
│   ├── pages/         # ページコンポーネント
│   ├── hooks/         # カスタムフック
│   ├── integrations/  # Supabase統合
│   └── lib/           # ユーティリティ
├── supabase/
│   ├── migrations/    # データベースマイグレーション
│   └── functions/     # Supabase Functions
├── public/            # 静的ファイル
└── docs/             # ドキュメント
```

---

## 🔐 セキュリティ

- Row Level Security (RLS) による適切なアクセス制御
- ロールベースの権限管理
- 個人情報のマスキング機能
- 暗号化されたパスワード保存

---

## 📚 ドキュメント

- [クイックスタートガイド](./QUICK_START.md)
- [セットアップオプション](./SETUP_OPTIONS.md)
- [Supabaseセットアップガイド](./SUPABASE_SETUP_GUIDE.md)
- [画像の使い方](./画像の使い方ガイド.md)

---

## 🤝 コントリビューション

このプロジェクトは現在クローズドソースです。

---

## 📄 ライセンス

© 2025 CusHara Sentinel. All rights reserved.

---

## 📞 サポート

問題が発生した場合は、Issuesセクションで報告してください。

---

## 🎯 今後の予定

- [ ] AI分析機能の強化
- [ ] 音声ファイルの自動文字起こし
- [ ] 多言語対応
- [ ] モバイルアプリ開発
- [ ] レポート機能の拡充
