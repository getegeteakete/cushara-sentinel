import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Brain, 
  Users, 
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  FileText,
  Phone
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CusHara Sentinel</h1>
                <p className="text-sm text-muted-foreground">AIカスハラ対策システム</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button asChild variant="outline">
                <Link to="/about-ai-anti-cushara">AI活用について</Link>
              </Button>
              <Button asChild>
                <Link to="/login">ログイン</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            東京都 取組2：AIを活用したシステム等の導入 対応
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-primary">
            CusHara Sentinel
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            最新のAI技術でカスタマーハラスメントを適切に判定し、従業員の働きやすい環境づくりを支援する企業専用システム
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link to="/login">
                システムにログイン <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about-ai-anti-cushara">AI活用詳細を見る</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">主な機能</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Brain className="w-8 h-8 text-primary mr-3" />
                  <h4 className="text-xl font-semibold">AI自動判定</h4>
                </div>
                <p className="text-muted-foreground">
                  東京都の指針に基づき、AIが客観的にカスハラ該当性を判定。リスクスコアと推奨アクションを自動提示。
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 text-primary mr-3" />
                  <h4 className="text-xl font-semibold">事案管理</h4>
                </div>
                <p className="text-muted-foreground">
                  メール・電話・チャットなど様々な形式の事案を一元管理。音声ファイルの自動文字起こしにも対応。
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-primary mr-3" />
                  <h4 className="text-xl font-semibold">権限管理</h4>
                </div>
                <p className="text-muted-foreground">
                  admin・manager・member・auditorの4段階の権限設定で、適切なアクセス制御を実現。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">導入効果</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">客観的な判定基準</h4>
                  <p className="text-muted-foreground">
                    AIによる一貫した判定で、主観的な要素を排除し公正な対応を実現
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">迅速な対応</h4>
                  <p className="text-muted-foreground">
                    リアルタイムでの判定により、適切なエスカレーション経路を即座に提示
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">法的根拠の明確化</h4>
                  <p className="text-muted-foreground">
                    東京都の条例・指針に基づく判定で、対応の法的根拠を明確に提示
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-warning mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">リスク管理</h4>
                  <p className="text-muted-foreground">
                    0-100のスコアリングでリスクレベルを数値化し、優先順位を明確化
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FileText className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">証拠保全</h4>
                  <p className="text-muted-foreground">
                    音声・メール・チャットログなどの証拠を適切に保管し、報告書を自動生成
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">組織力向上</h4>
                  <p className="text-muted-foreground">
                    統一された対応基準で組織全体のカスハラ対応力を底上げ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            今すぐカスハラ対策を強化しませんか？
          </h3>
          <p className="text-xl mb-8 opacity-90">
            CusHara Sentinelで、従業員の働きやすい環境づくりを始めましょう
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/login">
                システムにアクセス <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/about-ai-anti-cushara">
                <Phone className="mr-2 h-4 w-4" /> お問い合わせ
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 CusHara Sentinel - カスタマーハラスメント対策AIシステム</p>
          <p className="mt-2">東京都「取組2：AIを活用したシステム等の導入」対応</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;