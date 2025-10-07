import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'hero.title': 'Design. Motion. Storytelling.',
    'hero.tagline': 'Crafting meaningful experiences through UX design, motion graphics, and cinematic narratives.',
    'hero.scroll': 'Scroll to explore',
    'about.title': 'About Me',
    'about.bio1': 'I\'m Héctor Granero, a multidisciplinary designer and filmmaker with a passion for blending digital innovation with cinematic storytelling.',
    'about.bio2': 'With years of experience in UX design, motion graphics, and film direction, I create experiences that resonate emotionally and function beautifully.',
    'about.bio3': 'My approach combines strategic thinking, visual aesthetics, and narrative depth to craft work that stands out in the digital landscape.',
    'projects.title': 'Selected Work',
    'projects.view': 'View Project',
    'services.title': 'Services',
    'services.ux.title': 'UX Design',
    'services.ux.description': 'User-centered design solutions that combine research, strategy, and interface design to create intuitive digital experiences.',
    'services.motion.title': 'Motion Design',
    'services.motion.description': 'Dynamic visual storytelling through animation, bringing brands and ideas to life with compelling motion graphics.',
    'services.film.title': 'Film Direction',
    'services.film.description': 'Cinematic narratives that capture emotion and meaning, from concept development to final production.',
    'contact.title': 'Let\'s Create Something Meaningful',
    'contact.intro': 'Whether it\'s a new project, collaboration, or just a conversation about design and storytelling, I\'d love to hear from you.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'footer.rights': 'All rights reserved.',
    'project.concept': 'Concept',
    'project.role': 'Role',
    'project.tools': 'Tools',
    'project.process': 'Process',
    'project.results': 'Results',
    'project.back': 'Back to Work',
  },
  fr: {
    'nav.work': 'Travaux',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'hero.title': 'Design. Motion. Storytelling.',
    'hero.tagline': 'Créer des expériences significatives à travers le design UX, le motion graphics et les récits cinématographiques.',
    'hero.scroll': 'Défiler pour explorer',
    'about.title': 'À propos de moi',
    'about.bio1': 'Je suis Héctor Granero, designer multidisciplinaire et cinéaste passionné par le mélange de l\'innovation digitale et de la narration cinématographique.',
    'about.bio2': 'Avec des années d\'expérience en design UX, motion graphics et réalisation, je crée des expériences qui résonnent émotionnellement et fonctionnent magnifiquement.',
    'about.bio3': 'Mon approche combine réflexion stratégique, esthétique visuelle et profondeur narrative pour créer un travail qui se démarque dans le paysage digital.',
    'projects.title': 'Travaux sélectionnés',
    'projects.view': 'Voir le projet',
    'services.title': 'Services',
    'services.ux.title': 'Design UX',
    'services.ux.description': 'Solutions de design centrées sur l\'utilisateur qui combinent recherche, stratégie et design d\'interface pour créer des expériences digitales intuitives.',
    'services.motion.title': 'Motion Design',
    'services.motion.description': 'Storytelling visuel dynamique par l\'animation, donnant vie aux marques et aux idées avec des motion graphics convaincants.',
    'services.film.title': 'Réalisation',
    'services.film.description': 'Récits cinématographiques qui capturent émotion et sens, du développement du concept à la production finale.',
    'contact.title': 'Créons quelque chose de significatif',
    'contact.intro': 'Que ce soit un nouveau projet, une collaboration ou simplement une conversation sur le design et le storytelling, j\'aimerais vous entendre.',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'footer.rights': 'Tous droits réservés.',
    'project.concept': 'Concept',
    'project.role': 'Rôle',
    'project.tools': 'Outils',
    'project.process': 'Processus',
    'project.results': 'Résultats',
    'project.back': 'Retour aux travaux',
  },
  es: {
    'nav.work': 'Trabajo',
    'nav.about': 'Sobre mí',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'hero.title': 'Design. Motion. Storytelling.',
    'hero.tagline': 'Creando experiencias significativas a través del diseño UX, motion graphics y narrativas cinematográficas.',
    'hero.scroll': 'Desplázate para explorar',
    'about.title': 'Sobre mí',
    'about.bio1': 'Soy Héctor Granero, diseñador multidisciplinario y cineasta con pasión por fusionar la innovación digital con la narrativa cinematográfica.',
    'about.bio2': 'Con años de experiencia en diseño UX, motion graphics y dirección de cine, creo experiencias que resuenan emocionalmente y funcionan bellamente.',
    'about.bio3': 'Mi enfoque combina pensamiento estratégico, estética visual y profundidad narrativa para crear trabajo que destaca en el panorama digital.',
    'projects.title': 'Trabajo seleccionado',
    'projects.view': 'Ver proyecto',
    'services.title': 'Servicios',
    'services.ux.title': 'Diseño UX',
    'services.ux.description': 'Soluciones de diseño centradas en el usuario que combinan investigación, estrategia y diseño de interfaz para crear experiencias digitales intuitivas.',
    'services.motion.title': 'Motion Design',
    'services.motion.description': 'Storytelling visual dinámico a través de animación, dando vida a marcas e ideas con motion graphics cautivadores.',
    'services.film.title': 'Dirección de Cine',
    'services.film.description': 'Narrativas cinematográficas que capturan emoción y significado, desde el desarrollo del concepto hasta la producción final.',
    'contact.title': 'Creemos algo significativo',
    'contact.intro': 'Ya sea un nuevo proyecto, colaboración o simplemente una conversación sobre diseño y storytelling, me encantaría saber de ti.',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar mensaje',
    'footer.rights': 'Todos los derechos reservados.',
    'project.concept': 'Concepto',
    'project.role': 'Rol',
    'project.tools': 'Herramientas',
    'project.process': 'Proceso',
    'project.results': 'Resultados',
    'project.back': 'Volver al trabajo',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
