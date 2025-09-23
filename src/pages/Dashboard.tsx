import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  FileText, 
  Clock, 
  Shield,
  CheckCircle,
  XCircle,
  Activity
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("cushara_user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      window.location.href = "/login";
    }
  }, []);

  // ダミーデータ
  const stats = {
    totalIncidents: 47,
    pendingReviews: 12,
    highRiskCases: 5,
    resolvedThisMonth: 23
  };

  const recentIncidents = [
    {
      id: "INC-001",
      type: "メール",
      category: ["暴言", "過度な要求"],
      riskScore: 85,
      status: "pending",
      createdAt: "2024-01-15T10:30:00Z",
      description: "営業時間外の緊急対応要求と暴言を含むメール"
    },
    {
      id: "INC-002", 
      type: "音声通話",
      category: ["長時間拘束", "人格否定"],
      riskScore: 92,
      status: "reviewing",
      createdAt: "2024-01-14T15:45:00Z",
      description: "3時間にわたる電話での執拗な要求と人格攻撃"
    },
    {
      id: "INC-003",
      type: "メール",
      category: ["脅迫"],
      riskScore: 95,
      status: "escalated", 
      createdAt: "2024-01-13T09:15:00Z",
      description: "法的措置を匂わせる脅迫的内容"
    }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 80) return "danger";
    if (score >= 60) return "warning";
    return "success";
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "未対応", variant: "warning" as const },
      reviewing: { label: "確認中", variant: "secondary" as const },
      escalated: { label: "エスカレーション", variant: "danger" as const },
      resolved: { label: "解決済み", variant: "success" as const }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">CusHara Sentinel</h1>
            </div>
            <Badge variant="secondary">{user.role === 'admin' ? '管理者' : user.role === 'manager' ? 'マネージャー' : 'メンバー'}</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              ようこそ、{user.email}さん
            </span>
            <Button 
              variant="outline" 
              onClick={() => {
                localStorage.removeItem("cushara_user");
                window.location.href = "/login";
              }}
            >
              ログアウト
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* アラート */}
        <Alert className="border-danger bg-danger-muted">
          <AlertTriangle className="h-4 w-4 text-danger" />
          <AlertDescription className="text-danger">
            <strong>5件の高リスク事案</strong>が未対応です。早急な確認が必要です。
          </AlertDescription>
        </Alert>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総事案数</CardTitle>
              <FileText className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalIncidents}</div>
              <p className="text-xs text-primary-foreground/80">
                今月 +12% 増加
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-warning text-warning-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">未対応</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReviews}</div>
              <p className="text-xs text-warning-foreground/80">
                24時間以内の確認推奨
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-danger text-danger-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">高リスク</CardTitle>
              <AlertTriangle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.highRiskCases}</div>
              <p className="text-xs text-danger-foreground/80">
                スコア80以上
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-success-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">解決済み</CardTitle>
              <CheckCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolvedThisMonth}</div>
              <p className="text-xs text-success-foreground/80">
                今月の解決数
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 最近の事案 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>最近の事案</span>
            </CardTitle>
            <CardDescription>
              AI判定による最新のカスハラ事案一覧
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map(incident => (
                <div key={incident.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{incident.id}</Badge>
                      <Badge variant="secondary">{incident.type}</Badge>
                      {getStatusBadge(incident.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {incident.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      {incident.category.map(cat => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">リスクスコア:</span>
                      <Badge variant={getRiskColor(incident.riskScore) as any}>
                        {incident.riskScore}
                      </Badge>
                    </div>
                    <Progress 
                      value={incident.riskScore} 
                      className="w-20"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">
                すべての事案を表示
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;