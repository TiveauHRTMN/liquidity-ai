import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/**
 * FAQSection - Accordion-style FAQ with common questions
 */
const FAQSection = ({ isDarkMode }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'Hoe werkt de AI subsidie-detectie?',
            answer: 'Onze AI analyseert uw financiële documenten (jaarrekening, BTW-aangiftes, loonstroken) en vergelijkt deze met een database van 200+ Nederlandse subsidies en belastingvoordelen. Binnen enkele minuten identificeren we alle regelingen waar u mogelijk recht op heeft.',
        },
        {
            question: 'Is mijn data veilig?',
            answer: 'Absoluut. We gebruiken 256-bit AES encryptie voor alle uploads en zijn volledig AVG/GDPR compliant. Uw documenten worden automatisch verwijderd na analyse, tenzij u expliciet kiest voor opslag. We delen nooit data met derden.',
        },
        {
            question: 'Wat kost de dienst?',
            answer: 'De eerste analyse is volledig gratis en laat u zien welke subsidies u mogelijk mist. Voor gedetailleerde rapportages en aanvraagondersteuning bieden we betaalde abonnementen vanaf €149/maand. U betaalt alleen als we resultaat leveren.',
        },
        {
            question: 'Welke subsidies worden gedetecteerd?',
            answer: 'We scannen op alle grote Nederlandse subsidies inclusief: WBSO (R&D tax credit), SDE++ (energie), MIT (MKB innovatie), STAP (scholing), en 200+ andere regelingen van RVO, regionale fondsen en Europese programma\'s.',
        },
        {
            question: 'Hoe lang duurt een analyse?',
            answer: 'De AI-scan is binnen 5 minuten klaar. U ontvangt direct een overzicht van geïdentificeerde kansen. Een volledig rapport met concrete actiepunten en aanvraagbegeleiding volgt binnen 24 uur.',
        },
        {
            question: 'Wat als ik al subsidies ontvang?',
            answer: 'Veel bedrijven benutten slechts 20-30% van beschikbare regelingen. Onze benchmark-analyse vergelijkt uw huidige benutting met branchegenoten en identificeert gemiste kansen - zelfs als u al subsidies ontvangt.',
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)'
                        }}
                    >
                        <HelpCircle className="w-4 h-4" style={{ color: 'var(--accent-secondary)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            Veelgestelde Vragen
                        </span>
                    </div>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Heeft u <span className="neon-text-gradient">vragen</span>?
                    </h2>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Hier vindt u antwoorden op de meest gestelde vragen over onze diensten
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="glass-card overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                <span className="font-semibold pr-4">{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown
                                        className="w-5 h-5"
                                        style={{ color: 'var(--accent-secondary)' }}
                                    />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div
                                            className="px-6 pb-5 text-sm leading-relaxed"
                                            style={{
                                                color: 'var(--text-muted)',
                                                borderTop: '1px solid var(--glass-border)',
                                                paddingTop: '1.25rem'
                                            }}
                                        >
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
