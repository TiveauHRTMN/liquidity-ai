import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Bell, CheckCircle, AlertCircle, Send } from 'lucide-react';
import GlassCard from './GlassCard';
import api from '../services/api';

/**
 * EmailAlertModal - Modal for setting up email notifications
 * Features glassmorphism design with animated success/error states
 */
const EmailAlertModal = ({ sessionId, onClose, backendAvailable = true }) => {
    const [email, setEmail] = useState('');
    const [alertTypes, setAlertTypes] = useState({
        weekly_summary: true,
        new_subsidies: true,
        deadline_reminders: false,
        market_updates: false,
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [message, setMessage] = useState('');

    const alertOptions = [
        { id: 'weekly_summary', label: 'Weekly Summary', description: 'Get a weekly overview of your subsidy opportunities' },
        { id: 'new_subsidies', label: 'New Subsidies', description: 'Instant alerts when new subsidies match your profile' },
        { id: 'deadline_reminders', label: 'Deadline Reminders', description: 'Notifications 30 days before application deadlines' },
        { id: 'market_updates', label: 'Market Updates', description: 'Industry benchmark and competitor insights' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        try {
            const selectedTypes = Object.entries(alertTypes)
                .filter(([_, enabled]) => enabled)
                .map(([type]) => type);

            if (backendAvailable) {
                await api.setupEmailAlert(email, sessionId, selectedTypes);
            } else {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            setStatus('success');
            setMessage('Email alerts configured successfully!');

            // Auto-close after success
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'Failed to set up alerts. Please try again.');
        }
    };

    const toggleAlertType = (type) => {
        setAlertTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
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
                className="w-full max-w-lg"
            >
                <GlassCard className="p-6" animate={false}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20">
                                <Bell className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Email Alerts</h2>
                                <p className="text-white/50 text-sm">Stay informed about your subsidies</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5 text-white/60" />
                        </button>
                    </div>

                    {/* Success/Error State */}
                    {(status === 'success' || status === 'error') && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${status === 'success'
                                    ? 'bg-green-500/10 border border-green-500/20'
                                    : 'bg-red-500/10 border border-red-500/20'
                                }`}
                        >
                            {status === 'success'
                                ? <CheckCircle className="w-5 h-5 text-green-400" />
                                : <AlertCircle className="w-5 h-5 text-red-400" />
                            }
                            <span className={status === 'success' ? 'text-green-400' : 'text-red-400'}>
                                {message}
                            </span>
                        </motion.div>
                    )}

                    {/* Form */}
                    {status !== 'success' && (
                        <form onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div className="mb-6">
                                <label className="block text-white/70 text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 
                             text-white placeholder-white/30 focus:outline-none focus:border-red-400/50
                             transition-colors"
                                        disabled={status === 'loading'}
                                    />
                                </div>
                            </div>

                            {/* Alert Type Selection */}
                            <div className="mb-6">
                                <label className="block text-white/70 text-sm font-medium mb-3">
                                    Alert Preferences
                                </label>
                                <div className="space-y-2">
                                    {alertOptions.map((option) => (
                                        <motion.div
                                            key={option.id}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => toggleAlertType(option.id)}
                                            className={`p-3 rounded-xl cursor-pointer transition-all ${alertTypes[option.id]
                                                    ? 'bg-red-500/10 border border-red-500/30'
                                                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${alertTypes[option.id]
                                                        ? 'bg-gradient-to-r from-red-500 to-pink-600'
                                                        : 'bg-white/10'
                                                    }`}>
                                                    {alertTypes[option.id] && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                        >
                                                            <CheckCircle className="w-3 h-3 text-white" />
                                                        </motion.div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-medium text-sm">{option.label}</p>
                                                    <p className="text-white/40 text-xs">{option.description}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={status === 'loading'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full cta-button flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full spinner" />
                                        <span>Setting up alerts...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Enable Alerts</span>
                                    </>
                                )}
                            </motion.button>

                            <p className="text-center text-white/30 text-xs mt-4">
                                You can unsubscribe at any time
                            </p>
                        </form>
                    )}
                </GlassCard>
            </motion.div>
        </motion.div>
    );
};

export default EmailAlertModal;
