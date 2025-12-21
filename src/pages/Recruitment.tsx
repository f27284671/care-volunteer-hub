import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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

const Recruitment = () => {
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const filteredRecruitments = selectedCategory === "全部"
    ? allRecruitments
    : allRecruitments.filter(item => item.category === selectedCategory);

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
                      <Button asChild className="shrink-0">
                        <Link to="/auth?mode=register">
                          立即報名
                        </Link>
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
    </div>
  );
};

export default Recruitment;
