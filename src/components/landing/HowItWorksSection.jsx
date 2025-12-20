import { motion } from 'framer-motion';
import { Upload, Cpu, FileCheck, ArrowRight } from 'lucide-react';

/**
 * HowItWorksSection - 3-step process visualization
 */
const HowItWorksSection = ({ isDarkMode }) => {
    const steps = [
        {
            icon: Upload,
            number: '01',
            title: 'Upload Documenten',
            description: 'Upload uw jaarrekening, BTW-aangiftes of loonstroken. Wij accepteren PDF, Excel en CSV formaten.',
        },
        {
            icon: Cpu,
            number: '02',
            title: 'AI Analyse',
            description: 'Onze AI scant uw documenten en vergelijkt met 200+ beschikbare subsidies en belastingvoordelen.',
        },
        {
            icon: FileCheck,
            number: '03',
            title: 'Ontvang Rapport',
            description: 'Binnen minuten ontvangt u een gedetailleerd rapport met alle gemiste kansen en concrete actiepunten.',
        },
    ];

    return (
        <section id="how-it-works" className="py-24 px-6">
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
                        Hoe het <span className="neon-text-gradient">Werkt</span>
                    </h2>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        In drie eenvoudige stappen naar maximale subsidie-recovery
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative"
                        >
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div
                                    className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px"
                                    style={{ background: 'var(--glass-border)' }}
                                />
                            )}

                            {/* Card */}
                            <div
                                className="glass-card p-8 text-center h-full"
                            >
                                {/* Step Number */}
                                <div
                                    className="text-6xl font-bold opacity-20 mb-4"
                                    style={{ color: 'var(--accent-secondary)' }}
                                >
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div
                                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                                    style={{
                                        background: 'var(--accent-gradient)',
                                        boxShadow: '0 8px 32px var(--accent-glow)'
                                    }}
                                >
                                    <step.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-xl font-semibold mb-3"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
