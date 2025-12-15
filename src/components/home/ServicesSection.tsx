import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Clock, Heart, Car, Phone, Users } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "居家陪伴",
    description: "陪伴長者聊天、閱讀、做簡單運動，提供溫暖的社交互動。",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Car,
    title: "外出陪同",
    description: "陪同長者就醫、購物或參加社區活動，確保安全出行。",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Phone,
    title: "電話關懷",
    description: "定期電話問候獨居長者，關心其身心健康狀況。",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    icon: Heart,
    title: "健康促進",
    description: "協助長者進行簡單的健康活動，如散步、做操等。",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Clock,
    title: "日間照顧",
    description: "在社區日照中心協助照顧長者的日常生活起居。",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Users,
    title: "社區活動",
    description: "協助舉辦社區長者活動，如節慶聚會、手作課程等。",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            志工服務內容
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            我們提供多元化的長照服務，讓每位志工都能發揮所長，為社區長者帶來溫暖
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`h-7 w-7 ${service.color}`} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
