# ==========================================
# Git アップロードスクリプト
# CusHara Sentinel を GitHubにアップロード
# ==========================================

Write-Host "================================" -ForegroundColor Cyan
Write-Host "CusHara Sentinel - Git Upload" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# ステップ1: 新しいリモートリポジトリのURLを入力
Write-Host "ステップ1: GitHubリポジトリURLを入力してください" -ForegroundColor Yellow
Write-Host "例: https://github.com/username/cushara-sentinel.git" -ForegroundColor Gray
$repoUrl = Read-Host "リポジトリURL"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "❌ URLが入力されませんでした。終了します。" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ URL: $repoUrl" -ForegroundColor Green
Write-Host ""

# ステップ2: 現在のリモートを確認
Write-Host "ステップ2: 現在のリモート設定を確認..." -ForegroundColor Yellow
$currentRemote = git remote get-url origin 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "⚠️  既存のリモート: $currentRemote" -ForegroundColor Yellow
    $confirm = Read-Host "リモートを変更しますか? (y/n)"
    
    if ($confirm -eq "y") {
        Write-Host "既存のリモートを削除..." -ForegroundColor Gray
        git remote remove origin
        Write-Host "新しいリモートを追加..." -ForegroundColor Gray
        git remote add origin $repoUrl
        Write-Host "✅ リモートを変更しました" -ForegroundColor Green
    } else {
        Write-Host "❌ キャンセルしました" -ForegroundColor Red
        exit 0
    }
} else {
    Write-Host "新しいリモートを追加..." -ForegroundColor Gray
    git remote add origin $repoUrl
    Write-Host "✅ リモートを追加しました" -ForegroundColor Green
}

Write-Host ""

# ステップ3: ファイルをステージング
Write-Host "ステップ3: ファイルをステージング..." -ForegroundColor Yellow
git add .
Write-Host "✅ ファイルをステージングしました" -ForegroundColor Green
Write-Host ""

# ステップ4: コミットメッセージを入力
Write-Host "ステップ4: コミットメッセージを入力してください" -ForegroundColor Yellow
Write-Host "デフォルト: 'feat: CusHara Sentinel初期バージョン'" -ForegroundColor Gray
$commitMsg = Read-Host "コミットメッセージ (Enter でデフォルト)"

if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "feat: CusHara Sentinel初期バージョン - AIカスハラ対策システム"
}

Write-Host "コミット中..." -ForegroundColor Gray
git commit -m $commitMsg
Write-Host "✅ コミットしました" -ForegroundColor Green
Write-Host ""

# ステップ5: ブランチ名を確認
Write-Host "ステップ5: ブランチ名を確認..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ ブランチ名: main" -ForegroundColor Green
Write-Host ""

# ステップ6: プッシュ
Write-Host "ステップ6: GitHubにプッシュ..." -ForegroundColor Yellow
$confirm = Read-Host "GitHubにプッシュしますか? (y/n)"

if ($confirm -eq "y") {
    Write-Host "プッシュ中..." -ForegroundColor Gray
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "================================" -ForegroundColor Green
        Write-Host "✅ アップロード完了！" -ForegroundColor Green
        Write-Host "================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "GitHubで確認してください:" -ForegroundColor Cyan
        Write-Host $repoUrl.Replace(".git", "") -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ プッシュに失敗しました" -ForegroundColor Red
        Write-Host "手動で以下を実行してください:" -ForegroundColor Yellow
        Write-Host "git push -u origin main --force" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ プッシュをキャンセルしました" -ForegroundColor Red
    Write-Host ""
    Write-Host "後でプッシュする場合:" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor Gray
}

Write-Host ""
Write-Host "完了！" -ForegroundColor Green

