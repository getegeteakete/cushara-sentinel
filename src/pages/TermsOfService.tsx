import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">利用規約</h1>
          <p className="text-muted-foreground">最終更新日: 2024年12月</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>利用規約</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">第1条（適用）</h2>
              <p className="text-muted-foreground leading-relaxed">
                本利用規約（以下「本規約」）は、CusHara Sentinel（以下「当システム」）の利用条件を定めるものです。ユーザーは、当システムをご利用いただく際には、本規約に同意いただいたものとみなします。
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第2条（定義）</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground mb-3">本規約において、次の各号に掲げる用語の意義は、当該各号に定めるところによります。</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>「当システム」</strong>：CusHara Sentinelが提供するカスタマーハラスメント対策AIシステム</li>
                  <li><strong>「ユーザー」</strong>：当システムに登録し、利用する個人または法人</li>
                  <li><strong>「事案」</strong>：ユーザーが当システムに登録するカスタマーハラスメント関連の情報</li>
                  <li><strong>「AI分析」</strong>：当システムが提供する人工知能による事案の自動分析機能</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第3条（利用資格）</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground mb-3">当システムは、以下の条件を満たす方にご利用いただけます。</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>企業・団体に所属し、カスタマーハラスメント対策の担当者である方</li>
                  <li>本規約および関連する法令を遵守できる方</li>
                  <li>正確な情報を提供いただける方</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第4条（アカウント管理）</h2>
              <div className="space-y-3">
                <ul className="list-decimal pl-6 text-muted-foreground space-y-2">
                  <li>ユーザーは、アカウント情報の管理責任を負います。</li>
                  <li>アカウント情報の不正使用による損害について、当システムは責任を負いません。</li>
                  <li>アカウントの共有は禁止いたします。</li>
                  <li>不正アクセスや情報漏洩の疑いがある場合は、速やかにご連絡ください。</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第5条（禁止行為）</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground mb-3">ユーザーは、当システムの利用にあたり、以下の行為を行ってはなりません。</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>法令に違反する行為</li>
                  <li>虚偽の情報を登録する行為</li>
                  <li>第三者の権利を侵害する行為</li>
                  <li>システムに負荷をかける行為</li>
                  <li>不正アクセスやハッキング行為</li>
                  <li>当システムの運営を妨害する行為</li>
                  <li>その他、当システムが不適切と判断する行為</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第6条（サービス内容）</h2>
              <div className="space-y-3">
                <p className="text-muted-foreground mb-3">当システムは以下のサービスを提供します。</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>カスタマーハラスメント事案のAI分析・判定</li>
                  <li>事案管理・追跡機能</li>
                  <li>報告書自動生成機能</li>
                  <li>統計・分析機能</li>
                  <li>法的対応支援情報の提供</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第7条（免責事項）</h2>
              <div className="space-y-3">
                <ul className="list-decimal pl-6 text-muted-foreground space-y-2">
                  <li>AI分析結果は参考情報であり、最終的な判断はユーザーの責任で行ってください。</li>
                  <li>システムの一時的な停止や障害による損害について、当システムは責任を負いません。</li>
                  <li>ユーザーが当システムを通じて得た情報の利用による損害について、当システムは責任を負いません。</li>
                  <li>外部リンクや第三者サービスに関する損害について、当システムは責任を負いません。</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第8条（知的財産権）</h2>
              <p className="text-muted-foreground leading-relaxed">
                当システムに関する知的財産権は、当システムまたは正当な権利者に帰属します。ユーザーは、これらの権利を侵害してはなりません。
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第9条（サービスの変更・終了）</h2>
              <div className="space-y-3">
                <ul className="list-decimal pl-6 text-muted-foreground space-y-2">
                  <li>当システムは、予告なくサービス内容を変更または終了する場合があります。</li>
                  <li>サービス終了の場合、ユーザーデータのエクスポート期間を設けます。</li>
                  <li>サービス変更・終了による損害について、当システムは責任を負いません。</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第10条（利用停止）</h2>
              <p className="text-muted-foreground leading-relaxed">
                当システムは、ユーザーが本規約に違反した場合、予告なくサービスの利用を停止または制限する場合があります。
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第11条（規約の変更）</h2>
              <p className="text-muted-foreground leading-relaxed">
                本規約は、法令の改正やサービス内容の変更等に伴い、予告なく変更する場合があります。変更後の規約は、本ページに掲載した時点から効力を生じます。
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第12条（準拠法・管轄裁判所）</h2>
              <p className="text-muted-foreground leading-relaxed">
                本規約は日本法に準拠し、当システムに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">第13条（お問い合わせ）</h2>
              <div className="text-muted-foreground space-y-2">
                <p>本規約に関するお問い合わせは、以下までご連絡ください。</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium">CusHara Sentinel サポート</p>
                  <p>メール: sup@cushara99.com</p>
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

export default TermsOfService;