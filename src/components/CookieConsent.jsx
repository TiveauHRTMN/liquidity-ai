import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

/**
 * CookieConsent - GDPR/AVG compliant cookie consent banner
 */
const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4"
                >
                    <div
                        className="max-w-4xl mx-auto rounded-2xl p-6 backdrop-blur-xl border"
                        style={{
                            background: 'var(--glass-bg)',
                            borderColor: 'var(--glass-border)',
                            boxShadow: 'var(--shadow-elevated)'
                        }}
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            {/* Icon */}
                            <div
                                className="p-3 rounded-xl flex-shrink-0"
                                style={{ background: 'var(--glass-border)' }}
                            >
                                <Cookie className="w-6 h-6" style={{ color: 'var(--accent-secondary)' }} />
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <h4
                                    className="font-semibold mb-1"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    Wij gebruiken cookies 🍪
                                </h4>
                                <p
                                    className="text-sm"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    We gebruiken cookies om uw ervaring te verbeteren en onze diensten te optimaliseren.
                                    Door op "Accepteren" te klikken, stemt u in met ons{' '}
                                    <a
                                        href="#cookies"
                                        className="underline hover:opacity-80"
                                        style={{ color: 'var(--accent-secondary)' }}
                                    >
                                        cookiebeleid
                                    </a>.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleDecline}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                                    style={{
                                        background: 'var(--glass-border)',
                                        color: 'var(--text-secondary)'
                                    }}
                                >
                                    Weigeren
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAccept}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                                    style={{
                                        background: 'var(--accent-gradient)',
                                        boxShadow: '0 4px 12px var(--accent-glow)'
                                    }}
                                >
                                    Accepteren
                                </motion.button>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={handleDecline}
                                className="absolute top-3 right-3 md:hidden p-1 rounded-lg transition-colors"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
