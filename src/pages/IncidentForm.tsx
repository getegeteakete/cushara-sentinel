import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateIncident } from "@/hooks/useIncidents";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  Mic, 
  Mail, 
  Brain, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const IncidentForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    source: "email", // email, phone, form, other
    attachments: [] as File[],
    maskPersonalInfo: true
  });
  
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const createIncident = useCreateIncident();
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const analyzeWithAI = async () => {
    if (!formData.description.trim()) {
      toast({
        variant: "destructive",
        title: "エラー",
        description: "事案内容を入力してください",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      console.log('Starting AI analysis...');
      
      const { data: result, error } = await supabase.functions.invoke('analyze-incident', {
        body: {
          title: formData.title,
          description: formData.description,
          incident_date: new Date().toISOString()
        }
      });
      
      if (error) {
        console.error('AI analysis error:', error);
        throw new Error(error.message || 'AI分析に失敗しました');
      }
      
      if (!result) {
        throw new Error('AI分析結果が空です');
      }
      
      console.log('AI analysis result:', result);
      
      // 分析結果をフォーマット（guideline_refsをlegal_groundsから設定）
      const analysis = {
        is_cushara: result.is_cushara,
        categories: result.categories || [],
        risk_score: result.risk_score || 0,
        reasoning: result.reasoning || 'AI分析結果が不完全でした',
        recommended_actions: result.recommended_actions || [],
        guideline_refs: result.legal_grounds || []
      };
      
      setAiAnalysis(analysis);
      setShowAnalysis(true);
      
      toast({
        title: "AI分析完了",
        description: `カスハラ該当性: ${analysis.is_cushara ? '該当' : '非該当'}、リスクスコア: ${analysis.risk_score}`,
      });
      
    } catch (error) {
      console.error('AI analysis failed:', error);
      toast({
        variant: "destructive",
        title: "AI分析エラー",
        description: error instanceof Error ? error.message : 'AI分析中にエラーが発生しました',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "danger";
    if (score >= 60) return "warning";
    return "success";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        variant: "destructive",
        title: "入力エラー",
        description: "タイトルと事案内容は必須です。",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const incidentData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        personal_info_masked: formData.maskPersonalInfo,
        incident_date: new Date().toISOString(),
        ...(aiAnalysis && {
          ai_is_cushara: aiAnalysis.is_cushara,
          ai_categories: aiAnalysis.categories,
          ai_risk_score: aiAnalysis.risk_score,
          ai_reasoning: aiAnalysis.reasoning,
          ai_recommended_actions: aiAnalysis.recommended_actions,
          ai_guideline_refs: aiAnalysis.guideline_refs,
          ai_analyzed_at: new Date().toISOString()
        })
      };

      await createIncident.mutateAsync(incidentData);

      toast({
        title: "事案登録完了",
        description: `事案「${formData.title}」が正常に登録されました。`,
      });

      // フォームをリセット
      setFormData({
        title: "",
        description: "",
        source: "email",
        attachments: [],
        maskPersonalInfo: true
      });
      setAiAnalysis(null);
      setShowAnalysis(false);

      // ダッシュボードに戻る
      navigate("/dashboard");
      
    } catch (error) {
      console.error('事案登録エラー:', error);
      toast({
        variant: "destructive",
        title: "登録エラー",
        description: "事案の登録中にエラーが発生しました。",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">事案登録</h1>
          <p className="text-muted-foreground">
            カスタマーハラスメントの可能性がある事案を記録し、AIによる分析を行います
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>基本情報</span>
              </CardTitle>
              <CardDescription>
                事案の概要と詳細情報を入力してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">事案タイトル</Label>
                <Input
                  id="title"
                  placeholder="例: 営業時間外の執拗な電話要求"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source">発生源</Label>
                <select 
                  className="w-full p-2 border border-input rounded-md bg-background"
                  value={formData.source}
                  onChange={(e) => setFormData(prev => ({...prev, source: e.target.value}))}
                >
                  <option value="email">メール</option>
                  <option value="phone">電話</option>
                  <option value="form">問い合わせフォーム</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">事案内容</Label>
                <Textarea
                  id="description"
                  placeholder="事案の詳細を記入してください。メールの場合はメール本文を、電話の場合は通話内容を記載してください。"
                  className="min-h-32"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="mask-info"
                  checked={formData.maskPersonalInfo}
                  onCheckedChange={(checked) => setFormData(prev => ({...prev, maskPersonalInfo: checked}))}
                />
                <Label htmlFor="mask-info" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>個人情報を自動マスキング（氏名・電話・住所・メール）</span>
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* ファイル添付 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>添付ファイル</span>
              </CardTitle>
              <CardDescription>
                .eml、.msg、.pdf、.wav、.mp3 ファイルが添付可能です
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    ファイルをドラッグ&ドロップまたはクリックして選択
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".eml,.msg,.pdf,.wav,.mp3"
                    onChange={handleFileUpload}
                    className="w-fit mx-auto"
                  />
                </div>
              </div>

              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>添付ファイル ({formData.attachments.length})</Label>
                  <div className="space-y-1">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{file.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {(file.size / 1024).toFixed(1)}KB
                          </Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          削除
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI分析 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-primary" />
                <span>AI分析</span>
              </CardTitle>
              <CardDescription>
                AIによるカスハラ該当性の自動判定を実行します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                type="button"
                onClick={analyzeWithAI}
                disabled={isAnalyzing || !formData.description.trim()}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-spin" />
                    分析中...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    AI分析を実行
                  </>
                )}
              </Button>

              {isAnalyzing && (
                <div className="space-y-2">
                  <Progress value={33} className="animate-pulse" />
                  <p className="text-xs text-center text-muted-foreground">
                    テキスト解析中...
                  </p>
                </div>
              )}

              {aiAnalysis && showAnalysis && (
                <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">AI判定結果</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAnalysis(!showAnalysis)}
                    >
                      {showAnalysis ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        {aiAnalysis.is_cushara ? (
                          <AlertTriangle className="w-5 h-5 text-danger" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-success" />
                        )}
                        <span className="font-medium">
                          {aiAnalysis.is_cushara ? "カスハラ該当の可能性あり" : "カスハラ非該当"}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <Label>検出カテゴリ</Label>
                        <div className="flex flex-wrap gap-1">
                          {aiAnalysis.categories.map((category: string) => (
                            <Badge key={category} variant="outline">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>リスクスコア</Label>
                          <Badge variant={getRiskColor(aiAnalysis.risk_score) as any}>
                            {aiAnalysis.risk_score}/100
                          </Badge>
                        </div>
                        <Progress value={aiAnalysis.risk_score} />
                      </div>

                      <div className="space-y-2">
                        <Label>推奨アクション</Label>
                        <ul className="text-sm space-y-1">
                          {aiAnalysis.recommended_actions.map((action: string, index: number) => (
                            <li key={index} className="flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3 text-success" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>AI判定根拠</Label>
                    <p className="text-sm text-muted-foreground p-3 bg-background rounded-md">
                      {aiAnalysis.reasoning}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>関連指針・条例</Label>
                    <div className="flex gap-2">
                      {aiAnalysis.guideline_refs.map((ref: string) => (
                        <Badge key={ref} variant="secondary" className="text-xs">
                          {ref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 送信ボタン */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              下書き保存
            </Button>
            <Button type="submit" disabled={!formData.title.trim() || !formData.description.trim() || isSubmitting}>
              {isSubmitting ? "登録中..." : "事案を登録"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;