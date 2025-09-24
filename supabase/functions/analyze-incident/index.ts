import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { title, description, incident_date } = await req.json();

    if (!title || !description) {
      return new Response(
        JSON.stringify({ error: 'タイトルと詳細は必須です' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Analyzing incident:', { title, description, incident_date });

    // AI分析用のプロンプト
    const systemPrompt = `あなたはカスタマーハラスメント（カスハラ）の専門分析AIです。以下の基準に基づいて事例を分析してください：

カスハラの判定基準：
1. 脅迫・威嚇行為
2. 暴言・差別発言
3. 長時間の拘束・執拗な要求
4. 土下座の要求など人格否定
5. 不当な金銭要求
6. セクシュアルハラスメント
7. 権威を振りかざした高圧的態度
8. SNSでの誹謗中傷予告

リスクスコア（0-100）：
- 0-30: 通常のクレーム（カスハラではない）
- 31-60: 軽度のカスハラ疑い
- 61-80: 明確なカスハラ
- 81-100: 重大なカスハラ（法的対応必要）

回答は必ずJSON形式で以下の構造にしてください：
{
  "is_cushara": boolean,
  "risk_score": number,
  "categories": string[],
  "reasoning": "詳細な分析理由",
  "recommended_actions": string[],
  "legal_grounds": string[]
}`;

    const userPrompt = `事件詳細：
タイトル: ${title}
内容: ${description}
発生日時: ${incident_date || '不明'}

この事例を分析してください。`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // 日本語対応が良い高品質モデル
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      
      // Handle specific quota error
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'OpenAI APIの使用量上限に達しました', 
            details: 'APIキーの使用量制限を確認してください'
          }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Response:', aiResponse);
    
    let analysisResult;
    try {
      analysisResult = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      throw new Error('AI分析結果の解析に失敗しました');
    }

    // 結果の検証と補完
    const result = {
      is_cushara: Boolean(analysisResult.is_cushara),
      risk_score: Math.min(100, Math.max(0, Number(analysisResult.risk_score) || 0)),
      categories: Array.isArray(analysisResult.categories) ? analysisResult.categories : [],
      reasoning: analysisResult.reasoning || 'AI分析結果が不完全でした',
      recommended_actions: Array.isArray(analysisResult.recommended_actions) ? analysisResult.recommended_actions : [],
      legal_grounds: Array.isArray(analysisResult.legal_grounds) ? analysisResult.legal_grounds : []
    };

    console.log('Processed analysis result:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-incident function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'AI分析中にエラーが発生しました', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});