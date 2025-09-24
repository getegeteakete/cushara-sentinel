import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WelcomeEmailRequest {
  userEmail: string;
  userName?: string;
}

// 日本語の歓迎メールHTMLテンプレート
const generateWelcomeEmailHTML = (userName: string, userEmail: string, dashboardUrl: string): string => {
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CusHara Sentinelへようこそ</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #f8fafc;">
    <div style="margin: 0 auto; padding: 20px 0 48px; max-width: 600px;">
        
        <!-- Header -->
        <div style="text-align: center; padding: 32px 20px; background-color: #1e40af; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0 0 8px 0;">🛡️ CusHara Sentinel</h1>
            <p style="color: #e2e8f0; font-size: 16px; margin: 0; font-weight: 500;">AI活用カスタマーハラスメント対策システム</p>
        </div>

        <!-- Content -->
        <div style="padding: 32px 20px; background-color: #ffffff; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; font-size: 24px; font-weight: bold; margin: 0 0 16px 0;">アカウント作成完了のお知らせ</h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 16px 0;">
                ${userName || userEmail} 様
            </p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 16px 0;">
                この度は、CusHara Sentinelにご登録いただき、誠にありがとうございます。<br>
                アカウントの作成が正常に完了いたしました。
            </p>

            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 16px 0;">
                CusHara Sentinelは、AI技術を活用してカスタマーハラスメント（カスハラ）を
                自動検知・分析し、適切な対応策を提案する革新的なシステムです。
            </p>

            <!-- Features Section -->
            <div style="margin: 24px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h3 style="color: #334155; font-size: 18px; font-weight: bold; margin: 0 0 12px 0;">📊 主な機能</h3>
                
                <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 8px 0;">
                    🤖 <strong>AI自動分析</strong>: 高精度なカスハラ判定とリスクスコア算出
                </p>
                <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 8px 0;">
                    📝 <strong>事案管理</strong>: 体系的な事案記録と分析履歴
                </p>
                <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 8px 0;">
                    💡 <strong>対応提案</strong>: AIによる具体的な対応策の提示
                </p>
                <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 8px 0;">
                    📈 <strong>ダッシュボード</strong>: 直感的なデータ可視化
                </p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 32px 0;">
                <a href="${dashboardUrl}" style="background-color: #1e40af; border-radius: 8px; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; text-align: center; display: inline-block; padding: 14px 28px;">
                    ダッシュボードにアクセス
                </a>
            </div>

            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 16px 0;">
                ご不明な点やご質問がございましたら、お気軽にサポートチームまでお問い合わせください。
            </p>

            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 16px 0;">
                CusHara Sentinelで、より安全で快適な顧客対応環境の実現をサポートいたします。
            </p>
        </div>

        <hr style="border-color: #e2e8f0; margin: 32px 0;">

        <!-- Footer -->
        <div style="text-align: center; padding: 0 20px;">
            <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 16px 0;">
                <strong>CusHara Sentinel</strong><br>
                東京都AI活用カスハラ対策システム<br>
                © 2025 CusHara Sentinel. All rights reserved.
            </p>
            
            <p style="color: #64748b; font-size: 12px; margin: 8px 0;">
                <a href="mailto:support@cushara-sentinel.jp" style="color: #1e40af; text-decoration: underline;">サポート問い合わせ</a>
                |
                <a href="#" style="color: #1e40af; text-decoration: underline;">利用規約</a>
                |
                <a href="#" style="color: #1e40af; text-decoration: underline;">プライバシーポリシー</a>
            </p>
        </div>
    </div>
</body>
</html>`;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, userName }: WelcomeEmailRequest = await req.json();

    if (!userEmail) {
      throw new Error('ユーザーのメールアドレスが必要です');
    }

    console.log('Sending welcome email to:', userEmail);

    // ダッシュボードのURLを生成
    const dashboardUrl = `${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '.lovableproject.com') || 'https://your-app-url.com'}/dashboard`;

    // HTMLメールテンプレートを生成
    const html = generateWelcomeEmailHTML(userName || '', userEmail, dashboardUrl);

    // Resend APIを直接呼び出し
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY が設定されていません');
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CusHara Sentinel <noreply@resend.dev>',
        to: [userEmail],
        subject: '🛡️ CusHara Sentinelへようこそ！アカウント作成完了のお知らせ',
        html,
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(`メール送信エラー: ${emailResult.message || emailResponse.statusText}`);
    }

    console.log('Welcome email sent successfully:', emailResult);

    return new Response(JSON.stringify({ 
      success: true,
      emailId: emailResult.id,
      message: '歓迎メールが正常に送信されました'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: 'メール送信中にエラーが発生しました',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});