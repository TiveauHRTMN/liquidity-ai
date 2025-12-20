import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, ArrowRight, CheckCircle } from 'lucide-react';

/**
 * Footer - Global footer with company info, links, and social media
 */
const Footer = ({ isDarkMode }) => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    const footerLinks = {
        product: [
            { label: 'Gratis Analyse', href: '#' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Hoe het werkt', href: '#how-it-works' },
            { label: 'Diensten', href: '#services' },
        ],
        company: [
            { label: 'Over ons', href: '#about' },
            { label: 'Contact', href: '#contact' },
            { label: 'Carrières', href: '#careers' },
            { label: 'Blog', href: '#blog' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '#privacy' },
            { label: 'Algemene Voorwaarden', href: '#terms' },
            { label: 'Cookie Policy', href: '#cookies' },
        ],
    };

    const socialLinks = [
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    ];

    return (
        <footer
            className="relative z-10 mt-20 border-t"
            style={{
                background: 'var(--bg-secondary)',
                borderColor: 'var(--glass-border)'
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <img
                            src={isDarkMode ? '/logo-dark.png' : '/logo-light.png'}
                            alt="Liquidity"
                            className="h-10 w-auto mb-4"
                        />
                        <p
                            className="text-sm mb-6 max-w-sm"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            AI-powered subsidie detectie en kapitaal recovery.
                            Wij helpen Nederlandse bedrijven om gemiste subsidies
                            en belastingvoordelen terug te claimen.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a
                                href="mailto:info@liquidity.ai"
                                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                <Mail className="w-4 h-4" />
                                info@liquidity.ai
                            </a>
                            <a
                                href="tel:+31201234567"
                                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                <Phone className="w-4 h-4" />
                                +31 20 123 4567
                            </a>
                            <div
                                className="flex items-center gap-2 text-sm"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                <MapPin className="w-4 h-4" />
                                Amsterdam, Nederland
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--glass-border)' }}>
                            <h4
                                className="font-semibold mb-3 text-sm"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Nieuwsbrief
                            </h4>
                            {isSubscribed ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-2 text-sm"
                                    style={{ color: 'var(--accent-secondary)' }}
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Bedankt voor uw inschrijving!</span>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="uw@email.nl"
                                        className="flex-1 px-4 py-2 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                                        style={{
                                            background: 'var(--bg-primary)',
                                            border: '1px solid var(--glass-border)',
                                            color: 'var(--text-primary)',
                                            '--tw-ring-color': 'var(--accent-secondary)',
                                        }}
                                        required
                                    />
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 rounded-xl text-white"
                                        style={{
                                            background: 'var(--accent-gradient)',
                                            boxShadow: '0 4px 12px var(--accent-glow)',
                                        }}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4
                            className="font-semibold mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Product
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm transition-colors hover:opacity-80"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4
                            className="font-semibold mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Bedrijf
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm transition-colors hover:opacity-80"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4
                            className="font-semibold mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm transition-colors hover:opacity-80"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderColor: 'var(--glass-border)' }}
                >
                    <p
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        © {currentYear} Liquidity AI. Alle rechten voorbehouden.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg transition-colors"
                                style={{
                                    background: 'var(--glass-border)',
                                    color: 'var(--text-secondary)'
                                }}
                                title={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
