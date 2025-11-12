import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useIncidents } from "@/hooks/useIncidents";
import Header from "@/components/Header";
import { 
  Shield,
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Users,
  TrendingUp,
  Bell,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: incidents, isLoading } = useIncidents();

  // Calculate statistics
  const totalIncidents = incidents?.length || 0;
  const pendingIncidents = incidents?.filter(i => i.status === 'pending' || i.status === 'reviewing').length || 0;
  const highRiskIncidents = incidents?.filter(i => i.ai_risk_score && i.ai_risk_score >= 80).length || 0;
  const resolvedIncidents = incidents?.filter(i => i.status === 'resolved').length || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Alert for high priority incidents */}
          <Alert className="mb-6 border-danger bg-danger-muted">
            <Bell className="h-4 w-4 text-danger" />
            <AlertDescription className="text-danger">
              {highRiskIncidents > 0 ? (
                `高リスク事案が ${highRiskIncidents} 件あります。早急な対応が必要です。`
              ) : (
                '現在、高リスク事案はありません。'
              )}
            </AlertDescription>
          </Alert>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総事案数</CardTitle>
                <FileText className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalIncidents}</div>
                <p className="text-xs opacity-80">
                  登録された全事案
                </p>
              </CardContent>
            </Card>

            <Card className="bg-warning text-warning-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">未対応</CardTitle>
                <Clock className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingIncidents}</div>
                <p className="text-xs opacity-80">
                  対応待ち・審査中
                </p>
              </CardContent>
            </Card>

            <Card className="bg-danger text-danger-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">高リスク</CardTitle>
                <AlertTriangle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{highRiskIncidents}</div>
                <p className="text-xs opacity-80">
                  スコア80以上
                </p>
              </CardContent>
            </Card>

            <Card className="bg-success text-success-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">解決済み</CardTitle>
                <CheckCircle className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resolvedIncidents}</div>
                <p className="text-xs opacity-80">
                  対応完了
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Incidents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>最近の事案</span>
                <Button asChild variant="outline" size="sm">
                  <Link to="/incident/new">新規登録</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incidents && incidents.length > 0 ? (
                <div className="space-y-4">
                  {incidents.slice(0, 5).map((incident) => (
                    <div key={incident.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{incident.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {incident.description.length > 100 
                            ? `${incident.description.substring(0, 100)}...`
                            : incident.description
                          }
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge 
                            variant={
                              incident.status === 'resolved' ? 'default' :
                              incident.status === 'escalated' ? 'destructive' :
                              incident.status === 'reviewing' ? 'secondary' : 'outline'
                            }
                          >
                            {incident.status === 'pending' && '対応待ち'}
                            {incident.status === 'reviewing' && '審査中'}
                            {incident.status === 'resolved' && '解決済み'}
                            {incident.status === 'escalated' && 'エスカレーション'}
                          </Badge>
                          {incident.ai_risk_score && (
                            <Badge 
                              variant={
                                incident.ai_risk_score >= 80 ? 'destructive' :
                                incident.ai_risk_score >= 60 ? 'secondary' : 'outline'
                              }
                            >
                              リスクスコア: {incident.ai_risk_score}
                            </Badge>
                          )}
                          {incident.ai_is_cushara && (
                            <Badge variant="destructive">カスハラ該当</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {new Date(incident.incident_date).toLocaleDateString('ja-JP')}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <Button asChild variant="outline">
                      <Link to="/incidents">すべての事案を見る</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">事案がありません</h3>
                  <p className="text-muted-foreground mb-4">
                    新しい事案を登録して、システムの利用を開始しましょう。
                  </p>
                  <Button asChild>
                    <Link to="/incident/new">
                      <Plus className="w-4 h-4 mr-2" />
                      初回事案を登録
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  ユーザー管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  組織のユーザー権限を管理
                </p>
                <Button variant="outline" className="w-full" disabled>
                  近日対応予定
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  分析レポート
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  事案の統計と傾向分析
                </p>
                <Button variant="outline" className="w-full" disabled>
                  近日対応予定
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  運用ポリシー
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  システム運用ルールの確認・編集
                </p>
                <Button variant="outline" className="w-full" disabled>
                  近日対応予定
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  );
};

export default Dashboard;