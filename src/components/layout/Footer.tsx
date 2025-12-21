import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">堀頭里長照志工</h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              用愛心與關懷，為社區長者提供最溫暖的陪伴與服務。
              歡迎加入我們，一起為社區貢獻心力。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold">快速連結</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                首頁
              </Link>
              <Link to="/recruitment" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                招募資訊
              </Link>
              <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                志工登入
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold">聯絡資訊</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>632雲林縣虎尾鎮堀頭里52號</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>05-6220077</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} 堀頭里長照志工服務系統. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
