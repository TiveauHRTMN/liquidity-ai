import { motion } from 'framer-motion';

/**
 * GlassCard - Reusable glassmorphism container component
 * Applies the Dark Glass Citadel design system styling
 */
const GlassCard = ({
    children,
    className = '',
    variant = 'default',
    animate = true,
    delay = 0,
    ...props
}) => {
    const variants = {
        default: 'bg-white/5',
        dark: 'bg-slate-900/40',
        danger: 'bg-red-900/20',
    };

    const baseClasses = `
    rounded-2xl 
    border border-white/10 
    ${variants[variant]} 
    backdrop-blur-xl 
    shadow-2xl 
    relative 
    overflow-hidden
  `;

    const animationProps = animate ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    } : {};

    return (
        <motion.div
            className={`${baseClasses} ${className}`}
            {...animationProps}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
