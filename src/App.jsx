import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UploadView from './components/UploadView';
import ScanningView from './components/ScanningView';
import Dashboard from './components/Dashboard';
import EmailAlertModal from './components/EmailAlertModal';
import SubsidyDetailModal from './components/SubsidyDetailModal';
import ThemeToggle from './components/ThemeToggle';
import api from './services/api';

/**
 * App - Main application component
 * Manages state flow: Upload -> Scanning -> Dashboard
 * Handles API integration and modal states
 */
function App() {
    // Application states: 'upload' | 'scanning' | 'dashboard'
    const [appState, setAppState] = useState('upload');
    const [sessionId, setSessionId] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);
    const [backendAvailable, setBackendAvailable] = useState(true);

    // Modal states
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showSubsidyModal, setShowSubsidyModal] = useState(false);
    const [selectedSubsidy, setSelectedSubsidy] = useState(null);

    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : false; // Default to LIGHT
    });

    // Apply theme on mount and change
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // Toggle theme
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => !prev);
    }, []);

    // Handle file upload
    const handleUpload = useCallback(async (files) => {
        setError(null);
        setAppState('scanning');

        try {
            // Check if backend is available
            const isBackendUp = await api.checkBackendHealth();
            setBackendAvailable(isBackendUp);

            if (isBackendUp) {
                // Upload to backend
                const uploadResult = await api.uploadDocuments(files);
                setSessionId(uploadResult.sessionId);

                // Trigger analysis
                const result = await api.analyzeDocuments(uploadResult.sessionId);
                setAnalysisResult(result);
            } else {
                // Use mock data if backend is not available
                await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing
                setAnalysisResult(getMockData());
            }
        } catch (err) {
            console.error('Analysis error:', err);
            // Fall back to mock data on error
            setAnalysisResult(getMockData());
        }
    }, []);

    // Handle scan completion
    const handleScanComplete = useCallback(() => {
        setAppState('dashboard');
    }, []);

    // Handle subsidy click
    const handleSubsidyClick = useCallback((subsidy) => {
        setSelectedSubsidy(subsidy);
        setShowSubsidyModal(true);
    }, []);

    // Handle email alert setup
    const handleEmailAlert = useCallback(() => {
        setShowEmailModal(true);
    }, []);

    // Mock data for when backend is unavailable
    const getMockData = () => ({
        sessionId: 'mock-session',
        totalLeakage: -14200,
        subsidies: [
            { id: 'wbso-2024', item: 'Unused R&D Tax Credits', subsidy: 'WBSO Subsidy', amount: -4800, category: 'Tax', description: 'Tax credit for research and development activities.', deadline: 'September 30, 2024', eligibility: ['Companies performing R&D activities', 'Minimum 500 R&D hours per year'] },
            { id: 'sde-2024', item: 'Energy Efficiency Program', subsidy: 'SDE++ Grant', amount: -3200, category: 'Energy', description: 'Subsidy for renewable energy projects.', deadline: 'Rolling applications', eligibility: ['Energy production from renewable sources', 'CO2 reduction projects'] },
            { id: 'stap-2024', item: 'Employee Training Budget', subsidy: 'STAP Budget', amount: -2800, category: 'HR', description: 'Budget for employee training and development.', deadline: 'Continuous enrollment', eligibility: ['Dutch residents aged 18+', 'Registered training providers'] },
            { id: 'mit-2024', item: 'Digital Transformation', subsidy: 'MIT Scheme', amount: -2100, category: 'Digital', description: 'SME Innovation Stimulus.', deadline: 'April 2024 / September 2024', eligibility: ['Small and medium enterprises', 'Innovation or R&D project'] },
            { id: 'dhi-2024', item: 'Export Development', subsidy: 'DHI Subsidy', amount: -1300, category: 'Export', description: 'International business development.', deadline: 'Ongoing applications', eligibility: ['Dutch companies with export ambitions', 'Projects in emerging markets'] },
        ],
        benchmark: { you: 23, competitors: 67, industryAverage: 65 },
        analyzedAt: new Date().toISOString(),
        documentCount: 1,
    });

    return (
        <div className="relative min-h-screen">
            {/* Animated Background Orbs */}
            <div className="background-orbs">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="orb orb-4" />
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Theme Toggle - Fixed Position */}
                <div className="fixed top-4 right-4 z-50">
                    <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
                </div>

                <AnimatePresence mode="wait">
                    {appState === 'upload' && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <UploadView onUpload={handleUpload} />
                        </motion.div>
                    )}

                    {appState === 'scanning' && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ScanningView
                                onComplete={handleScanComplete}
                                analysisResult={analysisResult}
                            />
                        </motion.div>
                    )}

                    {appState === 'dashboard' && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Dashboard
                                data={analysisResult}
                                onSubsidyClick={handleSubsidyClick}
                                onEmailAlert={handleEmailAlert}
                                backendAvailable={backendAvailable}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Email Alert Modal */}
            <AnimatePresence>
                {showEmailModal && (
                    <EmailAlertModal
                        sessionId={sessionId || 'mock-session'}
                        onClose={() => setShowEmailModal(false)}
                        backendAvailable={backendAvailable}
                    />
                )}
            </AnimatePresence>

            {/* Subsidy Detail Modal */}
            <AnimatePresence>
                {showSubsidyModal && selectedSubsidy && (
                    <SubsidyDetailModal
                        subsidy={selectedSubsidy}
                        onClose={() => {
                            setShowSubsidyModal(false);
                            setSelectedSubsidy(null);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Error Toast */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-6 right-6 glass-card p-4 border-red-500/30"
                    >
                        <p className="text-red-400">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
