import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroRef.current.style.opacity = `${1 - scrolled / 800}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-background to-background">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 animate-pulse" />
        
        <div ref={heroRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto parallax-slow">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
            {t('hero.title').split('. ').map((word, index) => (
              <span
                key={index}
                className="inline-block animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'both' }}
              >
                {word}
                {index < 2 && '. '}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            {t('hero.tagline')}
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded hover:shadow-lg hover:scale-105 transition-all duration-300 animate-scale-in"
            style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
          >
            {t('nav.work')}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-sm mb-2">{t('hero.scroll')}</span>
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* Visual Divider with Parallax */}
      <section className="h-40 bg-gradient-to-b from-background to-muted" />
    </div>
  );
};

export default Home;
