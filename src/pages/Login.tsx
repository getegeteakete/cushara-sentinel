import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignUp && password !== confirmPassword) {
      setError("パスワードが一致しません");
      setLoading(false);
      return;
    }

    if (isSignUp && password.length < 6) {
      setError("パスワードは6文字以上である必要があります");
      setLoading(false);
      return;
    }

    try {
      let result;
      if (isSignUp) {
        result = await signUp(email, password);
      } else {
        result = await signIn(email, password);
      }
      
      if (result.error) {
        setError(result.error.message);
        toast({
          variant: "destructive",
          title: isSignUp ? "アカウント作成エラー" : "ログインエラー",
          description: result.error.message,
        });
      } else {
        const successMessage = isSignUp 
          ? "アカウントが作成されました。ダッシュボードに移動します。" 
          : "ログインしました。ダッシュボードに移動します。";
        
        toast({
          title: isSignUp ? "アカウント作成成功" : "ログイン成功",
          description: successMessage,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      setError(isSignUp ? "アカウント作成に失敗しました" : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            CusHara Sentinel
          </h1>
          <p className="text-muted-foreground">
            カスタマーハラスメント対策AIシステム
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isSignUp ? "アカウント作成" : "ログイン"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? "新しいアカウントを作成してください" 
                : "システムにアクセスするには認証が必要です"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cushara-sentinel.jp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isSignUp ? "6文字以上のパスワード" : "パスワード"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="パスワードを再入力"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              {error && (
                <Alert className="border-danger bg-danger-muted">
                  <AlertCircle className="h-4 w-4 text-danger" />
                  <AlertDescription className="text-danger">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 transition-colors"
                disabled={loading}
              >
                {loading 
                  ? (isSignUp ? "アカウント作成中..." : "ログイン中...") 
                  : (isSignUp ? "アカウント作成" : "ログイン")
                }
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                    setConfirmPassword("");
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  {isSignUp 
                    ? "既にアカウントをお持ちですか？ログイン" 
                    : "アカウントをお持ちでない方はこちら"
                  }
                </button>
              </div>
            </form>

          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          © 2025 CusHara Sentinel - AI活用カスハラ対策システム
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;