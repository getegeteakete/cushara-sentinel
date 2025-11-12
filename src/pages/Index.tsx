import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { 
  Brain, 
  Users, 
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  FileText,
  Phone,
  Shield
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - 背景画像 */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* 背景画像 */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/33030513_m.jpg)' }}
        />
        {/* グラデーションオーバーレイ（暗め） */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/75 to-slate-900/80" />
        {/* パターンオーバーレイ */}
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.3))]" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 backdrop-blur-md border border-white/30 shadow-2xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <Badge className="mb-6 px-4 py-1.5 text-sm font-medium bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-md shadow-lg">
            AI搭載カスハラ対策システム
          </Badge>
          <h1 className="text-6xl font-bold mb-6 text-white tracking-tight drop-shadow-2xl">
            CusHara Sentinel
          </h1>
          <p className="text-xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            最新の<span className="font-bold text-blue-200">AI技術</span>で<span className="font-bold text-blue-200">カスタマーハラスメント</span>を適切に判定し、<br className="hidden md:block"/>
            従業員の働きやすい環境づくりを支援する企業専用システム
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="shadow-2xl hover:shadow-3xl transition-all hover:scale-105 bg-white text-primary hover:bg-white/90 font-bold" asChild>
              <Link to="/login">
                システムにログイン <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/30 hover:border-white/50 shadow-lg hover:scale-105 transition-all font-semibold" asChild>
              <Link to="/guide">使い方ガイド</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/30 hover:border-white/50 shadow-lg hover:scale-105 transition-all font-semibold" asChild>
              <Link to="/about-ai-anti-cushara">AI活用詳細</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features - 白背景 */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">主な機能</Badge>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              充実した機能で<br className="sm:hidden"/>カスハラ対策を支援
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              AIと人間の判断を組み合わせた、効果的なカスタマーハラスメント対策システム
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Brain className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI自動判定</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  東京都の指針に基づき、AIが客観的にカスハラ該当性を判定。リスクスコアと推奨アクションを自動提示します。
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">事案管理</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  メール・電話・チャットなど様々な形式の事案を一元管理。音声ファイルの自動文字起こしにも対応。
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">権限管理</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  admin・manager・member・auditorの4段階の権限設定で、適切なアクセス制御を実現します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits - 薄いグレー背景 */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">導入効果</Badge>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              確かな効果で<br className="sm:hidden"/>組織を守る
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              客観的な判定と迅速な対応で、従業員の安全と企業のリスク管理を両立
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">客観的な判定基準</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    AIによる一貫した判定で、主観的な要素を排除し公正な対応を実現します。
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">迅速な対応</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    リアルタイムでの判定により、適切なエスカレーション経路を即座に提示します。
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">法的根拠の明確化</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    東京都の条例・指針に基づく判定で、対応の法的根拠を明確に提示します。
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">リスク管理</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    0-100のスコアリングでリスクレベルを数値化し、優先順位を明確化します。
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">証拠保全</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    音声・メール・チャットログなどの証拠を適切に保管し、報告書を自動生成します。
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">組織力向上</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    統一された対応基準で組織全体のカスハラ対応力を底上げします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - プライマリーカラーの背景 */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary via-primary to-blue-700 dark:from-primary dark:via-blue-800 dark:to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.3))]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            今すぐカスハラ対策を<br className="sm:hidden"/>強化しませんか？
          </h2>
          <p className="text-xl mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto">
            CusHara Sentinelで、従業員の働きやすい環境づくりを始めましょう
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/login">
                システムにアクセス <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm" asChild>
              <Link to="/about-ai-anti-cushara">
                <Phone className="mr-2 h-5 w-5" /> お問い合わせ
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - ダークグレー背景 */}
      <footer className="py-12 px-6 bg-slate-900 dark:bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <Shield className="w-5 h-5 text-primary mr-2" />
                <span className="font-bold text-lg">CusHara Sentinel</span>
              </div>
              <p className="text-sm text-slate-400">
                © 2025 CusHara Sentinel - カスタマーハラスメント対策AIシステム
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-center">
              <Link 
                to="/privacy-policy" 
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                プライバシーポリシー
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                利用規約
              </Link>
              <Link 
                to="/guide" 
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                使い方ガイド
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;