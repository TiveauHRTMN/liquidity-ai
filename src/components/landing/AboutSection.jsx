import { motion } from 'framer-motion';
import { Target, Users, Award, Heart } from 'lucide-react';

/**
 * AboutSection - Company information and values
 */
const AboutSection = ({ isDarkMode }) => {
    const values = [
        {
            icon: Target,
            title: 'Missie',
            description: 'Elk Nederlands bedrijf helpen om geen enkele subsidie of belastingvoordeel te missen.',
        },
        {
            icon: Users,
            title: 'Team',
            description: 'Experts in fiscaal recht, subsidies en AI-technologie werken samen voor uw succes.',
        },
        {
            icon: Award,
            title: 'Expertise',
            description: '15+ jaar ervaring in Nederlandse subsidiewereld, 200+ regelingen in ons systeem.',
        },
        {
            icon: Heart,
            title: 'Waarden',
            description: 'Transparantie, resultaatgerichtheid en persoonlijke aandacht staan centraal.',
        },
    ];

    return (
        <section id="about" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Over <span className="neon-text-gradient">Liquidity AI</span>
                        </h2>

                        <p
                            className="text-lg mb-6 leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Liquidity AI is ontstaan uit een simpele frustratie: te veel Nederlandse
                            bedrijven lopen jaarlijks miljoenen euro's aan subsidies mis. Niet omdat
                            ze er geen recht op hebben, maar omdat het landschap te complex is.
                        </p>

                        <p
                            className="text-lg mb-8 leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Onze AI-technologie verandert dat. Door slimme analyse van uw financiële
                            documenten identificeren we automatisch alle subsidies en belastingvoordelen
                            waar u recht op heeft – zodat u zich kunt focussen op wat echt belangrijk is:
                            uw bedrijf laten groeien.
                        </p>

                        {/* Mini Stats */}
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: 'var(--accent-secondary)' }}
                                >
                                    2019
                                </div>
                                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    Opgericht
                                </div>
                            </div>
                            <div>
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: 'var(--accent-secondary)' }}
                                >
                                    Amsterdam
                                </div>
                                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    Hoofdkantoor
                                </div>
                            </div>
                            <div>
                                <div
                                    className="text-3xl font-bold"
                                    style={{ color: 'var(--accent-secondary)' }}
                                >
                                    25+
                                </div>
                                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    Teamleden
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Values Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="glass-card p-6"
                            >
                                <div
                                    className="w-10 h-10 mb-4 rounded-xl flex items-center justify-center"
                                    style={{ background: 'var(--glass-border)' }}
                                >
                                    <value.icon
                                        className="w-5 h-5"
                                        style={{ color: 'var(--accent-secondary)' }}
                                    />
                                </div>
                                <h3
                                    className="font-semibold mb-2"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {value.title}
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
