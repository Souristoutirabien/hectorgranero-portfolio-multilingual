import { useLanguage } from '@/contexts/LanguageContext';
import { Linkedin, Mail, Instagram } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Brand */}
          <div className="font-display text-xl font-bold tracking-tight">
            Héctor Granero
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="mailto:hello@hectorgranero.com"
              className="text-secondary-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} Héctor Granero. {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
