# public/images フォルダ

このフォルダは**絶対パス**で参照する静的画像用です。

## 使用例

### HTML内で使用
```html
<img src="/images/sample.jpg" alt="Sample" />
```

### React/TSX内で使用
```tsx
<img src="/images/sample.jpg" alt="Sample" />
```

### メタタグで使用（OGP画像など）
```html
<meta property="og:image" content="/images/og-image.jpg" />
```

## 推奨する画像

- OGP画像（SNSシェア用）: `og-image.jpg` (1200x630px)
- ファビコン: `favicon.ico` (既に配置済み)
- ロゴ: `logo.svg` または `logo.png`

## 注意事項

- このフォルダの画像は**ビルド時に最適化されません**
- ファイル名は本番環境でも変わりません
- 大きな画像は事前に圧縮してください


