import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import { 
  Users, 
  FileText, 
  Brain, 
  Mail, 
  Phone, 
  Upload,
  AlertTriangle,
  CheckCircle,
  Play,
  PlusCircle,
  BarChart3,
  Settings,
  LogIn
} from "lucide-react";
import { Link } from "react-router-dom";

const Guide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* タイトル */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-primary">使い方ガイド</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            CusHara Sentinelの基本的な使い方から高度な機能まで、わかりやすく解説します
          </p>
        </div>

        {/* クイックスタート */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-6 h-6 text-primary" />
              <span>クイックスタート</span>
            </CardTitle>
            <CardDescription>
              システムを初めて使う方向けの基本的な手順
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="p-3 bg-primary rounded-full w-fit mx-auto">
                  <LogIn className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">1. ログイン</h3>
                <p className="text-sm text-muted-foreground">
                  管理者から付与されたアカウントでシステムにログインします
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="p-3 bg-success rounded-full w-fit mx-auto">
                  <PlusCircle className="w-6 h-6 text-success-foreground" />
                </div>
                <h3 className="font-semibold">2. 事案登録</h3>
                <p className="text-sm text-muted-foreground">
                  カスハラの可能性がある事案を登録し、AI分析を実行します
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="p-3 bg-warning rounded-full w-fit mx-auto">
                  <Brain className="w-6 h-6 text-warning-foreground" />
                </div>
                <h3 className="font-semibold">3. 判定確認</h3>
                <p className="text-sm text-muted-foreground">
                  AI判定結果を確認し、推奨アクションに従って対応します
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 機能別ガイド */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center">機能別ガイド</h3>
          
          {/* ダッシュボード */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>ダッシュボード</span>
              </CardTitle>
              <CardDescription>
                システム全体の状況を一覧で確認できます
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">統計情報</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 総事案数と月次推移</li>
                    <li>• カスハラ判定率の変化</li>
                    <li>• 平均リスクスコア</li>
                    <li>• ステータス別分布</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">最新事案</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 直近登録された事案一覧</li>
                    <li>• 高リスク事案の優先表示</li>
                    <li>• 対応状況の確認</li>
                    <li>• 担当者アサイン状況</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 事案登録 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-success" />
                <span>事案登録</span>
              </CardTitle>
              <CardDescription>
                新しい事案を登録し、AI分析を実行します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    基本情報の入力
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                    <li>• <strong>事案タイトル:</strong> 簡潔で分かりやすいタイトル</li>
                    <li>• <strong>発生源:</strong> メール・電話・フォーム・その他から選択</li>
                    <li>• <strong>事案内容:</strong> 詳細な状況説明（メール本文や通話内容）</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Upload className="w-4 h-4 text-primary mr-2" />
                    ファイル添付
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">対応ファイル形式</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• .eml (メールファイル)</li>
                        <li>• .msg (Outlookメール)</li>
                        <li>• .pdf (PDF文書)</li>
                        <li>• .wav, .mp3 (音声ファイル)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">注意点</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 最大ファイルサイズ: 50MB</li>
                        <li>• 音声は自動文字起こし対応</li>
                        <li>• 個人情報は自動マスキング</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Brain className="w-4 h-4 text-warning mr-2" />
                    AI分析の実行
                  </h4>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>AI分析のポイント:</strong><br />
                      • 事案内容を詳細に記入するほど、精度の高い判定が可能<br />
                      • 分析には数秒〜数十秒かかります<br />
                      • 判定結果は参考情報として活用し、最終判断は人間が行います
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI判定結果の見方 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-warning" />
                <span>AI判定結果の見方</span>
              </CardTitle>
              <CardDescription>
                AI分析結果を正しく理解し、適切に活用する方法
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">判定項目</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">カスハラ該当性</p>
                      <p className="text-xs text-muted-foreground">該当・非該当の二段階判定</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">リスクスコア</p>
                      <p className="text-xs text-muted-foreground">0-100点での危険度評価</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">検出カテゴリ</p>
                      <p className="text-xs text-muted-foreground">脅迫・暴言・長時間拘束など</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">スコア目安</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-success border-success">0-30</Badge>
                      <span className="text-sm">通常のクレーム</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-warning border-warning">31-60</Badge>
                      <span className="text-sm">カスハラ疑い</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-danger border-danger">61-80</Badge>
                      <span className="text-sm">明確なカスハラ</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-danger border-danger">81-100</Badge>
                      <span className="text-sm">重大なカスハラ</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 権限とアクセス制御 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-secondary" />
                <span>権限とアクセス制御</span>
              </CardTitle>
              <CardDescription>
                各ユーザー権限での利用可能機能
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-danger text-danger-foreground">Admin</Badge>
                      <span className="font-semibold">管理者</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 全機能へのアクセス</li>
                      <li>• ユーザー管理</li>
                      <li>• システム設定</li>
                      <li>• 全事案の閲覧・編集・削除</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-warning text-warning-foreground">Manager</Badge>
                      <span className="font-semibold">マネージャー</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 部門内全事案の管理</li>
                      <li>• レポート作成</li>
                      <li>• メンバーの事案確認</li>
                      <li>• エスカレーション対応</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-primary text-primary-foreground">Member</Badge>
                      <span className="font-semibold">メンバー</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 自分の事案登録・管理</li>
                      <li>• AI分析実行</li>
                      <li>• 基本的な統計閲覧</li>
                      <li>• 事案ステータス更新</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-secondary text-secondary-foreground">Auditor</Badge>
                      <span className="font-semibold">監査者</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 全事案の閲覧のみ</li>
                      <li>• 統計データ確認</li>
                      <li>• レポート出力</li>
                      <li>• 監査ログ確認</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* よくある質問 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span>よくある質問</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Q. AI判定結果は絶対的なものですか？</h4>
                  <p className="text-sm text-muted-foreground">
                    A. いいえ。AI判定は参考情報として提供されます。最終的な判断は必ず人間が行い、現場の状況や背景を総合的に考慮してください。
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Q. 個人情報の取り扱いは大丈夫ですか？</h4>
                  <p className="text-sm text-muted-foreground">
                    A. システムには自動マスキング機能があり、氏名・電話・住所・メールアドレスなどは自動的に保護されます。また、厳格なアクセス制御により情報セキュリティを確保しています。
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Q. 音声ファイルはどのように処理されますか？</h4>
                  <p className="text-sm text-muted-foreground">
                    A. 音声ファイル（.wav, .mp3）は自動的に文字起こしされ、その後AI分析が実行されます。音声データ自体は暗号化して安全に保管されます。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* サポート情報 */}
        <Card className="shadow-xl border-0 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-6 h-6" />
              <span>サポート・お問い合わせ</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold">技術サポート</h3>
                <p className="text-sm text-primary-foreground/90">
                  システムの使い方や技術的な問題について<br />
                  TEL: 03-XXXX-XXXX<br />
                  Email: support@cushara-sentinel.com<br />
                  受付時間: 平日 9:00-18:00
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">カスハラ対策相談</h3>
                <p className="text-sm text-primary-foreground/90">
                  カスハラ対応に関する専門相談<br />
                  TEL: 03-YYYY-YYYY<br />
                  Email: consultation@cushara-sentinel.com<br />
                  受付時間: 平日 10:00-17:00
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4 pt-8">
          <h3 className="text-2xl font-bold">今すぐ始めてみましょう</h3>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                システムにログイン
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about-ai-anti-cushara">
                <Brain className="w-4 h-4 mr-2" />
                AI活用について詳しく
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Guide;