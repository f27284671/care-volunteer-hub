import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const recruitments = [
  {
    id: 1,
    title: "居家陪伴志工",
    location: "堀頭里社區",
    time: "週一至週五 09:00-12:00",
    deadline: "2024/02/28",
    spots: 5,
    status: "招募中",
  },
  {
    id: 2,
    title: "日照中心協助志工",
    location: "堀頭里日照中心",
    time: "週二、週四 14:00-17:00",
    deadline: "2024/03/15",
    spots: 3,
    status: "招募中",
  },
  {
    id: 3,
    title: "社區活動志工",
    location: "堀頭里活動中心",
    time: "週六 09:00-12:00",
    deadline: "2024/03/01",
    spots: 10,
    status: "招募中",
  },
];

const RecruitmentPreview = () => {
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
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{item.location}</span>
                  </div>
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
                  <Button size="sm" asChild>
                    <Link to={`/auth?mode=register`}>
                      立即報名
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruitmentPreview;
