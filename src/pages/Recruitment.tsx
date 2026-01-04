import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Filter } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const allRecruitments = [
  {
    id: 1,
    title: "日照協助志工",
    description: "協助日間照顧服務，包含長者用餐、休息、基本生活照護等。",
    location: "堀頭里里民活動中心",
    time: "週一至週五 09:00-16:00",
    deadline: "2025/12/31",
    spots: 5,
    status: "招募中",
    category: "照顧服務",
    requirements: ["年滿20歲", "具基本照護概念", "有耐心與愛心"],
  },
  {
    id: 2,
    title: "動態活動協助志工",
    description: "協助舉辦長者動態活動，如健康操、手作課程、節慶活動等。",
    location: "堀頭里里民活動中心",
    time: "週二、週四 14:00-17:00",
    deadline: "2025/12/31",
    spots: 8,
    status: "招募中",
    category: "活動服務",
    requirements: ["年滿16歲", "活潑熱情", "有活動帶領經驗者佳"],
  },
  {
    id: 3,
    title: "宣傳志工",
    description: "協助長照服務宣傳、社群媒體經營、活動海報設計與發放。",
    location: "堀頭里里民活動中心",
    time: "彈性時間",
    deadline: "2025/12/31",
    spots: 3,
    status: "招募中",
    category: "宣傳服務",
    requirements: ["年滿18歲", "具基本電腦操作能力", "有美編或社群經驗者佳"],
  },
];

const categories = ["全部", "照顧服務", "活動服務", "宣傳服務"];

type RecruitmentItem = typeof allRecruitments[0];

const Recruitment = () => {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedItem, setSelectedItem] = useState<RecruitmentItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredRecruitments = selectedCategory === "全部"
    ? allRecruitments
    : allRecruitments.filter(item => item.category === selectedCategory);

  const handleApplyClick = async (item: RecruitmentItem) => {
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "請先登入",
        description: "您需要登入才能報名志工服務",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleConfirmApply = async () => {
    if (!selectedItem) return;
    
    setIsSubmitting(true);
    // Simulate API call (in real app, this would save to database)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsDialogOpen(false);
    
    toast({
      title: "報名成功！",
      description: `您已成功報名「${selectedItem.title}」，我們會盡快與您聯繫。`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                志工招募資訊
              </h1>
              <p className="text-lg text-muted-foreground">
                查看目前開放報名的志工服務項目，選擇適合您的服務類型，
                一起加入堀頭里長照志工的大家庭。
              </p>
            </div>
          </div>
        </section>

        {/* Filter & List */}
        <section className="py-12">
          <div className="container-custom">
            {/* Filter */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">篩選:</span>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-6">
              {filteredRecruitments.map((item, index) => (
                <Card
                  key={item.id}
                  className="hover:shadow-card transition-all duration-300 border-border/50 hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <Badge variant="default" className="bg-success text-success-foreground">
                            {item.status}
                          </Badge>
                          <Badge variant="secondary">{item.category}</Badge>
                        </div>
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                      </div>
                      <Button 
                        className="shrink-0"
                        onClick={() => handleApplyClick(item)}
                      >
                        立即報名
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>截止: {item.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span>剩餘 {item.spots} 名</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">報名條件：</p>
                      <div className="flex flex-wrap gap-2">
                        {item.requirements.map((req, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認報名</DialogTitle>
            <DialogDescription>
              您確定要報名「{selectedItem?.title}」嗎？
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{selectedItem?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>{selectedItem?.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>報名截止: {selectedItem?.deadline}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmApply} disabled={isSubmitting}>
              {isSubmitting ? "報名中..." : "確認報名"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recruitment;
