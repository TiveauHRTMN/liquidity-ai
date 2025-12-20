import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

/**
 * PricingSection - Three-tier pricing display
 */
const PricingSection = ({ isDarkMode, onStartAnalysis }) => {
    const plans = [
        {
            name: 'Gratis Scan',
            price: '€0',
            period: 'vrijblijvend',
            description: 'Ontdek of u subsidies misloopt',
            features: [
                'AI-gestuurde compatibiliteitscheck',
                'Resultaat: "Ja, er zijn subsidies" of "Nee"',
                'Aantal gevonden regelingen (niet welke)',
                'Geschat totaalpotentieel',
            ],
            cta: 'Scan Nu',
            highlighted: false,
            isLaunch: false,
        },
        {
            name: 'Subsidie Overzicht',
            price: '€79',
            originalPrice: '€149',
            period: 'eenmalig',
            description: 'Ontdek welke subsidies op u wachten',
            features: [
                'Volledige lijst met matchende subsidies',
                'Per regeling: naam, bedrag, deadline',
                'Match-percentage per subsidie',
                'PDF export',
                'Directe toegang (< 2 min)',
            ],
            cta: 'Bekijk Subsidies',
            highlighted: true,
            isLaunch: true,
        },
        {
            name: 'Complete Analyse',
            price: '€349',
            originalPrice: '€599',
            period: 'eenmalig',
            description: 'Alles om direct aan te vragen',
            features: [
                'Alles uit Subsidie Overzicht',
                'Gedetailleerde toelichtingen per regeling',
                'Aanvraag-ready documentatie checklist',
                'Vereisten & voorwaarden uitgelegd',
                'Stappenplan per subsidie',
                '30 dagen email support',
            ],
            cta: 'Start Analyse',
            highlighted: false,
            isLaunch: true,
        },
    ];

    return (
        <section id="pricing" className="py-24 px-6">
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
                        Transparante <span className="neon-text-gradient">Pricing</span>
                    </h2>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Eenmalige investering, geen maandelijkse kosten. Transparant en eerlijk.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className={`relative glass-card p-8 ${plan.highlighted ? 'ring-2 z-10' : ''}`}
                            style={{
                                ...(plan.highlighted && {
                                    '--tw-ring-color': 'var(--accent-secondary)',
                                    transform: 'scale(1.05)',
                                }),
                            }}
                        >
                            {/* Launch/Popular Badge */}
                            {(plan.highlighted || plan.isLaunch) && (
                                <div
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 text-white shadow-lg"
                                    style={{
                                        background: plan.isLaunch ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'var(--accent-gradient)',
                                        boxShadow: plan.isLaunch ? '0 4px 12px rgba(16, 185, 129, 0.4)' : '0 4px 12px var(--accent-glow)'
                                    }}
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {plan.isLaunch ? 'Launch Aanbieding' : 'Meest Populair'}
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3
                                className="text-xl font-semibold mb-2"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div className="mb-2">
                                {plan.originalPrice && (
                                    <span
                                        className="text-lg line-through mr-2"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {plan.originalPrice}
                                    </span>
                                )}
                                <span
                                    className="text-4xl font-bold"
                                    style={{ color: 'var(--accent-secondary)' }}
                                >
                                    {plan.price}
                                </span>
                                <span
                                    className="text-sm ml-2"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    {plan.period}
                                </span>
                            </div>

                            {/* Description */}
                            <p
                                className="text-sm mb-6"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {plan.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-start gap-3 text-sm"
                                    >
                                        <Check
                                            className="w-5 h-5 flex-shrink-0"
                                            style={{ color: 'var(--accent-secondary)' }}
                                        />
                                        <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={plan.name === 'Gratis' ? onStartAnalysis : undefined}
                                className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                                style={{
                                    background: plan.highlighted ? 'var(--accent-gradient)' : 'var(--glass-border)',
                                    color: plan.highlighted ? 'white' : 'var(--text-primary)',
                                    boxShadow: plan.highlighted ? '0 4px 20px var(--accent-glow)' : 'none',
                                }}
                            >
                                {plan.cta}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
