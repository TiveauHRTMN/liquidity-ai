import { motion } from 'framer-motion';
import { Upload, FileText, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import GlassCard from './GlassCard';

/**
 * UploadView - File upload interface with glassmorphism styling
 * Handles drag & drop and file selection for financial documents
 */
const UploadView = ({ onUpload }) => {
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
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                        <h1 className="text-3xl font-bold text-white">
                            Liquidity <span className="neon-text-gradient">AI</span>
                        </h1>
                    </div>
                    <p className="text-white/50 text-sm mb-4 tracking-wide">
                        Stop Bleeding Capital. Start Claiming Yours.
                    </p>
                    <p className="text-white/60 text-lg">
                        Upload your financial documents to detect capital leakage
                    </p>
                </motion.div>

                {/* Upload Zone */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`upload-zone p-12 text-center cursor-pointer ${isDragging ? 'drag-active' : ''
                        }`}
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
                        animate={{ y: isDragging ? -10 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Upload className="w-16 h-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Drop your files here
                        </h3>
                        <p className="text-white/50">
                            or click to browse
                        </p>
                        <p className="text-white/30 text-sm mt-2">
                            Supports PDF, Excel, CSV files
                        </p>
                    </motion.div>
                </motion.div>

                {/* Selected Files */}
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 space-y-2"
                    >
                        <p className="text-white/60 text-sm font-medium mb-3">
                            Selected files ({files.length})
                        </p>
                        {files.map((file, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                            >
                                <FileText className="w-5 h-5 text-red-400" />
                                <span className="text-white/80 flex-1 truncate">{file.name}</span>
                                <span className="text-white/40 text-sm">
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartScan}
                    disabled={files.length === 0}
                    className={`w-full mt-8 cta-button ${files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    Start AI Scan
                </motion.button>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-white/30 text-sm mt-4"
                >
                    Your data is encrypted and processed securely
                </motion.p>
            </GlassCard>
        </div>
    );
};

export default UploadView;
