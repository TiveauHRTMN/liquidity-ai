import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import { Scan, FileSearch, Brain, AlertCircle } from 'lucide-react';

/**
 * ScanningView - Animated scanning progress interface
 * Shows AI processing simulation with progress stages
 * Now integrates with actual analysis completion
 */
const ScanningView = ({ onComplete, analysisResult = null }) => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState(0);

    const stages = [
        { icon: FileSearch, label: 'Analyzing documents...', color: 'text-blue-400' },
        { icon: Brain, label: 'Running AI detection...', color: 'text-purple-400' },
        { icon: Scan, label: 'Scanning for subsidies...', color: 'text-green-400' },
        { icon: AlertCircle, label: 'Calculating losses...', color: 'text-red-400' },
    ];

    useEffect(() => {
        // If we already have results, speed up the animation
        const speedMultiplier = analysisResult ? 2 : 1;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => onComplete(), 300);
                    return 100;
                }
                return prev + (1 * speedMultiplier);
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, [onComplete, analysisResult]);

    useEffect(() => {
        const stageIndex = Math.floor(progress / 25);
        setStage(Math.min(stageIndex, stages.length - 1));
    }, [progress, stages.length]);

    const CurrentIcon = stages[stage].icon;

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <GlassCard className="w-full max-w-lg p-8 text-center">
                {/* Animated Icon */}
                <motion.div
                    key={stage}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="mb-8"
                >
                    <div className={`inline-flex p-6 rounded-full bg-white/5 ${stages[stage].color}`}>
                        <CurrentIcon className="w-16 h-16" />
                    </div>
                </motion.div>

                {/* Progress Label */}
                <motion.h2
                    key={`label-${stage}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-white mb-2"
                >
                    {stages[stage].label}
                </motion.h2>

                {/* Progress Percentage */}
                <p className="text-5xl font-bold neon-text-gradient mb-8">
                    {progress}%
                </p>

                {/* Progress Bar */}
                <div className="progress-bar h-3 mb-6">
                    <motion.div
                        className="progress-bar-fill bg-gradient-to-r from-red-500 to-pink-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                        style={{
                            boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
                        }}
                    />
                </div>

                {/* Stage Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {stages.map((s, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{
                                scale: 1,
                                backgroundColor: index <= stage ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.1)'
                            }}
                            transition={{ delay: index * 0.1 }}
                            className="w-3 h-3 rounded-full"
                        />
                    ))}
                </div>

                {/* Backend Status */}
                {analysisResult && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-400/60 text-sm mt-6"
                    >
                        ✓ Data received from server
                    </motion.p>
                )}

                {/* Scan Line Effect */}
                <div className="scan-line" />
            </GlassCard>
        </div>
    );
};

export default ScanningView;
