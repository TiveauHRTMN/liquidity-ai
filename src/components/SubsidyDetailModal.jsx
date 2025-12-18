import { motion } from 'framer-motion';
import {
    X,
    Calendar,
    CheckCircle,
    Euro,
    ExternalLink,
    FileText,
    Clock,
    Target
} from 'lucide-react';
import GlassCard from './GlassCard';

/**
 * SubsidyDetailModal - Detailed view of a subsidy opportunity
 * Shows eligibility, deadlines, and action buttons
 */
const SubsidyDetailModal = ({ subsidy, onClose }) => {
    if (!subsidy) return null;

    const formatCurrency = (amount) => {
        const formatted = new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(Math.abs(amount));
        return amount < 0 ? `-${formatted}` : formatted;
    };

    const getCategoryColor = (category) => {
        const colors = {
            Tax: 'from-blue-500 to-cyan-500',
            Energy: 'from-green-500 to-emerald-500',
            HR: 'from-purple-500 to-violet-500',
            Digital: 'from-orange-500 to-amber-500',
            Export: 'from-pink-500 to-rose-500',
            Finance: 'from-indigo-500 to-blue-500',
        };
        return colors[category] || 'from-gray-500 to-slate-500';
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                <GlassCard className="p-6" animate={false}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${getCategoryColor(subsidy.category)}`}>
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="text-white/50 text-sm uppercase tracking-wider">
                                    {subsidy.category}
                                </span>
                                <h2 className="text-2xl font-bold text-white mt-1">
                                    {subsidy.subsidy}
                                </h2>
                                <p className="text-white/60 mt-1">{subsidy.item}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5 text-white/60" />
                        </button>
                    </div>

                    {/* Potential Amount */}
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Euro className="w-5 h-5 text-red-400" />
                                <span className="text-white/70">Potential Recovery</span>
                            </div>
                            <span className="text-3xl font-bold neon-text-gradient">
                                {formatCurrency(subsidy.amount)}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    {subsidy.description && (
                        <div className="mb-6">
                            <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
                                <FileText className="w-4 h-4 text-white/60" />
                                Description
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                {subsidy.description}
                            </p>
                        </div>
                    )}

                    {/* Deadline */}
                    {subsidy.deadline && (
                        <div className="mb-6">
                            <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
                                <Calendar className="w-4 h-4 text-white/60" />
                                Application Deadline
                            </h3>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                <Clock className="w-5 h-5 text-yellow-400" />
                                <span className="text-white">{subsidy.deadline}</span>
                            </div>
                        </div>
                    )}

                    {/* Eligibility Criteria */}
                    {subsidy.eligibility && subsidy.eligibility.length > 0 && (
                        <div className="mb-6">
                            <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
                                <CheckCircle className="w-4 h-4 text-white/60" />
                                Eligibility Criteria
                            </h3>
                            <div className="space-y-2">
                                {subsidy.eligibility.map((criteria, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle className="w-3 h-3 text-green-400" />
                                        </div>
                                        <span className="text-white/80">{criteria}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 cta-button flex items-center justify-center gap-2"
                        >
                            <span>Start Application</span>
                            <ExternalLink className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="flex-1 py-4 px-6 rounded-xl bg-white/5 border border-white/10 
                       text-white font-semibold hover:bg-white/10 transition-colors"
                        >
                            Save for Later
                        </motion.button>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-white/30 text-xs mt-6">
                        Our experts can help you with the application process
                    </p>
                </GlassCard>
            </motion.div>
        </motion.div>
    );
};

export default SubsidyDetailModal;
