import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && textRef.current) {
        const scrolled = window.scrollY;
        const rect = imageRef.current.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (window.innerHeight - rect.top) / window.innerHeight;
          imageRef.current.style.transform = `translateY(${offset * 30}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-20 text-center animate-fade-in">
          {t('about.title')}
        </h1>

        {/* Split Layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Image/Portrait */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] bg-muted rounded-sm overflow-hidden parallax-slow animate-slide-in-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-sm font-medium">Portrait</p>
                <p className="text-xs mt-2">Héctor Granero</p>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div ref={textRef} className="space-y-6 animate-slide-in-right">
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              {t('about.bio1')}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {t('about.bio2')}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {t('about.bio3')}
            </p>
          </div>
        </div>

        {/* Skills/Expertise Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { title: 'UX Design', items: ['Research', 'Prototyping', 'Interface Design', 'User Testing'] },
            { title: 'Motion Design', items: ['Animation', 'Visual Effects', 'Kinetic Typography', 'Brand Motion'] },
            { title: 'Film Direction', items: ['Concept Development', 'Cinematography', 'Editing', 'Storytelling'] },
          ].map((category, index) => (
            <div
              key={category.title}
              className="p-6 border border-border rounded hover:border-primary transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'both' }}
            >
              <h3 className="font-display text-xl font-semibold mb-4">{category.title}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {category.items.map((item) => (
                  <li key={item} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
