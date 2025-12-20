import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

/**
 * ContactSection - Contact form and business information
 */
const ContactSection = ({ isDarkMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', company: '', message: '' });
        }, 3000);
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'info@liquidity.ai', href: 'mailto:info@liquidity.ai' },
        { icon: Phone, label: 'Telefoon', value: '+31 20 123 4567', href: 'tel:+31201234567' },
        { icon: MapPin, label: 'Adres', value: 'Amsterdam, Nederland', href: null },
    ];

    return (
        <section id="contact" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
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
                        Neem <span className="neon-text-gradient">Contact</span> Op
                    </h2>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Heeft u vragen? Ons team staat klaar om u te helpen.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8"
                    >
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center h-full py-12">
                                <CheckCircle
                                    className="w-16 h-16 mb-4"
                                    style={{ color: 'var(--accent-secondary)' }}
                                />
                                <h3
                                    className="text-xl font-semibold mb-2"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Bericht Verzonden!
                                </h3>
                                <p
                                    className="text-sm text-center"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    We nemen zo snel mogelijk contact met u op.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            Naam
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2"
                                            style={{
                                                background: 'var(--bg-primary)',
                                                borderColor: 'var(--glass-border)',
                                                color: 'var(--text-primary)',
                                                '--tw-ring-color': 'var(--accent-secondary)',
                                            }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2"
                                            style={{
                                                background: 'var(--bg-primary)',
                                                borderColor: 'var(--glass-border)',
                                                color: 'var(--text-primary)',
                                                '--tw-ring-color': 'var(--accent-secondary)',
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        Bedrijfsnaam
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2"
                                        style={{
                                            background: 'var(--bg-primary)',
                                            borderColor: 'var(--glass-border)',
                                            color: 'var(--text-primary)',
                                            '--tw-ring-color': 'var(--accent-secondary)',
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        Bericht
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 resize-none"
                                        style={{
                                            background: 'var(--bg-primary)',
                                            borderColor: 'var(--glass-border)',
                                            color: 'var(--text-primary)',
                                            '--tw-ring-color': 'var(--accent-secondary)',
                                        }}
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition-all duration-300"
                                    style={{
                                        background: 'var(--accent-gradient)',
                                        boxShadow: '0 4px 20px var(--accent-glow)',
                                    }}
                                >
                                    <span>Verstuur Bericht</span>
                                    <Send className="w-5 h-5" />
                                </motion.button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="space-y-8">
                            {contactInfo.map((info) => (
                                <div key={info.label} className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'var(--glass-border)' }}
                                    >
                                        <info.icon
                                            className="w-6 h-6"
                                            style={{ color: 'var(--accent-secondary)' }}
                                        />
                                    </div>
                                    <div>
                                        <div
                                            className="text-sm font-medium mb-1"
                                            style={{ color: 'var(--text-muted)' }}
                                        >
                                            {info.label}
                                        </div>
                                        {info.href ? (
                                            <a
                                                href={info.href}
                                                className="text-lg font-semibold transition-colors hover:opacity-80"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <div
                                                className="text-lg font-semibold"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {info.value}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Business Hours */}
                        <div
                            className="mt-12 p-6 rounded-2xl"
                            style={{
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                            }}
                        >
                            <h4
                                className="font-semibold mb-4"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Openingstijden
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--text-muted)' }}>Maandag - Vrijdag</span>
                                    <span style={{ color: 'var(--text-secondary)' }}>09:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--text-muted)' }}>Weekend</span>
                                    <span style={{ color: 'var(--text-secondary)' }}>Gesloten</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
