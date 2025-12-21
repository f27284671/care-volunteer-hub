import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              <Heart className="h-4 w-4" />
              <span>堀頭里社區服務</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-slide-up">
              用愛心陪伴
              <br />
              <span className="text-primary">溫暖每位長者</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              加入堀頭里長照志工團隊，與我們一起為社區長者提供關懷與陪伴服務。
              您的一份心力，是長者們最溫暖的支持。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?mode=register">
                  <Users className="h-5 w-5" />
                  立即報名志工
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/recruitment">
                  查看招募資訊
                </Link>
              </Button>
            </div>

          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-soft" />
              
              {/* Floating elements */}
              <div className="absolute top-10 left-10 p-4 rounded-2xl bg-card shadow-card animate-float">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              
              <div className="absolute bottom-20 right-10 p-4 rounded-2xl bg-card shadow-card animate-float" style={{ animationDelay: '1s' }}>
                <Users className="h-8 w-8 text-accent" />
              </div>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 rounded-3xl bg-card shadow-elevated">
                  <div className="text-6xl mb-4">🤝</div>
                  <p className="text-lg font-semibold text-foreground">攜手同心</p>
                  <p className="text-sm text-muted-foreground">共創美好社區</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
