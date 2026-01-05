import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const recruitments = [
  {
    id: 1,
    title: "日照協助志工",
    time: "週一至週五 09:00-16:00",
    deadline: "2025/12/31",
    spots: 5,
    status: "招募中",
  },
  {
    id: 2,
    title: "動態活動協助志工",
    time: "週二、週四 14:00-17:00",
    deadline: "2025/12/31",
    spots: 8,
    status: "招募中",
  },
  {
    id: 3,
    title: "宣傳志工",
    time: "彈性時間",
    deadline: "2025/12/31",
    spots: 3,
    status: "招募中",
  },
];

type RecruitmentItem = typeof recruitments[0];

const RecruitmentPreview = () => {
  const [selectedItem, setSelectedItem] = useState<RecruitmentItem | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleApplyClick = async (item: RecruitmentItem) => {
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
    setIsConfirmOpen(true);
  };

  const handleConfirmApply = async () => {
    if (!selectedItem) return;
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    setIsSubmitting(true);
    
    const { error } = await supabase.from("volunteer_registrations").insert({
      user_id: session.user.id,
      recruitment_id: selectedItem.id,
      recruitment_title: selectedItem.title,
      recruitment_time: selectedItem.time,
      recruitment_deadline: selectedItem.deadline,
    });

    setIsSubmitting(false);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "報名失敗",
        description: "請稍後再試",
      });
      setIsConfirmOpen(false);
      return;
    }

    setIsConfirmOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              最新招募資訊
            </h2>
            <p className="text-lg text-muted-foreground">
              查看目前開放報名的志工服務項目
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/recruitment">
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recruitments.map((item, index) => (
            <Card
              key={item.id}
              className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-primary/30 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <Badge variant="default" className="bg-success text-success-foreground shrink-0">
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>報名截止: {item.deadline}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    剩餘名額: <span className="font-semibold text-foreground">{item.spots} 名</span>
                  </span>
                  <Button size="sm" onClick={() => handleApplyClick(item)}>
                    立即報名
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>確認報名</DialogTitle>
            <DialogDescription>
              您確定要報名「{selectedItem?.title}」嗎？
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{selectedItem?.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>報名截止: {selectedItem?.deadline}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmApply} disabled={isSubmitting}>
              {isSubmitting ? "報名中..." : "確認報名"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🎉 報名成功！</DialogTitle>
            <DialogDescription>
              您已成功報名「{selectedItem?.title}」，我們會盡快與您聯繫。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessOpen(false)}>
              確定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RecruitmentPreview;
