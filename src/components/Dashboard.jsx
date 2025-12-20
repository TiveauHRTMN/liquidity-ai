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
    backendAvailable = true,
    isDarkMode = false
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
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                            Dashboard
                        </h1>
                        <p className="text-sm hidden sm:block" style={{ color: 'var(--text-muted)' }}>
                            Claim What's Already Yours.
                        </p>
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center gap-3">
                        {/* Backend Status Indicator */}
                        {!backendAvailable && (
                            <span className="text-yellow-400/70 text-xs px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20">
                                Demo Modus
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

                        <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <div className="pulse-dot" />
                            <span className="text-sm font-medium hidden sm:inline">Live Analyse</span>
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
                                <span className="font-medium uppercase tracking-wider text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    Totaal Kapitaalverlies
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

                            <div className="flex items-center gap-4 text-sm flex-wrap" style={{ color: 'var(--text-muted)' }}>
                                <div className="flex items-center gap-2">
                                    <Euro className="w-4 h-4" />
                                    <span>Per Jaar (Geschat)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-red-400" />
                                    <span className="text-red-400">{subsidies.length} Kansen Gevonden</span>
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
                                    Kritiek
                                </span>
                            </motion.div>
                        </div>
                    </GlassCard>

                    {/* Benchmark Card */}
                    <GlassCard className="p-8" delay={0.2}>
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="w-5 h-5 text-purple-400" />
                            <span className="font-medium uppercase tracking-wider text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Subsidiebenutting Benchmark
                            </span>
                        </div>

                        <div className="space-y-6">
                            {/* Your Performance */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Uw Bedrijf</span>
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
                                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Branchegemiddelde</span>
                                    <span className="font-bold" style={{ color: 'var(--trust-blue)' }}>{benchmarkData.competitors}%</span>
                                </div>
                                <div className="progress-bar h-4">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${benchmarkData.competitors}%` }}
                                        transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
                                        className="progress-bar-fill"
                                        style={{
                                            background: 'linear-gradient(to right, var(--trust-blue), var(--trust-blue-light))',
                                            boxShadow: '0 0 15px var(--trust-blue-glow)'
                                        }}
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
                                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                            U laat <span className="text-red-400 font-bold">{gapPercentage}%</span> liggen
                                        </p>
                                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                            Vergeleken met branchegenoten
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
                            <span className="font-medium uppercase tracking-wider text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Gevonden Kansen
                            </span>
                        </div>
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Klik op rij voor details
                        </span>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <th className="text-left font-medium text-sm pb-4 pr-4" style={{ color: 'var(--text-muted)' }}>
                                        Gedetecteerd Item
                                    </th>
                                    <th className="text-left font-medium text-sm pb-4 pr-4" style={{ color: 'var(--text-muted)' }}>
                                        Subsidienaam
                                    </th>
                                    <th className="text-right font-medium text-sm pb-4" style={{ color: 'var(--text-muted)' }}>
                                        Potentiël Bedrag
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
                                                    <div className="p-2 rounded-lg transition-colors" style={{ background: 'var(--glass-border)' }}>
                                                        <CategoryIcon className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                                                    </div>
                                                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.item}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <div className="flex items-center gap-2">
                                                    <span style={{ color: 'var(--text-secondary)' }}>{item.subsidy}</span>
                                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }} />
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
                        <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                            Klaar om uw kapitaal terug te halen?
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Onze experts helpen u deze subsidies te claimen
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
                            <span>HERSTEL FONDSEN</span>
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-sm mt-8"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Analyse gebaseerd op geüploade documenten • {data?.analyzedAt
                        ? `Geanalyseerd: ${new Date(data.analyzedAt).toLocaleString('nl-NL')}`
                        : 'Laatst bijgewerkt: zojuist'
                    }
                </motion.p>
            </div>
        </div>
    );
};

export default Dashboard;
