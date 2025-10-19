import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { href: "/about", label: t('nav.about') },
    { href: "/gallery", label: t('nav.gallery') },
    { href: "/exhibitions", label: t('nav.exhibitions') },
    { href: "/media", label: t('nav.media') },
    { href: "/contact", label: t('nav.contact') }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 gallery-glass border-b border-border/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display text-3xl text-primary tracking-gallery hover:text-accent transition-colors duration-500">
            Shakart
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-sm uppercase tracking-widest transition-all duration-500 hover:text-accent ${
                  location.pathname === link.href
                    ? "text-primary border-b-2 border-accent pb-1"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="font-body">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] gallery-glass">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-body text-base uppercase tracking-widest transition-all duration-500 hover:text-accent ${
                        location.pathname === link.href
                          ? "text-primary border-b-2 border-accent pb-2"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border/20">
                    <LanguageSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;