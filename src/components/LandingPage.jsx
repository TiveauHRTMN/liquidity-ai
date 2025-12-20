import HeroSection from './landing/HeroSection';
import HowItWorksSection from './landing/HowItWorksSection';
import ServicesSection from './landing/ServicesSection';
import PricingSection from './landing/PricingSection';
import TestimonialsSection from './landing/TestimonialsSection';
import AboutSection from './landing/AboutSection';
import ContactSection from './landing/ContactSection';
import Footer from './Footer';

/**
 * LandingPage - Compose all landing page sections
 * Displays hero, features, pricing, testimonials, about, and contact
 */
const LandingPage = ({ isDarkMode, onStartAnalysis }) => {
    return (
        <div className="relative">
            <HeroSection isDarkMode={isDarkMode} onStartAnalysis={onStartAnalysis} />
            <HowItWorksSection isDarkMode={isDarkMode} />
            <ServicesSection isDarkMode={isDarkMode} />
            <PricingSection isDarkMode={isDarkMode} onStartAnalysis={onStartAnalysis} />
            <TestimonialsSection isDarkMode={isDarkMode} />
            <AboutSection isDarkMode={isDarkMode} />
            <ContactSection isDarkMode={isDarkMode} />
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
};

export default LandingPage;
