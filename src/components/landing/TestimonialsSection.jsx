import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

/**
 * TestimonialsSection - Customer testimonials with social proof
 */
const TestimonialsSection = ({ isDarkMode }) => {
    const testimonials = [
        {
            name: 'Jan van der Berg',
            role: 'CEO, TechStart B.V.',
            content: 'Dankzij Liquidity AI hebben we €28.000 aan gemiste WBSO subsidies teruggevorderd. Het proces was volledig geautomatiseerd en binnen een week hadden we resultaat.',
            rating: 5,
            avatar: 'JB',
        },
        {
            name: 'Maria Jansen',
            role: 'CFO, GreenEnergy Solutions',
            content: 'De benchmark analyse opende onze ogen. We benutten slechts 30% van de beschikbare subsidies terwijl onze concurrenten op 75% zaten. Dat is nu opgelost.',
            rating: 5,
            avatar: 'MJ',
        },
        {
            name: 'Peter de Vries',
            role: 'Founder, InnovatieHub',
            content: 'Elke maand ontvang ik alerts over nieuwe subsidie-mogelijkheden. Het Professional abonnement betaalt zichzelf terug binnen de eerste week.',
            rating: 5,
            avatar: 'PV',
        },
    ];

    const stats = [
        { value: '€2.4M+', label: 'Totaal Teruggevorderd' },
        { value: '500+', label: 'Tevreden Klanten' },
        { value: '98%', label: 'Succesvolle Aanvragen' },
        { value: '4.9/5', label: 'Gemiddelde Beoordeling' },
    ];

    return (
        <section id="testimonials" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
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
                        Wat Klanten <span className="neon-text-gradient">Zeggen</span>
                    </h2>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Ontdek hoe andere bedrijven profiteren van onze AI-gedreven subsidie-recovery
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, rotate: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="glass-card p-6"
                        >
                            {/* Quote Icon */}
                            <Quote
                                className="w-8 h-8 mb-4 opacity-30"
                                style={{ color: 'var(--accent-secondary)' }}
                            />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-current"
                                        style={{ color: '#facc15' }}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p
                                className="text-sm leading-relaxed mb-6"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                                    style={{ background: 'var(--accent-gradient)' }}
                                >
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div
                                        className="font-semibold text-sm"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {testimonial.name}
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card p-8"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
