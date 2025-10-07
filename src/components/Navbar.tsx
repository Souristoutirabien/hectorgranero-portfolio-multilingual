import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isHomePage 
    ? [
        { path: '#about', label: t('nav.about'), isAnchor: true },
        { path: '#projects', label: t('nav.work'), isAnchor: true },
        { path: '#services', label: t('nav.services'), isAnchor: true },
        { path: '#contact', label: t('nav.contact'), isAnchor: true },
      ]
    : [
        { path: '/', label: t('nav.home'), isAnchor: false },
      ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, isAnchor: boolean) => {
    if (isAnchor) {
      e.preventDefault();
      if (!isHomePage) {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(path);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(path);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-display text-xl font-bold tracking-tight">
            <span className="text-foreground">HG</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path, true)}
                  className="text-sm font-medium tracking-wide transition-colors hover:text-primary text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                  language === lang.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg">
            <div className="flex flex-col space-y-4 px-6 py-6">
              {navLinks.map((link) => (
                link.isAnchor ? (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path, true)}
                    className="text-base font-medium text-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium ${
                      location.pathname === link.path ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="flex items-center space-x-2 pt-4 border-t border-border">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-sm font-medium px-3 py-1 rounded ${
                      language === lang.code
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
