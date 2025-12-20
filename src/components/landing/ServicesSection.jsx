import { motion } from 'framer-motion';
import { Search, Calculator, Bell, BarChart3, FileText, Zap } from 'lucide-react';

/**
 * ServicesSection - Feature cards showcasing capabilities
 */
const ServicesSection = ({ isDarkMode }) => {
    const services = [
        {
            icon: Search,
            title: 'Subsidie Detectie',
            description: 'Automatische identificatie van WBSO, SDE++, MIT, en 200+ andere beschikbare subsidies.',
            highlight: '200+ Subsidies',
        },
        {
            icon: Calculator,
            title: 'Belastingvoordelen',
            description: 'Analyse van gemiste aftrekposten, innovatiebox, en fiscale faciliteiten.',
            highlight: 'Tot €50K Besparing',
        },
        {
            icon: BarChart3,
            title: 'Benchmark Analyse',
            description: 'Vergelijk uw subsidie-benutting met concurrenten in uw sector.',
            highlight: 'Sector Insights',
        },
        {
            icon: Bell,
            title: 'Real-time Alerts',
            description: 'Ontvang meldingen over nieuwe subsidies en deadlines die relevant zijn voor uw bedrijf.',
            highlight: 'Nooit Meer Missen',
        },
        {
            icon: FileText,
            title: 'Aanvraag Ondersteuning',
            description: 'Complete begeleiding bij het indienen van subsidieaanvragen met expert review.',
            highlight: '98% Succesrate',
        },
        {
            icon: Zap,
            title: 'Instant Rapportage',
            description: 'Gedetailleerde rapporten binnen enkele minuten, exporteerbaar naar PDF en Excel.',
            highlight: '< 5 Minuten',
        },
    ];

    return (
        <section id="services" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Onze <span className="neon-text-gradient">Diensten</span>
                    </h2>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Alles wat u nodig heeft om geen enkele subsidie of belastingvoordeel te missen
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 group cursor-pointer"
                        >
                            {/* Icon */}
                            <div
                                className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                style={{
                                    background: 'var(--glass-border)',
                                }}
                            >
                                <service.icon
                                    className="w-6 h-6"
                                    style={{ color: 'var(--accent-secondary)' }}
                                />
                            </div>

                            {/* Content */}
                            <h3
                                className="text-lg font-semibold mb-2"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {service.title}
                            </h3>

                            <p
                                className="text-sm mb-4 leading-relaxed"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {service.description}
                            </p>

                            {/* Highlight Badge */}
                            <div
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                    background: 'var(--accent-gradient)',
                                    color: 'white',
                                }}
                            >
                                {service.highlight}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
