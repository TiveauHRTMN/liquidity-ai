import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, TrendingUp } from 'lucide-react';

/**
 * HeroSection - Main hero with value proposition
 * Premium 2025 design with gradient text and animated CTAs
 */
const HeroSection = ({ isDarkMode, onStartAnalysis }) => {
    const stats = [
        { value: '€2.4M+', label: 'Teruggevorderd' },
        { value: '500+', label: 'Bedrijven' },
        { value: '98%', label: 'Succesrate' },
    ];

    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center py-20 px-6">
            <div className="max-w-6xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                    style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)'
                    }}
                >
                    <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-secondary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                        AI-Powered Subsidie Detectie
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Ontdek Gemiste{' '}
                    <span className="neon-text-gradient">Subsidies</span>
                    <br />
                    & Belastingvoordelen
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl max-w-3xl mx-auto mb-10"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Onze AI analyseert uw financiële documenten en identificeert tot{' '}
                    <strong style={{ color: 'var(--accent-secondary)' }}>€50.000+</strong> aan onbenutte
                    subsidies en belastingvoordelen. Volledig geautomatiseerd, 100% veilig.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: ["0 4px 20px var(--accent-glow)", "0 4px 25px rgba(139, 92, 246, 0.6)", "0 4px 20px var(--accent-glow)"]
                        }}
                        transition={{
                            boxShadow: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        onClick={onStartAnalysis}
                        className="cta-button flex items-center gap-3 text-lg"
                    >
                        <span>Gratis Analyse Starten</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    <motion.a
                        whileHover={{ scale: 1.02 }}
                        href="#how-it-works"
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300"
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        Hoe het werkt
                    </motion.a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                >
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="text-center">
                            <div
                                className="text-2xl md:text-3xl font-bold mb-1"
                                style={{ color: 'var(--accent-secondary)' }}
                            >
                                {stat.value}
                            </div>
                            <div
                                className="text-sm"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-6"
                >
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <Shield className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                        <span>256-bit Encryptie</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                        <span>Gemiddeld €14.000 teruggevorderd</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
