import { motion } from 'framer-motion';
import { Upload, FileText, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import GlassCard from './GlassCard';

/**
 * UploadView - File upload interface with glassmorphism styling
 * Handles drag & drop and file selection for financial documents
 */
const UploadView = ({ onUpload, isDarkMode = false }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
    };

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    const handleStartScan = () => {
        if (files.length > 0) {
            onUpload(files);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <GlassCard className="w-full max-w-2xl p-8" delay={0.1}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl font-semibold tracking-tight mb-3" style={{ color: 'var(--text-tagline)' }}>
                        Claim What's Already Yours.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Upload uw financiële documenten om verborgen kapitaal te ontdekken
                    </p>
                </motion.div>

                {/* Upload Zone */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`relative p-14 text-center cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 ${isDragging
                        ? 'border-purple-400 bg-purple-500/10'
                        : 'border-[var(--glass-border)] hover:border-[var(--accent-secondary)] hover:bg-[var(--glass-border)]'
                        }`}
                    style={{
                        background: isDragging ? 'rgba(139, 92, 246, 0.05)' : 'transparent'
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input').click()}
                >
                    <input
                        id="file-input"
                        type="file"
                        multiple
                        accept=".pdf,.xlsx,.xls,.csv"
                        className="hidden"
                        onChange={handleFileSelect}
                    />

                    <motion.div
                        animate={{
                            y: isDragging ? -10 : 0,
                            scale: isDragging ? 1.05 : 1
                        }}
                        transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                    >
                        <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragging ? 'bg-red-500/20' : 'bg-[var(--glass-border)]'
                            }`}>
                            <Upload className={`w-8 h-8 transition-colors duration-300 ${isDragging ? 'text-red-400' : ''
                                }`} style={{ color: isDragging ? undefined : 'var(--text-muted)' }} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                            Sleep uw bestanden hier
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            of klik om te bladeren
                        </p>
                        <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>
                            Ondersteunt PDF, Excel, CSV bestanden
                        </p>
                    </motion.div>
                </motion.div>

                {/* Selected Files */}
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-8 space-y-3"
                    >
                        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                            Geselecteerde bestanden ({files.length})
                        </p>
                        {files.map((file, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                style={{
                                    background: 'var(--glass-border)',
                                    border: '1px solid var(--glass-border)'
                                }}
                            >
                                <div className="p-2 rounded-lg bg-red-500/10">
                                    <FileText className="w-5 h-5 text-red-400" />
                                </div>
                                <span className="flex-1 truncate font-medium" style={{ color: 'var(--text-primary)' }}>{file.name}</span>
                                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    {(file.size / 1024).toFixed(1)} KB
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: files.length > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: files.length > 0 ? 0.98 : 1 }}
                    onClick={handleStartScan}
                    disabled={files.length === 0}
                    className={`w-full mt-10 cta-button text-lg ${files.length === 0 ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                >
                    🚀 Start AI Analyse
                </motion.button>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-sm mt-5 flex items-center justify-center gap-2"
                    style={{ color: 'var(--text-muted)' }}
                >
                    <span
                        className="inline-block w-2 h-2 rounded-full animate-pulse"
                        style={{
                            backgroundColor: 'var(--trust-blue)',
                            boxShadow: '0 0 8px var(--trust-blue-glow)'
                        }}
                    ></span>
                    🔒 Uw gegevens worden versleuteld en veilig verwerkt
                </motion.p>
            </GlassCard>
        </div>
    );
};

export default UploadView;
