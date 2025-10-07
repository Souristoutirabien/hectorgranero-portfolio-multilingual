import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight, Palette, Film, Layers, Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useMultiIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s\-']+$/, { message: "Name contains invalid characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

const Home = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize intersection observer for scroll animations
  useMultiIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = contactSchema.parse(formData);
      
      const sanitizedData = {
        name: validated.name.replace(/[<>]/g, ''),
        email: validated.email.replace(/[<>]/g, ''),
        message: validated.message.replace(/[<>]/g, ''),
      };
      
      toast.success('Message sent! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error('Please fix the errors in the form');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Featured projects data
  const featuredProjects = [
    {
      id: 1,
      slug: 'digital-banking-ux',
      title: 'Digital Banking Experience',
      category: 'UX Design',
      year: '2024',
      description: 'Redesigning the mobile banking experience for next-generation users',
    },
    {
      id: 2,
      slug: 'brand-motion-identity',
      title: 'Brand Motion Identity',
      category: 'Motion Design',
      year: '2023',
      description: 'Kinetic logo system and motion guidelines for a tech startup',
    },
    {
      id: 3,
      slug: 'documentary-short',
      title: 'The Silent Thread',
      category: 'Film Direction',
      year: '2023',
      description: 'A documentary short exploring the intersection of craft and technology',
    },
  ];

  // Services data
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

  // About section data
  const experiences = [
    {
      role: t('cv.experience.terms.role'),
      company: 'Terms.Tech',
      period: t('cv.experience.terms.period'),
      location: t('cv.experience.terms.location'),
      description: t('cv.experience.terms.description'),
    },
    {
      role: t('cv.experience.growkap.role'),
      company: 'GrowKap',
      period: t('cv.experience.growkap.period'),
      location: t('cv.experience.growkap.location'),
      description: t('cv.experience.growkap.description'),
    },
    {
      role: t('cv.experience.area42.role'),
      company: 'AREA42',
      period: t('cv.experience.area42.period'),
      location: t('cv.experience.area42.location'),
      description: t('cv.experience.area42.description'),
    },
  ];

  const skillCategories = [
    { 
      title: t('cv.skills.ux.title'), 
      items: t('cv.skills.ux.items').split(',').map(item => item.trim())
    },
    { 
      title: t('cv.skills.systems.title'), 
      items: t('cv.skills.systems.items').split(',').map(item => item.trim())
    },
    { 
      title: t('cv.skills.research.title'), 
      items: t('cv.skills.research.items').split(',').map(item => item.trim())
    },
    { 
      title: t('cv.skills.tools.title'), 
      items: t('cv.skills.tools.items').split(',').map(item => item.trim())
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-background to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        
        <div ref={heroRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
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
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded hover:shadow-lg hover:scale-105 transition-all duration-300 animate-scale-in"
            style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
          >
            {t('nav.work')}
          </a>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-bounce">
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-sm mb-2">{t('hero.scroll')}</span>
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-[100dvh] py-20 md:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-12 text-center" data-animate>
            {t('cv.header.name')}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground text-center mb-6" data-animate>
            {t('cv.header.title')}
          </p>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16 leading-relaxed" data-animate>
            {t('cv.bio.intro')}
          </p>

          {/* Experience Timeline - Condensed */}
          <div className="mb-16" data-animate>
            <h3 className="font-display text-3xl font-bold mb-8 text-center">{t('cv.experience.title')}</h3>
            <div className="relative border-l-2 border-border pl-8 space-y-8 max-w-3xl mx-auto">
              {experiences.map((exp, index) => (
                <article key={index} className="relative" data-animate>
                  <div className="absolute -left-[2.6rem] top-2 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  <div className="space-y-1">
                    <h4 className="font-display text-lg font-semibold">{exp.role}</h4>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period} • {exp.location}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="mb-12" data-animate>
            <h3 className="font-display text-3xl font-bold mb-8 text-center">{t('cv.skills.title')}</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {skillCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-lg border border-border bg-card/50 hover:border-primary/50 transition-colors"
                  data-animate
                >
                  <h4 className="font-semibold text-lg mb-4">{category.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIndex) => (
                      <Badge 
                        key={itemIndex} 
                        variant="outline"
                        className="text-sm"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4" data-animate>
            <Button asChild size="lg" className="gap-2">
              <a href="#projects">
                {t('cv.cta.viewWork')}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="/CV_HectorGranero_UX_2025.pdf" download>
                {t('cv.cta.downloadCV')}
                <Download className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="relative min-h-[100dvh] py-20 md:py-32 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-20 text-center" data-animate>
            {t('projects.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto mb-12">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/project/${project.slug}`}
                className="group"
                data-animate
              >
                <div className="relative aspect-[4/3] bg-muted rounded overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/30 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-2 bg-background/90 px-6 py-3 rounded">
                      <span className="text-sm font-medium">{t('projects.view')}</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs font-medium bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative min-h-[100dvh] py-20 md:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-20 text-center" data-animate>
            {t('services.title')}
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group p-8 border border-border rounded hover:border-primary hover:shadow-lg transition-all duration-500"
                  data-animate
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-[100dvh] py-20 md:py-32 bg-gradient-to-b from-muted to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 animate-pulse pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16" data-animate>
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.intro')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6" data-animate>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {t('contact.name')}
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="w-full bg-card border-border focus:border-primary transition-colors"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t('contact.email')}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  autoComplete="email"
                  className="w-full bg-card border-border focus:border-primary transition-colors"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={6}
                  className="w-full bg-card border-border focus:border-primary transition-colors resize-none"
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 py-6 text-lg"
              >
                {t('contact.send')}
              </Button>
            </form>

            <div className="mt-16 text-center space-y-4" data-animate>
              <p className="text-muted-foreground">Or reach out directly</p>
              <a
                href="mailto:hector@souristoutirabien.com"
                className="block text-xl font-medium text-primary hover:underline"
              >
                hector@souristoutirabien.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
