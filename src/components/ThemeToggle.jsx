import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle - Premium Dark/Light mode toggle button
 * Features glassmorphism, glow effects, and smooth transitions
 */
const ThemeToggle = ({ isDark, onToggle }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className="relative p-3 rounded-2xl backdrop-blur-xl transition-all duration-500 group"
            style={{
                background: isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
                border: '1px solid',
                borderColor: isDark
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.08)',
                boxShadow: isDark
                    ? '0 0 20px rgba(250, 204, 21, 0.15)'
                    : '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Glow effect on hover */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: isDark
                        ? 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
                }}
            />

            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? 0 : 180,
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    rotate: { duration: 0.5, ease: 'easeInOut' },
                    scale: { duration: 0.3, delay: 0.1 }
                }}
                className="relative z-10"
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                ) : (
                    <Moon className="w-5 h-5 text-indigo-600" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
