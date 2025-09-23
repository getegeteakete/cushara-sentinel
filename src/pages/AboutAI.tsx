import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Brain, 
  Lock, 
  Phone, 
  Mail, 
  Languages,
  CheckCircle,
  AlertTriangle,
  FileText
} from "lucide-react";

const AboutAI = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CusHara Sentinel</h1>
                <p className="text-sm text-muted-foreground">AI活用カスハラ対策システム</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Languages className="w-4 h-4 mr-2" />
                日本語
              </Button>
              <Button variant="outline" size="sm">
                English
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* メインタイトル */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            当社はAIを活用してカスタマーハラスメント対策を実施しています
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            最新のAI技術により、お客様とのコミュニケーションを適切に分析し、従業員の働きやすい環境づくりに取り組んでいます。
          </p>
        </div>

        {/* AI活用の概要 */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-primary" />
              <span>使用AIの概要</span>
            </CardTitle>
            <CardDescription>
              当社が導入しているAIシステムの詳細について
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>AI技術仕様</span>
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 大規模言語モデル（GPT-4o-mini等）による自然言語処理</li>
                  <li>• 音声認識技術（OpenAI Whisper API）による通話内容解析</li>
                  <li>• リアルタイム感情分析とリスクスコア算出</li>
                  <li>• 東京都の条例・指針に基づく判定アルゴリズム</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>判定カテゴリ</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">暴言・侮辱</Badge>
                  <Badge variant="outline">脅迫行為</Badge>
                  <Badge variant="outline">過度な要求</Badge>
                  <Badge variant="outline">長時間拘束</Badge>
                  <Badge variant="outline">人格否定</Badge>
                  <Badge variant="outline">違法行為</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 利用範囲 */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-warning" />
              <span>利用範囲と目的</span>
            </CardTitle>
            <CardDescription>
              AIシステムの適用範囲と利用目的について
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="p-3 bg-primary-muted rounded-full w-fit mx-auto">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">メール対応</h3>
                <p className="text-sm text-muted-foreground">
                  お客様からのメールやお問い合わせフォームへの投稿内容を分析
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="p-3 bg-warning-muted rounded-full w-fit mx-auto">
                  <Phone className="w-6 h-6 text-warning" />
                </div>
                <h3 className="font-semibold">電話対応</h3>
                <p className="text-sm text-muted-foreground">
                  通話内容の記録・書き起こしデータの分析
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="p-3 bg-success-muted rounded-full w-fit mx-auto">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold">従業員保護</h3>
                <p className="text-sm text-muted-foreground">
                  従業員の心理的安全性確保と適切な労働環境の維持
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">対象となる事案</h4>
              <p className="text-sm text-muted-foreground">
                カスタマーハラスメントに該当する可能性のある言動や行為について、東京都の「カスタマーハラスメント対策企業マニュアル」
                に基づいて客観的に分析・判定を行います。お客様の正当な申し出や意見交換は対象外です。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* プライバシー配慮 */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-6 h-6 text-success" />
              <span>プライバシー保護への取り組み</span>
            </CardTitle>
            <CardDescription>
              個人情報保護と安全性確保について
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-success">データ保護</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 個人情報の自動マスキング機能</li>
                  <li>• エンドツーエンド暗号化による通信保護</li>
                  <li>• アクセス権限管理によるデータアクセス制御</li>
                  <li>• 定期的なセキュリティ監査の実施</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">AI倫理</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 公平性と透明性を重視した判定プロセス</li>
                  <li>• 人間による最終判断の確保</li>
                  <li>• バイアス除去と継続的な改善</li>
                  <li>• 説明可能AI（XAI）による根拠提示</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 相談窓口 */}
        <Card className="shadow-xl border-0 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-6 h-6" />
              <span>東京都カスタマーハラスメント総合相談窓口</span>
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              事業者、従業員だけでなく、顧客等も対象に、カスハラ全般に関する相談に対応します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <p className="text-sm text-primary-foreground/90">
                労務管理やメンタルケア、消費者保護等に関する経験が豊富な専門相談員が丁寧に回答します。
              </p>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <h3 className="font-semibold">相談方法</h3>
                  <p className="text-sm text-primary-foreground/90">
                    電話またはWEB相談フォームで受け付けています（無料・匿名相談可）
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">連絡先</h3>
                  <p className="text-sm text-primary-foreground/90">
                    電話: 0120-182-276<br />
                    WEB相談フォーム: <a href="https://0a789475.form.kintoneapp.com/waiting/?_formCode=59e5fb8c524cb69c97e123b10817ebd807b1ffec10b2c7072714f2c35e4a6dfd" className="underline hover:no-underline" target="_blank" rel="noopener noreferrer">こちらから</a>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">相談時間</h3>
                  <p className="text-sm text-primary-foreground/90">
                    平日 9:00〜17:00<br />
                    ※土日祝日及び12月29日から1月3日までは除く
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* フッター */}
        <div className="text-center space-y-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            本システムは東京都「カスタマーハラスメント対策の推進に関する条例」および
            「カスタマーハラスメント対策指針」に基づいて運用されています。
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="text-primary hover:underline">プライバシーポリシー</a>
            <a href="#" className="text-primary hover:underline">利用規約</a>
            <a href="#" className="text-primary hover:underline">お問い合わせ</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 CusHara Sentinel - 東京都AI活用カスハラ対策システム
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutAI;