import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projectsData = [
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
  {
    id: 4,
    slug: 'ecommerce-redesign',
    title: 'E-commerce Platform Redesign',
    category: 'UX Design',
    year: '2024',
    description: 'Complete redesign focusing on conversion and user engagement',
  },
  {
    id: 5,
    slug: 'animated-explainer',
    title: 'Animated Explainer Series',
    category: 'Motion Design',
    year: '2022',
    description: 'Series of motion graphics explaining complex financial concepts',
  },
];

const Projects = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-20 text-center animate-fade-in">
          {t('projects.title')}
        </h1>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${project.slug}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              {/* Project Image/Thumbnail */}
              <div className="relative aspect-[16/10] bg-muted rounded overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/30 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2 bg-background/90 px-6 py-3 rounded">
                    <span className="text-sm font-medium">{t('projects.view')}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs font-medium bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
