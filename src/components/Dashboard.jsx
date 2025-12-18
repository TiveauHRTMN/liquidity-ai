import { motion } from 'framer-motion';
import {
    AlertTriangle,
    TrendingDown,
    Target,
    Zap,
    ArrowRight,
    Euro,
    Building2,
    Users,
    FileCheck,
    ChevronRight,
    Bell,
    Download
} from 'lucide-react';
import GlassCard from './GlassCard';

/**
 * Dashboard - Main panic UI displaying capital leakage analysis
 * Features glassmorphism cards with neon red loss visualization
 * Now accepts data from API and callback handlers
 */
const Dashboard = ({
    data = null,
    onSubsidyClick = () => { },
    onEmailAlert = () => { },
    backendAvailable = true
}) => {
    // Use API data or fallback to defaults
    const totalLeakage = data?.totalLeakage ?? -14200;
    const subsidies = data?.subsidies ?? [];
    const benchmarkData = data?.benchmark ?? { you: 23, competitors: 67 };

    const formatCurrency = (amount) => {
        const formatted = new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(Math.abs(amount));
        return amount < 0 ? `-${formatted}` : formatted;
    };

    const getCategoryIcon = (category) => {
        const icons = {
            Tax: FileCheck,
            Energy: Zap,
            HR: Users,
            Digital: Target,
            Export: Building2,
            Finance: Euro,
        };
        return icons[category] || FileCheck;
    };

    const handleExportPDF = () => {
        // Trigger browser print dialog for PDF export
        window.print();
    };

    const handleExportCSV = () => {
        // Generate CSV content
        const headers = ['Item', 'Subsidy', 'Category', 'Amount'];
        const rows = subsidies.map(s => [s.item, s.subsidy, s.category, s.amount]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'liquidity-analysis.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    const gapPercentage = Math.abs(benchmarkData.competitors - benchmarkData.you);

    return (
        <div className="min-h-screen p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="h-9 w-auto" />
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">
                                Liquidity <span className="neon-text-gradient">AI</span>
                            </h1>
                            <p className="text-white/40 text-xs tracking-wide">Stop Bleeding Capital. Start Claiming Yours.</p>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center gap-3">
                        {/* Backend Status Indicator */}
                        {!backendAvailable && (
                            <span className="text-yellow-400/70 text-xs px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20">
                                Demo Mode
                            </span>
                        )}

                        {/* Export Buttons */}
                        <div className="hidden sm:flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleExportCSV}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                title="Export CSV"
                            >
                                <Download className="w-4 h-4 text-white/60" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onEmailAlert}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                title="Email Alerts"
                            >
                                <Bell className="w-4 h-4 text-white/60" />
                            </motion.button>
                        </div>

                        <div className="flex items-center gap-2 text-white/60">
                            <div className="pulse-dot" />
                            <span className="text-sm font-medium hidden sm:inline">Live Analysis</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Hero Card - Total Capital Leakage */}
                    <GlassCard className="p-8" delay={0.1}>
                        <div className="relative">
                            {/* Scan Line Effect */}
                            <div className="scan-line" />

                            <div className="flex items-center gap-2 mb-4">
                                <TrendingDown className="w-5 h-5 text-red-400" />
                                <span className="text-white/60 font-medium uppercase tracking-wider text-sm">
                                    Total Capital Leakage
                                </span>
                            </div>

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                                className="mb-6"
                            >
                                <span className="text-5xl lg:text-6xl xl:text-7xl font-bold neon-text-gradient animate-glow">
                                    {formatCurrency(totalLeakage)}
                                </span>
                            </motion.div>

                            <div className="flex items-center gap-4 text-white/50 text-sm flex-wrap">
                                <div className="flex items-center gap-2">
                                    <Euro className="w-4 h-4" />
                                    <span>Per Year (Estimated)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-red-400" />
                                    <span className="text-red-400">{subsidies.length} Opportunities Found</span>
                                </div>
                            </div>

                            {/* Warning Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute top-0 right-0 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30"
                            >
                                <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">
                                    Critical
                                </span>
                            </motion.div>
                        </div>
                    </GlassCard>

                    {/* Benchmark Card */}
                    <GlassCard className="p-8" delay={0.2}>
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="w-5 h-5 text-purple-400" />
                            <span className="text-white/60 font-medium uppercase tracking-wider text-sm">
                                Subsidy Utilization Benchmark
                            </span>
                        </div>

                        <div className="space-y-6">
                            {/* Your Performance */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white font-medium">Your Company</span>
                                    <span className="text-red-400 font-bold">{benchmarkData.you}%</span>
                                </div>
                                <div className="progress-bar h-4">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${benchmarkData.you}%` }}
                                        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                                        className="progress-bar-fill bg-gradient-to-r from-red-500 to-red-400"
                                        style={{ boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' }}
                                    />
                                </div>
                            </div>

                            {/* Competitors Performance */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white font-medium">Industry Average</span>
                                    <span className="text-green-400 font-bold">{benchmarkData.competitors}%</span>
                                </div>
                                <div className="progress-bar h-4">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${benchmarkData.competitors}%` }}
                                        transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
                                        className="progress-bar-fill bg-gradient-to-r from-green-500 to-emerald-400"
                                        style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' }}
                                    />
                                </div>
                            </div>

                            {/* Gap Indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                            >
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                    <div>
                                        <p className="text-white font-medium">
                                            You're leaving <span className="text-red-400 font-bold">{gapPercentage}%</span> on the table
                                        </p>
                                        <p className="text-white/50 text-sm">
                                            Compared to industry competitors
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </GlassCard>
                </div>

                {/* Detected Items Table Card */}
                <GlassCard className="p-6 lg:p-8 mb-6" delay={0.3}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span className="text-white/60 font-medium uppercase tracking-wider text-sm">
                                Detected Opportunities
                            </span>
                        </div>
                        <span className="text-white/40 text-sm">
                            Click row for details
                        </span>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left text-white/40 font-medium text-sm pb-4 pr-4">
                                        Detected Item
                                    </th>
                                    <th className="text-left text-white/40 font-medium text-sm pb-4 pr-4">
                                        Subsidy Name
                                    </th>
                                    <th className="text-right text-white/40 font-medium text-sm pb-4">
                                        Potential Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subsidies.map((item, index) => {
                                    const CategoryIcon = getCategoryIcon(item.category);
                                    return (
                                        <motion.tr
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            onClick={() => onSubsidyClick(item)}
                                            className="table-row-hover border-b border-white/5 cursor-pointer group"
                                        >
                                            <td className="py-4 pr-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                                        <CategoryIcon className="w-4 h-4 text-white/60" />
                                                    </div>
                                                    <span className="text-white font-medium">{item.item}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white/70">{item.subsidy}</span>
                                                    <ChevronRight className="w-4 h-4 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </td>
                                            <td className="py-4 text-right">
                                                <span className="text-red-400 font-bold text-lg neon-text-red">
                                                    {formatCurrency(item.amount)}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-6"
                >
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                            Ready to recover your capital?
                        </h3>
                        <p className="text-white/50">
                            Our experts will help you claim these subsidies
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Mobile Email Alert Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onEmailAlert}
                            className="sm:hidden p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                            <Bell className="w-5 h-5 text-white" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="cta-button flex items-center gap-3 whitespace-nowrap"
                        >
                            <span>RECOVER FUNDS</span>
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-white/30 text-sm mt-8"
                >
                    Analysis based on uploaded documents • {data?.analyzedAt
                        ? `Analyzed: ${new Date(data.analyzedAt).toLocaleString()}`
                        : 'Last updated: just now'
                    }
                </motion.p>
            </div>
        </div>
    );
};

export default Dashboard;
