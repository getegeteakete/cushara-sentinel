import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">プライバシーポリシー</h1>
          <p className="text-muted-foreground">最終更新日: 2024年12月</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>プライバシーポリシー</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. 基本方針</h2>
              <p className="text-muted-foreground leading-relaxed">
                CusHara Sentinel（以下「当システム」）は、ユーザーの個人情報の重要性を認識し、個人情報の保護に関する法律を遵守し、適切な取り扱いと保護に努めます。
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">2. 収集する情報</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium mb-2">2.1 ユーザー登録情報</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>メールアドレス</li>
                    <li>氏名</li>
                    <li>所属組織情報</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">2.2 事案情報</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>カスタマーハラスメント事案の内容</li>
                    <li>音声ファイル、メール、チャットログ等の関連資料</li>
                    <li>事案発生日時・場所</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">2.3 利用情報</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>システムアクセスログ</li>
                    <li>IPアドレス</li>
                    <li>ブラウザ情報</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">3. 利用目的</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>カスタマーハラスメント事案のAI分析・判定</li>
                <li>事案管理・報告書作成</li>
                <li>システムの運用・保守・改善</li>
                <li>法的対応の支援</li>
                <li>統計データの作成（個人を特定できない形式）</li>
                <li>サポート・問い合わせ対応</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">4. 情報の共有・提供</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  当システムは、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供いたしません。
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体または財産の保護のために必要な場合</li>
                  <li>公衆衛生の向上または児童の健全な育成の推進のため特に必要な場合</li>
                  <li>国の機関等の法令の定める事務に協力する必要がある場合</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">5. データの保存・削除</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  個人情報は適切な期間保存し、保存期間経過後または利用目的達成後は適切に削除いたします。
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>事案データ: 5年間保存</li>
                  <li>ユーザーアカウント情報: 退会後1年間保存</li>
                  <li>アクセスログ: 6ヶ月間保存</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">6. セキュリティ</h2>
              <p className="text-muted-foreground leading-relaxed">
                当システムは、個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のため、適切な技術的・物理的・組織的安全管理措置を講じます。
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">7. ユーザーの権利</h2>
              <p className="text-muted-foreground mb-3">ユーザーは以下の権利を有します：</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>個人情報の開示・訂正・削除の請求</li>
                <li>利用停止の請求</li>
                <li>同意の撤回</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Cookie・トラッキング</h2>
              <p className="text-muted-foreground leading-relaxed">
                当システムでは、サービス向上のためCookieを使用する場合があります。Cookieの使用を希望されない場合は、ブラウザの設定により無効にすることができます。
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">9. プライバシーポリシーの変更</h2>
              <p className="text-muted-foreground leading-relaxed">
                本プライバシーポリシーは、法令の改正やサービス内容の変更等に伴い、予告なく変更する場合があります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">10. お問い合わせ</h2>
              <div className="text-muted-foreground space-y-2">
                <p>個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium">CusHara Sentinel サポート</p>
                  <p>メール: support@cushara-sentinel.jp</p>
                  <p>受付時間: 平日 9:00-17:00</p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPolicy;