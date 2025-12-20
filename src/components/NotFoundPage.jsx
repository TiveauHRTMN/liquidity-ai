import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

/**
 * NotFoundPage - Branded 404 error page
 */
const NotFoundPage = ({ isDarkMode, onGoHome }) => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-24">
            <div className="text-center max-w-lg">
                {/* 404 Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <span
                        className="text-[150px] md:text-[200px] font-bold leading-none neon-text-gradient"
                        style={{ opacity: 0.9 }}
                    >
                        404
                    </span>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1
                        className="text-2xl md:text-3xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Pagina niet gevonden
                    </h1>
                    <p
                        className="text-base mb-8"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        De pagina die u zoekt bestaat niet of is verplaatst.
                        Geen zorgen, we helpen u graag terug op weg.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onGoHome}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
                        style={{
                            background: 'var(--accent-gradient)',
                            boxShadow: '0 4px 20px var(--accent-glow)'
                        }}
                    >
                        <Home className="w-5 h-5" />
                        Terug naar Home
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium"
                        style={{
                            background: 'var(--glass-border)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Vorige pagina
                    </motion.button>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-16 flex items-center justify-center gap-2"
                >
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent-primary)' }}
                    />
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent-secondary)' }}
                    />
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent-tertiary)' }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;
