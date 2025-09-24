import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
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
import { useState } from "react";

const AboutAI = () => {
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Language Toggle */}
        <div className="flex justify-center space-x-2 mb-8">
          <Button 
            variant={language === 'ja' ? "default" : "outline"} 
            size="sm"
            onClick={() => setLanguage('ja')}
          >
            <Languages className="w-4 h-4 mr-2" />
            日本語
          </Button>
          <Button 
            variant={language === 'en' ? "default" : "outline"} 
            size="sm"
            onClick={() => setLanguage('en')}
          >
            <Languages className="w-4 h-4 mr-2" />
            English
          </Button>
        </div>

        {/* メインタイトル */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            {language === 'ja' 
              ? '当社はAIを活用してカスタマーハラスメント対策を実施しています'
              : 'We implement customer harassment countermeasures using AI technology'
            }
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ja'
              ? '最新のAI技術により、お客様とのコミュニケーションを適切に分析し、従業員の働きやすい環境づくりに取り組んでいます。'
              : 'Using the latest AI technology, we appropriately analyze communications with customers and work to create a comfortable working environment for employees.'
            }
          </p>
        </div>

        {/* AI活用の概要 */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-primary" />
              <span>{language === 'ja' ? '使用AIの概要' : 'AI System Overview'}</span>
            </CardTitle>
            <CardDescription>
              {language === 'ja' 
                ? '当社が導入しているAIシステムの詳細について'
                : 'Details about the AI system implemented by our company'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>{language === 'ja' ? 'AI技術仕様' : 'AI Technology Specifications'}</span>
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {language === 'ja' ? (
                    <>
                      <li>• 大規模言語モデル（GPT-4o-mini等）による自然言語処理</li>
                      <li>• 音声認識技術（OpenAI Whisper API）による通話内容解析</li>
                      <li>• リアルタイム感情分析とリスクスコア算出</li>
                      <li>• 東京都の条例・指針に基づく判定アルゴリズム</li>
                    </>
                  ) : (
                    <>
                      <li>• Natural language processing using large language models (GPT-4o-mini, etc.)</li>
                      <li>• Call content analysis using speech recognition technology (OpenAI Whisper API)</li>
                      <li>• Real-time emotion analysis and risk score calculation</li>
                      <li>• Judgment algorithms based on Tokyo Metropolitan Government ordinances and guidelines</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>{language === 'ja' ? '判定カテゴリ' : 'Assessment Categories'}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {language === 'ja' ? (
                    <>
                      <Badge variant="outline">暴言・侮辱</Badge>
                      <Badge variant="outline">脅迫行為</Badge>
                      <Badge variant="outline">過度な要求</Badge>
                      <Badge variant="outline">長時間拘束</Badge>
                      <Badge variant="outline">人格否定</Badge>
                      <Badge variant="outline">違法行為</Badge>
                    </>
                  ) : (
                    <>
                      <Badge variant="outline">Verbal Abuse</Badge>
                      <Badge variant="outline">Threats</Badge>
                      <Badge variant="outline">Excessive Demands</Badge>
                      <Badge variant="outline">Long-term Restraint</Badge>
                      <Badge variant="outline">Personal Attacks</Badge>
                      <Badge variant="outline">Illegal Acts</Badge>
                    </>
                  )}
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
              <span>{language === 'ja' ? '利用範囲と目的' : 'Usage Scope and Purpose'}</span>
            </CardTitle>
            <CardDescription>
              {language === 'ja'
                ? 'AIシステムの適用範囲と利用目的について'
                : 'About the scope and purpose of AI system application'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="p-3 bg-primary-muted rounded-full w-fit mx-auto">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">{language === 'ja' ? 'メール対応' : 'Email Support'}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ja'
                    ? 'お客様からのメールやお問い合わせフォームへの投稿内容を分析'
                    : 'Analysis of emails and inquiries from customers through contact forms'
                  }
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="p-3 bg-warning-muted rounded-full w-fit mx-auto">
                  <Phone className="w-6 h-6 text-warning" />
                </div>
                <h3 className="font-semibold">{language === 'ja' ? '電話対応' : 'Phone Support'}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ja'
                    ? '通話内容の記録・書き起こしデータの分析'
                    : 'Analysis of recorded call content and transcription data'
                  }
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="p-3 bg-success-muted rounded-full w-fit mx-auto">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold">{language === 'ja' ? '従業員保護' : 'Employee Protection'}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ja'
                    ? '従業員の心理的安全性確保と適切な労働環境の維持'
                    : 'Ensuring employee psychological safety and maintaining proper work environment'
                  }
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
              <span>{language === 'ja' ? 'プライバシー保護への取り組み' : 'Privacy Protection Initiatives'}</span>
            </CardTitle>
            <CardDescription>
              {language === 'ja'
                ? '個人情報保護と安全性確保について'
                : 'About personal information protection and security assurance'
              }
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

        {/* 東京都カスタマーハラスメント総合相談窓口 */}
        <Card className="shadow-xl border-0 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-6 h-6" />
              <span>{language === 'ja' ? '東京都カスタマーハラスメント総合相談窓口' : 'Tokyo Metropolitan Customer Harassment General Consultation Center'}</span>
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              {language === 'ja'
                ? '事業者、従業員だけでなく、顧客等も対象に、カスハラ全般に関する相談に対応します'
                : 'We provide consultation on customer harassment for businesses, employees, and customers'
              }
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
            © 2025 CusHara Sentinel - 東京都AI活用カスハラ対策システム
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutAI;