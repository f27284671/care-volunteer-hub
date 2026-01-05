import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Registration {
  id: string;
  recruitment_id: number;
  recruitment_title: string;
  recruitment_time: string;
  recruitment_deadline: string;
  status: string;
  created_at: string;
}

interface Profile {
  full_name: string | null;
  phone: string | null;
  address: string | null;
}

const Profile = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile>({ full_name: "", phone: "", address: "" });
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      await Promise.all([fetchProfile(session.user.id), fetchRegistrations(session.user.id)]);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, phone, address")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }

    if (data) {
      setProfile({
        full_name: data.full_name || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    }
  };

  const fetchRegistrations = async (userId: string) => {
    const { data, error } = await supabase
      .from("volunteer_registrations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching registrations:", error);
      return;
    }

    setRegistrations(data || []);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        address: profile.address,
      })
      .eq("user_id", user.id);

    setIsSaving(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "更新失敗",
        description: "請稍後再試",
      });
      return;
    }

    toast({
      title: "更新成功",
      description: "您的個人資料已更新",
    });
  };

  const handleCancelRegistration = async (registrationId: string, title: string) => {
    const { error } = await supabase
      .from("volunteer_registrations")
      .delete()
      .eq("id", registrationId);

    if (error) {
      toast({
        variant: "destructive",
        title: "取消失敗",
        description: "請稍後再試",
      });
      return;
    }

    setRegistrations(registrations.filter(r => r.id !== registrationId));
    toast({
      title: "已取消報名",
      description: `您已取消「${title}」的報名`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-muted/30">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {profile.full_name || user?.email}
                </h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <Tabs defaultValue="registrations" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="registrations">我的報名</TabsTrigger>
                <TabsTrigger value="profile">個人資料</TabsTrigger>
              </TabsList>

              <TabsContent value="registrations" className="mt-6">
                <div className="space-y-4">
                  {registrations.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">您尚未報名任何志工活動</p>
                        <Button className="mt-4" onClick={() => navigate("/recruitment")}>
                          瀏覽招募資訊
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    registrations.map((reg) => (
                      <Card key={reg.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <CardTitle className="text-lg">{reg.recruitment_title}</CardTitle>
                              <CardDescription className="mt-2 space-y-1">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{reg.recruitment_time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>報名截止: {reg.recruitment_deadline}</span>
                                </div>
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="default" className="bg-success text-success-foreground">
                                {reg.status}
                              </Badge>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>確認取消報名</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      您確定要取消「{reg.recruitment_title}」的報名嗎？此操作無法復原。
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>返回</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleCancelRegistration(reg.id, reg.recruitment_title)}>
                                      確認取消
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>編輯個人資料</CardTitle>
                    <CardDescription>更新您的個人資訊</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">姓名</Label>
                        <Input
                          id="full_name"
                          value={profile.full_name || ""}
                          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                          placeholder="請輸入姓名"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">電話</Label>
                        <Input
                          id="phone"
                          value={profile.phone || ""}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          placeholder="請輸入電話"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">地址</Label>
                        <Input
                          id="address"
                          value={profile.address || ""}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          placeholder="請輸入地址"
                        />
                      </div>
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            儲存中...
                          </>
                        ) : (
                          "儲存變更"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
