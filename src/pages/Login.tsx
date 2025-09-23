import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // デモ用の簡単な認証
    const validUsers = [
      { email: "admin@company.com", password: "admin123", role: "admin" },
      { email: "manager@company.com", password: "manager123", role: "manager" },
      { email: "member@company.com", password: "member123", role: "member" }
    ];

    const user = validUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      // デモ用：ローカルストレージに保存
      localStorage.setItem("cushara_user", JSON.stringify(user));
      window.location.href = "/dashboard";
    } else {
      setError("メールアドレスまたはパスワードが正しくありません");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-muted via-background to-secondary-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-lg">
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@company.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
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
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                ログイン
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-2">デモアカウント:</p>
              <div className="space-y-1 text-muted-foreground">
                <p>• 管理者: admin@company.com / admin123</p>
                <p>• マネージャー: manager@company.com / manager123</p>
                <p>• メンバー: member@company.com / member123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          © 2024 CusHara Sentinel - AI活用カスハラ対策システム
        </p>
      </div>
    </div>
  );
};

export default Login;