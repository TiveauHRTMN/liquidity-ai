import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Header - Global navigation header with logo and menu
 * Displays on all pages with glassmorphism styling
 */
const Header = ({ isDarkMode, onThemeToggle, onLogoClick, onStartAnalysis, ThemeToggleComponent }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { label: 'Home', href: '#' },
        { label: 'Hoe het werkt', href: '#how-it-works' },
        { label: 'Diensten', href: '#services' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Over ons', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div
                className="mx-4 mt-4 rounded-2xl backdrop-blur-xl border transition-all duration-300"
                style={{
                    background: 'var(--glass-bg)',
                    borderColor: 'var(--glass-border)',
                    boxShadow: 'var(--shadow-elevated)'
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={onLogoClick}
                        >
                            <img
                                src={isDarkMode ? '/logo-dark.png' : '/logo-light.png'}
                                alt="Liquidity"
                                className="h-8 w-auto"
                            />
                        </div>

                        {/* Center: CTA Button + Separator + Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {/* Primary CTA - Between logo and nav */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onStartAnalysis}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300"
                                style={{
                                    background: 'var(--accent-gradient)',
                                    boxShadow: '0 4px 20px var(--accent-glow)'
                                }}
                            >
                                Gratis Analyse
                            </motion.button>

                            {/* Separator */}
                            <div
                                className="w-px h-6"
                                style={{ background: 'var(--glass-border)' }}
                            />

                            {/* Navigation */}
                            <nav className="flex items-center gap-6">
                                {menuItems.map((item, index) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                                        style={{ color: 'var(--text-secondary)' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // First return to landing page if not already there
                                            if (onLogoClick) {
                                                onLogoClick();
                                            }
                                            // Then scroll to section after a brief delay to allow render
                                            setTimeout(() => {
                                                const targetId = item.href.replace('#', '');
                                                const element = document.getElementById(targetId);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }, 100);
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = 'var(--accent-secondary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'var(--text-secondary)';
                                        }}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </nav>
                        </div>

                        {/* Right side: Theme Toggle + Mobile Menu */}
                        <div className="flex items-center gap-4">
                            {ThemeToggleComponent}

                            {/* Mobile Menu Button */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg transition-colors"
                                style={{
                                    background: 'var(--glass-border)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pt-4 border-t"
                            style={{ borderColor: 'var(--glass-border)' }}
                        >
                            <div className="flex flex-col gap-3 pb-4">
                                {menuItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="text-sm font-medium py-2 px-3 rounded-lg transition-colors cursor-pointer"
                                        style={{ color: 'var(--text-secondary)' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsMobileMenuOpen(false);
                                            // First return to landing page if not already there
                                            if (onLogoClick) {
                                                onLogoClick();
                                            }
                                            // Then scroll to section after a brief delay
                                            setTimeout(() => {
                                                const targetId = item.href.replace('#', '');
                                                const element = document.getElementById(targetId);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }, 100);
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <button
                                    className="w-full mt-2 px-5 py-3 rounded-xl text-white text-sm font-semibold"
                                    style={{
                                        background: 'var(--accent-gradient)',
                                        boxShadow: '0 4px 20px var(--accent-glow)'
                                    }}
                                >
                                    Gratis Analyse
                                </button>
                            </div>
                        </motion.nav>
                    )}
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
