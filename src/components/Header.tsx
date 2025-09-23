import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  Shield, 
  Plus,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-border bg-card/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CusHara Sentinel</h1>
              <p className="text-sm text-muted-foreground">
                {user ? "ダッシュボード" : "AIカスハラ対策システム"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Authenticated navigation
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link to="/dashboard">
                        <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          isActive("/dashboard") ? "bg-accent text-accent-foreground" : ""
                        }`}>
                          ダッシュボード
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>事案管理</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[400px]">
                          <Link
                            to="/incident/new"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">新規事案登録</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              新しいカスハラ事案を登録する
                            </p>
                          </Link>
                          <Link
                            to="/incidents"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">事案一覧</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              登録済み事案の確認・管理
                            </p>
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/guide">
                        <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          isActive("/guide") ? "bg-accent text-accent-foreground" : ""
                        }`}>
                          使い方ガイド
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/about-ai-anti-cushara">
                        <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          isActive("/about-ai-anti-cushara") ? "bg-accent text-accent-foreground" : ""
                        }`}>
                          AI活用について
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center space-x-3 ml-4">
                  <Badge variant="outline">{user.email}</Badge>
                  <Button asChild>
                    <Link to="/incident/new">
                      <Plus className="w-4 h-4 mr-2" />
                      新規事案登録
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    ログアウト
                  </Button>
                </div>
              </>
            ) : (
              // Public navigation
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link to="/">
                        <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          isActive("/") ? "bg-accent text-accent-foreground" : ""
                        }`}>
                          ホーム
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/guide">
                        <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          isActive("/guide") ? "bg-accent text-accent-foreground" : ""
                        }`}>
                          使い方ガイド
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/about-ai-anti-cushara">
                        <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          isActive("/about-ai-anti-cushara") ? "bg-accent text-accent-foreground" : ""
                        }`}>
                          AI活用について
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <Button asChild className="ml-4">
                  <Link to="/login">ログイン</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="pt-4 space-y-2">
              {user ? (
                // Authenticated mobile navigation
                <>
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isActive("/dashboard") ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ダッシュボード
                  </Link>
                  <Link
                    to="/incident/new"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isActive("/incident/new") ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    新規事案登録
                  </Link>
                  <Link
                    to="/guide"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isActive("/guide") ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    使い方ガイド
                  </Link>
                  <Link
                    to="/about-ai-anti-cushara"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isActive("/about-ai-anti-cushara") ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AI活用について
                  </Link>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="px-3 py-2">
                      <Badge variant="outline">{user.email}</Badge>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      ログアウト
                    </Button>
                  </div>
                </>
              ) : (
                // Public mobile navigation
                <>
                  <Link
                    to="/"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isActive("/") ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ホーム
                  </Link>
                  <Link
                    to="/guide"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isActive("/guide") ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    使い方ガイド
                  </Link>
                  <Link
                    to="/about-ai-anti-cushara"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isActive("/about-ai-anti-cushara") ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AI活用について
                  </Link>
                  <div className="border-t border-border pt-2 mt-2">
                    <Button asChild className="w-full">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        ログイン
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;