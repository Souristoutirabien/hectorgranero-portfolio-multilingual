import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Palette, Film, Layers } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) / window.innerHeight;
            card.style.transform = `translateY(${-offset * 20}px)`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: Layers,
      title: t('services.ux.title'),
      description: t('services.ux.description'),
    },
    {
      icon: Palette,
      title: t('services.motion.title'),
      description: t('services.motion.description'),
    },
    {
      icon: Film,
      title: t('services.film.title'),
      description: t('services.film.description'),
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-20 text-center animate-fade-in">
          {t('services.title')}
        </h1>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group p-8 border border-border rounded hover:border-primary hover:shadow-lg transition-all duration-500 parallax-slow animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'both' }}
              >
                <div className="mb-6 inline-flex p-4 bg-primary/10 rounded">
                  <Icon size={32} className="text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to collaborate?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how we can bring your vision to life through thoughtful design and storytelling.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
