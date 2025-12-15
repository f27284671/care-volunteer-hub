import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Award, CheckCircle } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "愛心關懷",
    description: "以真誠的愛心對待每位長者，讓他們感受到溫暖與關懷。",
  },
  {
    icon: Target,
    title: "專業服務",
    description: "提供完善的志工培訓，確保服務品質與長者安全。",
  },
  {
    icon: Users,
    title: "團隊合作",
    description: "志工彼此支持互助，共同為社區長者創造美好生活。",
  },
  {
    icon: Award,
    title: "持續成長",
    description: "定期舉辦教育訓練，讓志工在服務中不斷成長進步。",
  },
];

const benefits = [
  "免費志工培訓課程",
  "志工服務時數證明",
  "團體意外保險",
  "定期志工聯誼活動",
  "優秀志工表揚獎勵",
  "結交志同道合朋友",
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                關於我們
              </h1>
              <p className="text-lg text-muted-foreground">
                堀頭里長照志工服務團隊，致力於為社區長者提供最溫暖、最貼心的照護服務。
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  我們的使命
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  堀頭里長照志工服務團隊成立於社區的深切關懷之中。
                  我們相信，每一位長者都值得被尊重、被關愛、被陪伴。
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  透過志工的無私奉獻，我們希望能夠填補長者生活中的寂寞與孤單，
                  讓他們在晚年生活中依然感受到社區的溫暖與支持。
                </p>
                <p className="text-lg text-muted-foreground">
                  我們的目標不僅是提供服務，更是建立一個互助互愛的社區網絡，
                  讓每一位成員都能在付出與接受中找到生命的意義與價值。
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">💝</div>
                    <p className="text-2xl font-semibold text-foreground">用愛連結社區</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                核心價值
              </h2>
              <p className="text-lg text-muted-foreground">
                我們以這些核心價值指引每一次的服務
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={value.title}
                  className="text-center border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  志工福利
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  成為堀頭里長照志工，不僅能夠幫助他人，
                  還能獲得許多成長與學習的機會。
                </p>
                <p className="text-lg text-muted-foreground">
                  我們珍視每一位志工的付出，並提供完善的支持與福利，
                  讓您在服務的道路上無後顧之憂。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
