import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const projectDetailData: Record<string, any> = {
  'digital-banking-ux': {
    title: 'Digital Banking Experience',
    category: 'UX Design',
    year: '2024',
    concept: 'Reimagining mobile banking for a younger, digitally-native audience with focus on simplicity, transparency, and personalization.',
    role: 'Lead UX Designer',
    tools: 'Figma, Principle, After Effects',
    process: 'Conducted extensive user research, created journey maps, developed interactive prototypes, and conducted usability testing across multiple iterations.',
    results: '45% increase in user engagement, 30% reduction in support tickets, and 4.8/5 app store rating.',
  },
  'brand-motion-identity': {
    title: 'Brand Motion Identity',
    category: 'Motion Design',
    year: '2023',
    concept: 'Creating a dynamic visual language that adapts across digital touchpoints while maintaining brand consistency.',
    role: 'Motion Design Director',
    tools: 'After Effects, Cinema 4D, Lottie',
    process: 'Developed motion principles, created animation system, designed transitions, and produced comprehensive motion guidelines.',
    results: 'Successfully implemented across 15+ digital platforms with 200+ motion components.',
  },
  'documentary-short': {
    title: 'The Silent Thread',
    category: 'Film Direction',
    year: '2023',
    concept: 'A poetic exploration of traditional craftspeople adapting to modern technology without losing their artisanal identity.',
    role: 'Director & Cinematographer',
    tools: 'RED Komodo, DaVinci Resolve, Pro Tools',
    process: 'Six-month production including location scouting, interviews, b-roll capture, and post-production editing.',
    results: 'Official selection at 8 film festivals, winner of Best Short Documentary at two festivals.',
  },
  'ecommerce-redesign': {
    title: 'E-commerce Platform Redesign',
    category: 'UX Design',
    year: '2024',
    concept: 'Complete overhaul of checkout flow and product discovery to reduce friction and increase conversion rates.',
    role: 'Senior UX Designer',
    tools: 'Sketch, InVision, Hotjar',
    process: 'Analytics review, A/B testing, persona development, wireframing, and iterative design refinement.',
    results: '62% increase in conversion rate, 40% reduction in cart abandonment.',
  },
  'animated-explainer': {
    title: 'Animated Explainer Series',
    category: 'Motion Design',
    year: '2022',
    concept: 'Making complex financial concepts accessible through engaging, character-driven animations.',
    role: 'Lead Motion Designer & Art Director',
    tools: 'After Effects, Illustrator, Character Animator',
    process: 'Script development, storyboarding, character design, animation, and sound design.',
    results: 'Over 2M views, 85% completion rate, featured in educational platforms.',
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const project = slug ? projectDetailData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-primary hover:underline">
            {t('project.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t('project.back')}</span>
        </Link>

        {/* Hero Section */}
        <div className="mb-16 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-primary">{project.category}</span>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-8">{project.title}</h1>
          
          {/* Hero Image/Video */}
          <div className="aspect-[16/9] bg-muted rounded overflow-hidden mb-12">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent" />
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="animate-slide-in-left">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {t('project.concept')}
              </h3>
              <p className="text-foreground leading-relaxed">{project.concept}</p>
            </div>

            <div className="animate-slide-in-left" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {t('project.role')}
              </h3>
              <p className="text-foreground">{project.role}</p>
            </div>

            <div className="animate-slide-in-left" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {t('project.tools')}
              </h3>
              <p className="text-foreground">{project.tools}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="animate-slide-in-right">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {t('project.process')}
              </h3>
              <p className="text-foreground leading-relaxed">{project.process}</p>
            </div>

            <div className="animate-slide-in-right" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {t('project.results')}
              </h3>
              <p className="text-foreground leading-relaxed">{project.results}</p>
            </div>
          </div>
        </div>

        {/* Additional Images/Content */}
        <div className="space-y-12">
          <div className="aspect-video bg-muted rounded overflow-hidden animate-scale-in">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent" />
          </div>
          <div className="aspect-[4/3] bg-muted rounded overflow-hidden animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
