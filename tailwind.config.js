/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                'dark-citadel': '#0f172a',
                'glass-border': 'rgba(255, 255, 255, 0.1)',
                'glass-bg': 'rgba(255, 255, 255, 0.05)',
                'neon-red': '#f87171',
                'neon-pink': '#ec4899',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-loss': 'linear-gradient(to right, #f87171, #dc2626)',
                'gradient-cta': 'linear-gradient(to right, #ef4444, #ec4899)',
                'gradient-cta-hover': 'linear-gradient(to right, #f87171, #f472b6)',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
                'neon-red': '0 0 20px rgba(239, 68, 68, 0.5)',
                'neon-red-lg': '0 0 40px rgba(239, 68, 68, 0.6)',
            },
            backdropBlur: {
                'glass': '16px',
            },
            animation: {
                'float': 'float 20s ease-in-out infinite',
                'float-delayed': 'float 25s ease-in-out infinite reverse',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'scan-line': 'scanLine 2s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '25%': { transform: 'translate(50px, -50px) scale(1.1)' },
                    '50%': { transform: 'translate(-30px, 30px) scale(0.95)' },
                    '75%': { transform: 'translate(30px, 50px) scale(1.05)' },
                },
                glow: {
                    '0%': { textShadow: '0 0 20px rgba(239, 68, 68, 0.5)' },
                    '100%': { textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(236, 72, 153, 0.4)' },
                },
                scanLine: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
            },
        },
    },
    plugins: [],
}
