/**
 * API Service - Handles all communication with the FastAPI backend
 * Uses environment variable for API URL with fallback to production Render URL
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://liquidity-ai-backend.onrender.com';

/**
 * Upload documents to the backend
 * @param {File[]} files - Array of files to upload
 * @returns {Promise<{sessionId: string, filesUploaded: number}>}
 */
export async function uploadDocuments(files) {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
}

/**
 * Trigger AI analysis on uploaded documents
 * @param {string} sessionId - Session ID from upload
 * @returns {Promise<AnalysisResult>}
 */
export async function analyzeDocuments(sessionId) {
    const response = await fetch(`${API_BASE_URL}/api/analyze/${sessionId}`, {
        method: 'POST',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Analysis failed');
    }

    return response.json();
}

/**
 * Get analysis results for a session
 * @param {string} sessionId - Session ID
 * @returns {Promise<AnalysisResult>}
 */
export async function getResults(sessionId) {
    const response = await fetch(`${API_BASE_URL}/api/results/${sessionId}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch results');
    }

    return response.json();
}

/**
 * Get all available subsidies
 * @returns {Promise<{count: number, subsidies: SubsidyItem[]}>}
 */
export async function getSubsidies() {
    const response = await fetch(`${API_BASE_URL}/api/subsidies`);

    if (!response.ok) {
        throw new Error('Failed to fetch subsidies');
    }

    return response.json();
}

/**
 * Get details for a specific subsidy
 * @param {string} subsidyId - Subsidy ID
 * @returns {Promise<SubsidyItem>}
 */
export async function getSubsidyDetails(subsidyId) {
    const response = await fetch(`${API_BASE_URL}/api/subsidy/${subsidyId}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Subsidy not found');
    }

    return response.json();
}

/**
 * Set up email alerts
 * @param {string} email - Email address
 * @param {string} sessionId - Session ID
 * @param {string[]} alertTypes - Types of alerts to subscribe to
 * @returns {Promise<{success: boolean, message: string, alertId: string}>}
 */
export async function setupEmailAlert(email, sessionId, alertTypes = ['weekly_summary', 'new_subsidies']) {
    const response = await fetch(`${API_BASE_URL}/api/alerts/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            sessionId,
            alertTypes,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to set up alerts');
    }

    return response.json();
}

/**
 * Cancel an email alert
 * @param {string} alertId - Alert ID to cancel
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function cancelEmailAlert(alertId) {
    const response = await fetch(`${API_BASE_URL}/api/alerts/${alertId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to cancel alert');
    }

    return response.json();
}

/**
 * Get benchmark data
 * @returns {Promise<BenchmarkData>}
 */
export async function getBenchmark() {
    const response = await fetch(`${API_BASE_URL}/api/benchmark`);

    if (!response.ok) {
        throw new Error('Failed to fetch benchmark data');
    }

    return response.json();
}

/**
 * Check if the backend is available
 * @returns {Promise<boolean>}
 */
export async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'GET',
            signal: AbortSignal.timeout(3000), // 3 second timeout
        });
        return response.ok;
    } catch {
        return false;
    }
}

export default {
    uploadDocuments,
    analyzeDocuments,
    getResults,
    getSubsidies,
    getSubsidyDetails,
    setupEmailAlert,
    cancelEmailAlert,
    getBenchmark,
    checkBackendHealth,
};
