import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 animate-pulse pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.intro')}
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 animate-scale-in">
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
                className="w-full bg-card border-border focus:border-primary transition-colors"
              />
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
                className="w-full bg-card border-border focus:border-primary transition-colors"
              />
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
                rows={6}
                className="w-full bg-card border-border focus:border-primary transition-colors resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 py-6 text-lg"
            >
              {t('contact.send')}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="mt-16 text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <p className="text-muted-foreground">Or reach out directly</p>
            <a
              href="mailto:hello@hectorgranero.com"
              className="block text-xl font-medium text-primary hover:underline"
            >
              hello@hectorgranero.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
