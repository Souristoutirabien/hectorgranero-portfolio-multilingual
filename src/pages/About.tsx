import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const About = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      role: t('cv.experience.terms.role'),
      company: 'Terms.Tech',
      period: t('cv.experience.terms.period'),
      location: t('cv.experience.terms.location'),
      description: t('cv.experience.terms.description'),
      impact: [t('cv.experience.terms.impact1'), t('cv.experience.terms.impact2')]
    },
    {
      role: t('cv.experience.growkap.role'),
      company: 'GrowKap',
      period: t('cv.experience.growkap.period'),
      location: t('cv.experience.growkap.location'),
      description: t('cv.experience.growkap.description'),
      impact: [t('cv.experience.growkap.impact1'), t('cv.experience.growkap.impact2')]
    },
    {
      role: t('cv.experience.area42.role'),
      company: 'AREA42',
      period: t('cv.experience.area42.period'),
      location: t('cv.experience.area42.location'),
      description: t('cv.experience.area42.description'),
      impact: [t('cv.experience.area42.impact1'), t('cv.experience.area42.impact2')]
    },
    {
      role: t('cv.experience.sap.role'),
      company: 'SAP',
      period: t('cv.experience.sap.period'),
      location: t('cv.experience.sap.location'),
      description: t('cv.experience.sap.description'),
      impact: [t('cv.experience.sap.impact1'), t('cv.experience.sap.impact2')]
    }
  ];

  const skills = [
    { category: t('cv.skills.ux.title'), items: t('cv.skills.ux.items').split(','), level: 95 },
    { category: t('cv.skills.systems.title'), items: t('cv.skills.systems.items').split(','), level: 90 },
    { category: t('cv.skills.research.title'), items: t('cv.skills.research.items').split(','), level: 85 },
    { category: t('cv.skills.tools.title'), items: t('cv.skills.tools.items').split(','), level: 90 }
  ];

  const education = [
    {
      degree: t('cv.education.hci.degree'),
      institution: t('cv.education.hci.institution'),
      period: t('cv.education.hci.period')
    },
    {
      degree: t('cv.education.finarts.degree'),
      institution: t('cv.education.finarts.institution'),
      period: t('cv.education.finarts.period')
    }
  ];

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 print:pt-8">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <header className="mb-16 text-center" data-animate>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {t('cv.header.name')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('cv.header.title')}
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('cv.header.tagline')}
            </p>
          </header>

          {/* Bio */}
          <section className="mb-20" data-animate>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed">
                {t('cv.bio.intro')}
              </p>
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="mb-20" data-animate>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 parallax-text">
              {t('cv.experience.title')}
            </h2>
            <div className="relative border-l-2 border-border pl-8 space-y-12">
              {experiences.map((exp, index) => (
                <article
                  key={index}
                  className="relative"
                  data-animate
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -left-[2.6rem] top-2 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      <span className="text-primary font-medium">{exp.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                      <time>{exp.period}</time>
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mt-3">
                      {exp.description}
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      {exp.impact.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Leadership */}
          <section className="mb-20" data-animate>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 parallax-text">
              {t('cv.leadership.title')}
            </h2>
            <div className="p-6 border border-border rounded-lg hover:border-primary transition-colors">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                <h3 className="font-display text-xl font-semibold">
                  {t('cv.leadership.souris.role')}
                </h3>
                <span className="text-primary font-medium">{t('cv.leadership.souris.company')}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {t('cv.leadership.souris.period')} • {t('cv.leadership.souris.location')}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('cv.leadership.souris.description')}
              </p>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-20" data-animate>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 parallax-text">
              {t('cv.skills.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="space-y-3"
                  data-animate
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{skill.category}</h3>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {skill.items.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-20" data-animate>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 parallax-text">
              {t('cv.education.title')}
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="p-6 border border-border rounded-lg hover:border-primary transition-colors"
                  data-animate
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="font-semibold text-foreground mb-1">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <time className="text-sm text-muted-foreground">{edu.period}</time>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="mb-20" data-animate>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 parallax-text">
              {t('cv.languages.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { lang: t('cv.languages.spanish'), level: t('cv.languages.native') },
                { lang: t('cv.languages.catalan'), level: t('cv.languages.native') },
                { lang: t('cv.languages.french'), level: t('cv.languages.fluent') },
                { lang: t('cv.languages.english'), level: t('cv.languages.fluent') },
                { lang: t('cv.languages.italian'), level: t('cv.languages.working') }
              ].map((lang, index) => (
                <div
                  key={index}
                  className="text-center p-4 border border-border rounded-lg"
                  data-animate
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="font-semibold text-foreground">{lang.lang}</div>
                  <div className="text-sm text-muted-foreground mt-1">{lang.level}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Buttons */}
          <section className="text-center space-y-4 print:hidden" data-animate>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="/projects">
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
            <p className="text-sm text-muted-foreground">
              {t('cv.footer.contact')}{' '}
              <a
                href="mailto:hector@souristoutirabien.com"
                className="text-primary hover:underline"
              >
                hector@souristoutirabien.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
