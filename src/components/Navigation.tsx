import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/gallery", label: t('nav.gallery') },
    { href: "/exhibitions", label: t('nav.exhibitions') },
    { href: "/media", label: t('nav.media') },
    { href: "/about", label: t('nav.about') }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <Link to="/" className="font-display text-2xl text-primary tracking-tight hover:text-accent transition-colors duration-500">
            Shakart
          </Link>

          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`group relative font-body text-sm uppercase tracking-[0.25em] transition-colors duration-500 ${
                  location.pathname === link.href
                    ? "text-accent"
                    : "text-foreground/70 hover:text-accent"
                }`}
              >
                {link.label}
                <div className={`absolute bottom-0 left-0 w-full h-px bg-accent transition-transform duration-500 ${
                  location.pathname === link.href
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link to="/" className="font-display text-xl text-primary tracking-tight hover:text-accent transition-colors duration-500">
              Shakart
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Horizontal Scrollable Navigation */}
          <div className="overflow-x-scroll scrollbar-hide -mx-4 px-4 touch-pan-x">
            <div className="flex items-center gap-8 w-max">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`group relative font-body text-xs uppercase tracking-[0.25em] transition-colors duration-500 whitespace-nowrap ${
                    location.pathname === link.href
                      ? "text-accent"
                      : "text-foreground/70 hover:text-accent"
                  }`}
                >
                  {link.label}
                  <div className={`absolute bottom-0 left-0 w-full h-px bg-accent transition-transform duration-500 ${
                    location.pathname === link.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;