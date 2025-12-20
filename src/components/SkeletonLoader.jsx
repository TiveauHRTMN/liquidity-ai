import { motion } from 'framer-motion';

/**
 * SkeletonLoader - Reusable skeleton loading components
 */

// Base skeleton shimmer animation
const shimmer = {
    initial: { backgroundPosition: '-200% 0' },
    animate: { backgroundPosition: '200% 0' },
};

// Skeleton base style
const getSkeletonStyle = () => ({
    background: 'linear-gradient(90deg, var(--glass-border) 25%, var(--glass-bg) 50%, var(--glass-border) 75%)',
    backgroundSize: '200% 100%',
    borderRadius: '8px',
});

/**
 * Text skeleton - for loading text content
 */
export const SkeletonText = ({ width = '100%', height = '1rem', className = '' }) => (
    <motion.div
        initial="initial"
        animate="animate"
        variants={shimmer}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className={className}
        style={{
            ...getSkeletonStyle(),
            width,
            height,
        }}
    />
);

/**
 * Card skeleton - for loading card content
 */
export const SkeletonCard = ({ className = '' }) => (
    <div
        className={`glass-card p-6 ${className}`}
        style={{ background: 'var(--glass-bg)' }}
    >
        <SkeletonText width="40%" height="1.5rem" className="mb-4" />
        <SkeletonText width="100%" height="0.875rem" className="mb-2" />
        <SkeletonText width="80%" height="0.875rem" className="mb-2" />
        <SkeletonText width="60%" height="0.875rem" />
    </div>
);

/**
 * Stat skeleton - for loading stat numbers
 */
export const SkeletonStat = ({ className = '' }) => (
    <div className={`text-center ${className}`}>
        <SkeletonText width="80px" height="2rem" className="mx-auto mb-2" />
        <SkeletonText width="60px" height="0.875rem" className="mx-auto" />
    </div>
);

/**
 * Avatar skeleton - for loading profile images
 */
export const SkeletonAvatar = ({ size = 40, className = '' }) => (
    <motion.div
        initial="initial"
        animate="animate"
        variants={shimmer}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className={className}
        style={{
            ...getSkeletonStyle(),
            width: size,
            height: size,
            borderRadius: '50%',
        }}
    />
);

/**
 * Table row skeleton - for loading table data
 */
export const SkeletonTableRow = ({ columns = 4, className = '' }) => (
    <div className={`flex items-center gap-4 p-4 ${className}`}>
        {[...Array(columns)].map((_, i) => (
            <SkeletonText
                key={i}
                width={i === 0 ? '30%' : '20%'}
                height="1rem"
            />
        ))}
    </div>
);

/**
 * Dashboard skeleton - for loading the full dashboard
 */
export const SkeletonDashboard = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
            <SkeletonText width="200px" height="2rem" />
            <SkeletonText width="120px" height="2.5rem" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>

        {/* Table */}
        <div className="glass-card p-6">
            <SkeletonText width="150px" height="1.5rem" className="mb-6" />
            <div className="space-y-2">
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
            </div>
        </div>
    </div>
);

export default {
    SkeletonText,
    SkeletonCard,
    SkeletonStat,
    SkeletonAvatar,
    SkeletonTableRow,
    SkeletonDashboard,
};
