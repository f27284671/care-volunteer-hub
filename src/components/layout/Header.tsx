import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, User, LogIn, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navLinks = [
    { href: "/", label: "首頁" },
    { href: "/recruitment", label: "招募資訊" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "登出失敗",
        description: "請稍後再試",
      });
      return;
    }
    toast({
      title: "已登出",
      description: "期待您再次回來！",
    });
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Heart className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">堀頭里</span>
              <span className="text-xs text-muted-foreground">長照志工服務</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <User className="h-4 w-4" />
                  {user.user_metadata?.full_name || user.email}
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  登出
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">
                    <LogIn className="h-4 w-4" />
                    登入
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?mode=register">
                    <User className="h-4 w-4" />
                    成為志工
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      {user.user_metadata?.full_name || user.email}
                    </Link>
                    <Button variant="outline" className="justify-center" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      登出
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="justify-center">
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4" />
                        登入
                      </Link>
                    </Button>
                    <Button asChild className="justify-center">
                      <Link to="/auth?mode=register" onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4" />
                        成為志工
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
