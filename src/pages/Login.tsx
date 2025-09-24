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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
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

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: "ログインエラー",
          description: error.message,
        });
      } else {
        toast({
          title: "ログイン成功",
          description: "ダッシュボードに移動します",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      setError("ログインに失敗しました");
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
            <CardTitle className="text-2xl text-center">ログイン</CardTitle>
            <CardDescription className="text-center">
              システムにアクセスするには認証が必要です
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

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
                {loading ? "ログイン中..." : "ログイン"}
              </Button>
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