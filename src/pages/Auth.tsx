import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Mail, Lock, User, Phone, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schemas
const loginSchema = z.object({
  email: z.string().trim().email({ message: "請輸入有效的電子郵件" }),
  password: z.string().min(6, { message: "密碼至少需要 6 個字元" }),
});

const registerSchema = z.object({
  fullName: z.string().trim().min(1, { message: "請輸入姓名" }).max(100, { message: "姓名不能超過 100 個字元" }),
  phone: z.string().trim().min(1, { message: "請輸入手機號碼" }).max(20, { message: "手機號碼格式不正確" }),
  email: z.string().trim().email({ message: "請輸入有效的電子郵件" }),
  password: z.string().min(6, { message: "密碼至少需要 6 個字元" }),
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "register") {
      setActiveTab("register");
    }
  }, [searchParams]);

  // Check if user is already logged in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validation = loginSchema.safeParse({
      email: loginEmail,
      password: loginPassword,
    });

    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "輸入錯誤",
        description: validation.error.errors[0].message,
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        let message = "登入失敗，請稍後再試";
        if (error.message.includes("Invalid login credentials")) {
          message = "電子郵件或密碼錯誤";
        } else if (error.message.includes("Email not confirmed")) {
          message = "請先確認您的電子郵件";
        }
        toast({
          variant: "destructive",
          title: "登入失敗",
          description: message,
        });
        return;
      }

      toast({
        title: "登入成功",
        description: "歡迎回來！",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "登入失敗",
        description: "發生未知錯誤，請稍後再試",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const validation = registerSchema.safeParse({
      fullName: registerName,
      phone: registerPhone,
      email: registerEmail,
      password: registerPassword,
    });

    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "輸入錯誤",
        description: validation.error.errors[0].message,
      });
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;

      const { error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: registerName,
            phone: registerPhone,
          },
        },
      });

      if (error) {
        let message = "註冊失敗，請稍後再試";
        if (error.message.includes("User already registered")) {
          message = "此電子郵件已被註冊，請直接登入";
        } else if (error.message.includes("Password")) {
          message = "密碼強度不足，請使用更複雜的密碼";
        }
        toast({
          variant: "destructive",
          title: "註冊失敗",
          description: message,
        });
        return;
      }

      toast({
        title: "註冊成功！",
        description: "歡迎加入志工團隊！",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "註冊失敗",
        description: "發生未知錯誤，請稍後再試",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首頁
          </Link>

          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Heart className="h-7 w-7" />
                </div>
              </div>
              <CardTitle className="text-2xl">堀頭里長照志工</CardTitle>
              <CardDescription>
                登入或註冊帳號以管理您的志工服務
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">登入</TabsTrigger>
                  <TabsTrigger value="register">註冊</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">電子郵件</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">密碼</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          登入中...
                        </>
                      ) : (
                        "登入"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">姓名</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="您的姓名"
                          className="pl-10"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">手機號碼</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder="0912-345-678"
                          className="pl-10"
                          value={registerPhone}
                          onChange={(e) => setRegisterPhone(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">電子郵件</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">密碼</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="至少6個字元"
                          className="pl-10"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          註冊中...
                        </>
                      ) : (
                        "註冊成為志工"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <p className="text-center text-sm text-muted-foreground mt-6">
                註冊即表示您同意我們的服務條款與隱私政策
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
